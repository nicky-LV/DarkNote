import {useForm} from "react-hook-form";
import {useSpring, animated} from "react-spring";

export const CreateTodoMenu1 = (props) => {
    const {register, handleSubmit} = useForm(); // todo: add errors

    const fadeIn = useSpring({
        from: {opacity: 0},
        to: {opacity: 1}
    })

    const onSubmit = (data) => {
        const todo = data['todo'];
        props.handleTodoCreate(todo)
    }

    return(
        <animated.div className="create-todo" style={fadeIn}>
            <p className="text-center text-light">Create todo</p>
            <form onSubmit={handleSubmit(onSubmit)} className="justify-content-center">
                <div className="input-group">
                    <input name="todo" ref={register({required: true, maxLength: 30})} autoComplete="off" className="form-control" />

                    <div className="input-group-append">
                        <button className="btn btn-outline-light add-todo-button-2" type="submit">Create</button>
                    </div>
                </div>
            </form>
        </animated.div>
    )
}