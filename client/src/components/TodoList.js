import {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTodosAsync, toggleTodoAsync, deleteTodoAsync} from '../redux/todos/services'
import { selectFilteredTodos } from '../redux/todos/todosSlice'

import Loading from './Loading'
import Error from './Error'



function TodoList() {

    const dispatch = useDispatch()
    const filteredTodos = useSelector(selectFilteredTodos)
    const isLoading = useSelector(state => state.todos.isLoading)
    const error = useSelector(state => state.todos.error)

    useEffect(() => {
        dispatch(getTodosAsync())
    }, [dispatch])

    const handleDestroy = async (id) => {
        if (window.confirm(`Are you sure?`)) {
            await dispatch(deleteTodoAsync(id))
        }
    }

    if (isLoading) {
        return <Loading />
    }

    if (error) {
        return <Error message={error}/>
    }


    const handleToggle = (id, completed) => {
        dispatch(toggleTodoAsync({id, data:{completed}}));
    }

    return (
        <ul className="todo-list">

            {
                filteredTodos.map((item) => (
                    <li className={item.completed ? "completed" : ""}>
                        <div className="view">
                            <input className="toggle" type="checkbox" checked={item.completed} onClick={() => handleToggle(item.id, !item.completed)} />
                            <label>{item.title}</label>
                            <button className="destroy" onClick={() => handleDestroy(item.id)}></button>
                        </div>
                    </li>
                ))
            }
        </ul>
    )
}

export default TodoList