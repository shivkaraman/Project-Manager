import useCollection from '../../hooks/useCollection'
import useAuthContext from '../../hooks/useAuthContext'
import { useState } from 'react'

// components
import ProjectList from './ProjectList'
import ProjectFilter from './ProjectFilter'

// styles
import './Dashboard.css'

export default function Dashboard(){
    const { documents ,error } = useCollection('projects')
    const { user } = useAuthContext()
    const [filter, setFilter] = useState('all')

    const changeFilter = (newFilter) => {
        setFilter(newFilter)
    }

    const projects = documents ? documents.filter(document => {
        switch(filter) {
            case 'all':
                return true
            case 'mine':
                let assignedToMe = false
                document.assignedUsersList.forEach(u => {
                    if(u.id === user.uid) {
                        assignedToMe = true
                    }
                })
                return assignedToMe
            case 'development':
            case 'design':
            case 'sales':
            case 'marketing':
                return document.category === filter
            default:
                return true
        }
    }) : null

    return (
        <div>
            <h2 className="page-title">Dashboard</h2>
            {error && <p className="error">{error}</p>}
            {documents && <ProjectFilter currentFilter={filter} changeFilter={changeFilter} />}
            {projects && <ProjectList projects={projects} />}
        </div>
    )
}

 