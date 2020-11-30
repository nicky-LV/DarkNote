import React from 'react';
import {animated, useSpring} from "react-spring";
import optionsIcon from '../../../../../static/images/more.png'

export const OptionsIcon = (passedProps) => {

    const animation = useSpring({
        from: {opacity: 0},
        to: {opacity: 1}
    })

    return(
        <animated.img style = {animation}
                              src = {optionsIcon}
                              alt = "Note options icon"
                              onClick={(e) => {
                                  e.stopPropagation()
                                  passedProps.handleClick()
                              }}
                      className="options-icon"
        />
)
}