import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodoAsync } from '../redux/todos/services'
import Loading from "./Loading"
import Error from "./Error"


function Form() {

    const dispatch = useDispatch()
    const addIsLoading = useSelector(state => state.todos.addNewTodo.isLoading)
    const addError = useSelector(state => state.todos.addNewTodo.isLoading)

    const [title, setTitle] = useState("")

    const handleSubmit = async (e) => {
        if (title.trim() !== "") {
            await dispatch(addTodoAsync({title}))
            setTitle("")
        }
        e.preventDefault()
    }

    return (
        <form onSubmit={handleSubmit}  style={{display:"flex", alignItems:"center"}}>
            <input className="new-todo" disabled={addIsLoading} placeholder="What needs to be done?" autoFocus value={title} onChange={(e) => setTitle(e.target.value)}/>
            {
                addIsLoading &&
                <Loading />
            }
            {
                addError &&
                <Error message={addError}/>
            }
        </form>
    )
}

export default Form