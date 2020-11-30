import {useSpring, animated} from "react-spring";
import cancel from '../../../../../static/images/cancel.png'

export const DeleteIcon = (props) => {
    const fadeIn = useSpring({
        from: {opacity: 0},
        to: {opacity: 1}
    })

    return(
                <animated.p
                    style={fadeIn}
                    alt="delete todo"
                    onClick={props.handleTodoDelete}
                    className="delete-todo-icon"
                >-</animated.p>

    )
}