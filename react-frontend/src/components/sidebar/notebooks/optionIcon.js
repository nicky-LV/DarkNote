import React, {useState} from 'react';
import {animated, useTransition, useSpring} from "react-spring";
import optionsIcon from '../../../static/images/more.png'

export const OptionIcon = (passedProps) => {
    const [show, set] = useState(true)

    const animation = useSpring({
        from: {opacity: 0, marginLeft: 50},
        to: {opacity: 1, marginLeft: 50}
    })

    return(
        show && <animated.img style = {animation}
                              src = {optionsIcon}
                              alt = "Notebook options icon"
                              onClick={(e) => {
                                  e.stopPropagation()
                                  set(false)
                                  passedProps.handleClick()
                              }} />
)
}