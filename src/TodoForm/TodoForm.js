import React from 'react';
import TodoList from './TodoList/TodoList';
import Context from '../context';
import Loader from '../loader'; 
import AddTodo from './AddTodo/AddTodo';
import {database} from '../Firebase'
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

class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            todos: [],
            user: {}
        };
    }

    completeTodo = (id) => {
        return (event) => {
            this.setState(this.state.todos.map(todo => {
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
            }))
        }
    }

    deleteTodo = (id) => {
        this.setState(this.state.todos.map(todo => {
            if(todo.id === id) {
                database.ref('ToDo').child(todo.id).update({ status: 'archived' })
                database.ref('ToDo').child(todo.id).update({ dateUpdated: Date.now()})
                this.getTodoListFromDatabase()
            }
        }))
    }

    addTodo = async(title) => {
        try {
            await database.ref('ToDo').push({
                userId: this.props.user._delegate.uid,
                dateCreated: Date.now(),
                dateUpdated: Date.now(),
                status: false,
                title: title
            });
            return this.getTodoListFromDatabase()
        } catch (error) {
            console.error(error);
        }        
    }

    getTodoListFromDatabase = () => {
        try {
            database.ref('ToDo').get()
        .then(response => response.val())
        .then(response => response ? Object.keys(response).map(key => ({
                ...response[key],
                id: key
            })) : []
        )
        .then(response => response.filter(todo => {
            return (todo.userId === this.props.user._delegate.uid) && (todo.status !== 'archived');
        })     
        )
        .then((item) => {this.setState({
            isLoaded: true,
            todos: item
        });
            },
            (error) => {
                this.setState({
                isLoaded: true,
                error
                });
            }
        ) 
        } catch (error) {
            console.error(error)
        }
    }

    componentDidMount(){
        this.getTodoListFromDatabase()
    }

    render() {
        const { error, isLoaded } = this.state;
        if (error) {
          return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
          return <Loader></Loader>;
        } else {
        return (
                <Context.Provider value={{deleteTodo: this.deleteTodo}}>
                   <Header></Header>
                    <div className='wrapper'>
                        <span style={styles.span}>
                            <h3>My Todo List</h3>
                            <AddTodo onCreate={this.addTodo}></AddTodo>
                        </span>
                        {this.state.todos.length ? <TodoList todos={this.state.todos} onComplete={this.completeTodo} ></TodoList> : <p>No todos!</p>}
                    </div>
                </Context.Provider>
        )
        }
    }
}
export default TodoForm
