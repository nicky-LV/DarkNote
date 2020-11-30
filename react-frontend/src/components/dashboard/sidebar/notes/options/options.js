import React from 'react';
import editWhite from '../../../../../static/images/editWhite.png';
import deleteWhite from '../../../../../static/images/deleteWhite.png';
import {animated, useSpring} from "react-spring";

export const Options = (props) => {
    const animationLeft = useSpring({
        from: {opacity: 0},
        to: {opacity: 1, marginLeft: -50}
    })

    const animationRight = useSpring({
        from: {opacity: 0},
        to: {opacity: 1, marginRight: -50}
    })
    return(
        <div>
        <animated.img style={animationRight} src={editWhite} onClick={ (e) =>{
            e.stopPropagation()
            props.showRenameMenu(true)
            props.setMenuShown(true)

        }}/>
        <animated.img style={animationLeft} src={deleteWhite} onClick={e => {
            e.stopPropagation()
            props.showDeleteMenu(true)
            props.setMenuShown(true)
        }}/>
    </div>
    )
}