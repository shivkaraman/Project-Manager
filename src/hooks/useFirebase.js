import { useEffect, useReducer, useState } from "react";
import { projectFirestore, timestamp } from "../firebase/config";

let initialState = {
    document: null, 
    error: null, 
    isPending: false,
    success: false
}

const firestoreReducer = (state, action) => {
    switch(action.type) {
        case 'ADDED_DOCUMENT':
            return {document: action.payload, isPending: false, success: true, error: null}
        case 'DELETED_DOCUMENT':
            return {document: null, isPending: false, success: true, error: null}
        case 'UPDATED_DOCUMENT':
            return {document: null, isPending: false, success: true, error: null}
        case 'IS_PENDING':
            return {document: null, isPending: true, success: false, error: null}
        case 'ERROR':
            return {document: null, isPending: false, success: false, error: action.payload}
        default:
            return {...state}
    }
}

export default function useFirestore(collection) {
    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)

    //collection ref
    const ref = projectFirestore.collection(collection)

    const dispatchIfNotCancelled = (action) => {
        if(!isCancelled)
            dispatch(action)
    }

    const addDocument = async (doc) => {
        dispatch({type: 'IS_PENDING'})
        try{
            const createdAt = timestamp.fromDate(newDate())
            const addedDocument = await ref.add({ ...doc, createdAt })
            dispatchIfNotCancelled({type: 'ADDED_DOCUMENT', payload: addedDocument})
        }
        catch(err){
            dispatchIfNotCancelled({type: 'ERROR', payload: err})
        }
    }

    const deteleDocument = async (id) => {
        dispatch({type: 'IS_PENDING'})
        try{
            await ref.doc(id).delete
            dispatchIfNotCancelled({type: 'DELETED_DOCUMENT'})
        }
        catch(err){
            dispatchIfNotCancelled({type: 'ERROR', payload: err})
        }
    }

    const updateDocument = async (id, updates) => {
        dispatch({type: 'IS_PENDING'})
        try{
            const updatedDocument = await ref.doc(id).update(updates)
            dispatchIfNotCancelled({type: 'UPDATED_DOCUMENT', payload: updatedDocument})
            return updateDocument
        }
        catch(err){
            dispatchIfNotCancelled({type: 'ERROR', payload: err})
            return null
        }
    }
    useEffect(() => {
        setIsCancelled(false)
        return () => {
            setIsCancelled(true)
        }
    })

    return { response, addDocument, deteleDocument, updateDocument }
}