import React from 'react'
import TodoItem from './TodoItem/TodoItem'
import PropTypes from 'prop-types'

const styles = {
  ul: { 
    listStyle: 'none',
    margin: 0,
    padding: 0,
    marginTop: '2rem'
  }
}

function TodoList ({ onComplete, todos }) {

    return (
      <ul style={styles.ul}>
      {todos.map((todo) => {
        return <TodoItem todo={todo} key={Math.random()} onChange={() => onComplete(todo.id)}></TodoItem>
      })
      }
     </ul>  
    )
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onComplete: PropTypes.func
}

export default TodoList