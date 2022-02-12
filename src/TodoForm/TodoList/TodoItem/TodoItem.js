import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Context from '../../../context';

const styles = {
    li: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '.5rem 1rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginBottom: '.5rem'
    },
    input: {
        marginRight: '1rem'
    }
}

function TodoItem ({ todo, onChange }) {
    const { deleteTodo } = useContext(Context);
    const classes = [];
    if (todo.status) {
        classes.push('checked')
    }

    return (
        <li style={styles.li} className={classes.join(' ')} key={Math.random()}>
            <div>
                <input type='checkbox' checked={todo.status} style={styles.input} onChange={onChange}></input>
                <span>{todo.title}</span>
            </div>
            <button className='btn btn-delete' onClick={() => deleteTodo(todo.id)}>Delete</button>
        </li>
    )
}

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    onChange: PropTypes.func
}
export default TodoItem