import React, { useState, useEffect, useCallback } from 'react';
import TodoList from './TodoList/TodoList';
import Context from '../context';
import Loader from '../loader'; 
import AddTodo from './AddTodo/AddTodo';
import {database} from '../Firebase';
import Header from '../Header/Header';

const styles = {
    span: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '0 1.5rem'
    }
}

function TodoForm({ user }) {

    const [todos, setTodos] = useState([]);
    const [isLoaded, setLoaded] = useState(false);
    const [error, setError] = useState(null);

    const currentUserId = user.uid;

    const getTodoListFromDatabase = useCallback(() => {
        try {
            database.ref('ToDo').get()
            .then(response => response.val())
            .then(response => response ? Object.keys(response).map(key => ({
                    ...response[key],
                    id: key
                })) : []
            )
            .then(response => response.filter(todo => {
                return (todo.userId === currentUserId) && (todo.status !== 'archived');
            })     
            )
            .then((item) => {
                setTodos(item);
                setLoaded(true);
                },
                (error) => {
                    setLoaded(true);
                    setError(error);
                    }
            ) 
        } catch (error) {
            console.error(error)
        }
    },[currentUserId])

    useEffect(() => {
        getTodoListFromDatabase(); 
    },[user]);
   
    function completeTodo(id) {
        try {
            todos.map(todo => {
            if(todo.id === id) {
                todo.status = !todo.status
                if (todo.status === true) {
                    database.ref('ToDo').child(todo.id).update({ dateUpdated: Date.now()})
                    database.ref('ToDo').child(todo.id).update({ status: true })  
                } else {
                    database.ref('ToDo').child(todo.id).update({ dateUpdated: Date.now()})
                    database.ref('ToDo').child(todo.id).update({ status: false })
                }
            }
            return todo
            })
            return getTodoListFromDatabase();
        } catch(error) {
            console.error(error)
        }
    }

    function deleteTodo(id) {
        try {
            todos.map((todo) => {
                if(todo.id === id) {
                    database.ref('ToDo').child(todo.id).update({ status: 'archived' });
                    database.ref('ToDo').child(todo.id).update({ dateUpdated: Date.now()});
                } else return todo;
            })
            return getTodoListFromDatabase();
        } catch (error) {
            console.error(error);
        }        
    }

    async function addTodo(title) {
        try {
            await database.ref('ToDo').push({
                userId: currentUserId,
                dateCreated: Date.now(),
                dateUpdated: Date.now(),
                status: false,
                title: title
            });
            return getTodoListFromDatabase();
        } catch (error) {
            console.error(error);
        }        
    }


    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <Loader></Loader>;
    } else {
        user={user}
    return (
        <Context.Provider value={{ deleteTodo }}>
            <Header user={user}></Header>
            <div className='wrapper'>
                <span style={styles.span}>
                    <h3>My Todo List</h3>
                    <AddTodo onCreate={addTodo}></AddTodo>
                </span>
                {todos.length ? <TodoList todos={todos} onComplete={completeTodo} ></TodoList> : <p>No todos!</p>}
            </div>
        </Context.Provider>
    )
    }
}

export default TodoForm
