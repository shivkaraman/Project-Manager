import { useEffect, useReducer, useState } from 'react'
import { timestamp } from '../../firebase/config'
import { useNavigate } from 'react-router-dom'
import useAuthContext from '../../hooks/useAuthContext'
import Select from 'react-select'
import useCollection from '../../hooks/useCollection'
import useFirestore from '../../hooks/useFirestore'

//styles 
import './Create.css'

const categories = [
    { value: 'development', label: 'Development' },
    { value: 'design', label: 'Design' },
    { value: 'sales', label: 'Sales' },
    { value: 'marketing', label: 'Marketing' },
];
    
const initialState = {
    name: '',
    details: '',
    dueDate: '',
    category: '',
    assignedUsers: [],
    formError: null,
};

function reducer(state, action) {
    switch (action.type) {
    case 'SET_FIELD':
        return { ...state, [action.field]: action.value };
    case 'SET_FORM_ERROR':
        return { ...state, formError: action.error };
    default:
        return state;
    }
}

export default function Create() {
    const navigate = useNavigate()
    const { addDocument, response } = useFirestore('projects');
    const { user } = useAuthContext();
    const { documents } = useCollection('users');
    const [users, setUsers] = useState([]);

    const [state, dispatch] = useReducer(reducer, initialState);

    // form field values
    const { name, details, dueDate, category, assignedUsers, formError } = state;

    // create user values for react-select
    useEffect(() => {
        if (documents) {
            setUsers(
                documents.map((user) => {
                    return { value: { ...user, id: user.id }, label: user.displayName };
                })
            )
        }
    }, [documents]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: 'SET_FORM_ERROR', error: null });

        if (!category) {
            dispatch({ type: 'SET_FORM_ERROR', error: 'Please select a project category.' });
            return;
        }
        if (assignedUsers.length < 1) {
            dispatch({ type: 'SET_FORM_ERROR', error: 'Please assign the project to at least 1 user' });
            return;
        }

        const assignedUsersList = assignedUsers.map((u) => {
            return {
            displayName: u.value.displayName,
            photoURL: u.value.photoURL,
            id: u.value.id,
            };
        });
        const createdBy = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            id: user.uid,
        };

        const project = {
            name,
            details,
            assignedUsersList,
            createdBy,
            category: category.value,
            dueDate: timestamp.fromDate(new Date(dueDate)),
            comments: [],
        };

        await addDocument(project);
        console.log(response)
        if (!response.error) {
            console.log('Navigating to home page')
            navigate('/')
        }
    }

    const handleChange = (field, value) => {
        dispatch({ type: 'SET_FIELD', field, value });
    }
    
    return (
        <div className="create-form">
            <h2 className="page-title">Create a new Project</h2>
            <form onSubmit={handleSubmit}>
            <label>
                <span>Project name:</span>
                <input
                required
                type="text"
                onChange={(e) => handleChange('name', e.target.value)}
                value={name}
                />
            </label>
            <label>
                <span>Project Details:</span>
                <textarea
                required
                onChange={(e) => handleChange('details', e.target.value)}
                value={details}
                ></textarea>
            </label>
            <label>
                <span>Set due date:</span>
                <input
                required
                type="date"
                onChange={(e) => handleChange('dueDate', e.target.value)}
                value={dueDate}
                />
            </label>
            <label>
                <span>Project category:</span>
                <Select
                onChange={(option) => handleChange('category', option)}
                options={categories}
                />
            </label>
            <label>
                <span>Assign to:</span>
                <Select
                onChange={(option) => handleChange('assignedUsers', option)}
                options={users}
                isMulti
                />
            </label>
    
            {!response.isPending && <button className="btn">Add Project</button>}
            {response.isPending && <button className="btn" disabled>Loading</button>}
    
            {formError && <p className="error">{formError}</p>}
            </form>
        </div>
    )
}
    