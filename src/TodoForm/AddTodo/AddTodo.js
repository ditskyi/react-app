import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './AddTodo.css'



export default function AddTodo ({ onCreate }) {
const [state, setState] = useState({isOpen: false});
const [value, setValue] = useState('');

function submitHandler(event) {
    event.preventDefault()
    if (value.length === 0) {
        alert("Please fill a todo!");
    } else
    if (value.trim()) {
        onCreate(value)
        setState({ isOpen: false })
        setValue('')
    } 
}

    return (
        <React.Fragment>
            <button className='btn btn-delete' onClick={() => setState({ isOpen: true })}>New</button>
            {state.isOpen && (
                <div className='add-todo-modal'>
                    <form className='add-todo-modal-body' onSubmit={submitHandler}>
                        <input value={value} onChange={event => setValue(event.target.value)}></input>
                        <button 
                        className='btn btn-delete' 
                        type='submit' 
                        >
                        Add
                        </button>
                        <button className='btn' onClick={() => setState({ isOpen: false })}>&times;</button>
                    </form>
                </div>)
            }
        </React.Fragment>   
    )   
}

AddTodo.propTypes = {
onCreate: PropTypes.func
}