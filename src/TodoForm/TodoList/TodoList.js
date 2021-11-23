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

class TodoList extends React.Component {
    render() {
      return (
        <ul style={styles.ul}>
        {this.props.todos.map((todo, index) => {
          return <TodoItem todo={todo} key={index} onChange={this.props.onComplete(todo.id)}></TodoItem>
        })
        }
       </ul>  
      )
    }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default TodoList