import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggle, destroy, selectFilteredTodos } from '../redux/todos/todosSlice'



function TodoList() {

    const dispatch = useDispatch()
    const filteredTodos = useSelector(selectFilteredTodos)

    const handleDestroy = (id, title) => {
        if (window.confirm(`Are you sure to destroy the "${title.toUpperCase()}"`)) {
            dispatch(destroy(id))
        }
    }

    
    return (
        <ul className="todo-list">

            {
                filteredTodos.map((item) => (
                    <li className={item.completed ? "completed" : ""}>
                        <div class="view">
                            <input className="toggle" type="checkbox" checked={item.completed} onClick={() => dispatch(toggle({ id: item.id }))} />
                            <label>{item.title}</label>
                            <button className="destroy" onClick={() => handleDestroy(item.id, item.title)}></button>
                        </div>
                    </li>
                ))
            }
        </ul>
    )
}

export default TodoList