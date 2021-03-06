import {useSpring, animated} from "react-spring";
import cancel from '../../../../static/images/cancel.png'

export const DeleteIcon = (props) => {
    const fadeIn = useSpring({
        from: {opacity: 0},
        to: {opacity: 1}
    })

    return(
                <animated.button
                    style={fadeIn}
                    alt="delete todo"
                    onClick={ () => props.handleTodoDelete(props.todo)}
                    className="delete-todo-icon"
                >-</animated.button>

    )
}