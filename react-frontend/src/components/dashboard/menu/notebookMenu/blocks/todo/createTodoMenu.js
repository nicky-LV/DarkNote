import {useForm} from "react-hook-form";
import {useSpring, animated} from "react-spring";

export const CreateTodoMenu1 = (props) => {
    const {register, handleSubmit, errors} = useForm(); // todo: add errors

    const fadeIn = useSpring({
        from: {opacity: 0},
        to: {opacity: 1}
    })

    const onSubmit = (data) => {
        const todo = data['todo'];
        props.handleTodoCreate(todo)
    }

    return(
        <animated.div className="create-todo px-5" style={fadeIn}>
            <p className="text-center text-light">New Task</p>
            <form onSubmit={handleSubmit(onSubmit)} className="justify-content-center">
                <div className="input-group">
                    <input name="todo"
                           ref={register({required: true, maxLength: 30})}
                           autoComplete="off"
                           className="form-control"
                           placeholder="Name of task"/>

                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-warning add-todo-button-2"
                            type="submit">
                            Create
                        </button>
                    </div>
                </div>
                <div className="pt-2">
                                        {errors && errors.todo && errors.todo.type === "required" && <p className="text-danger text-center">Please enter a task</p> }
                    {errors && errors.todo && errors.todo.type === "maxLength" && <p className="text-danger text-center">Task is too long (>30 characters)</p> }
                </div>
            </form>
        </animated.div>
    )
}