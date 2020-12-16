import {LoginRegisterSelector} from "./login-register-selector";
import "../../static/css/login/user-login-interface.css";
import {animated, useSpring, config} from "react-spring";
import {useState, useRef, useLayoutEffect} from "react";
import greenIcon from '../../static/images/green.png';
import orangeIcon from '../../static/images/orange.png';
import pinkIcon from '../../static/images/pink.png';

export const UserLoginInterface = (props) => {
    const [descriptionWidth, setDescriptionWidth] = useState(null)
    const descriptionRef = useRef(); // allows us to access properties of the "description div" element in the DOM

    useLayoutEffect(() =>{
        const descriptionWidth = descriptionRef.current.clientWidth
        setDescriptionWidth(descriptionWidth)
    }, [])

    // useLayoutEffect should be used when working with the DOM. useEffect will run after content is shown to the user (which can be unpleasant).
    // useLayoutEffect handles your DOM operations before actually rendering to the user. Advantage.

    const slideInAnimation = useSpring({
        from: {height: 0, opacity: 0, color: "#051C2C", fontSize: "0em"},
        to: {height: 100, opacity: 1, color: "#FF8D72", fontSize: "1em"},
        config: {

            clamp: true,
            config: config.stiff
        },
        delay: 400
    }) // todo: would it be possible to add an animated underline?

    const popUpAnimation = useSpring({
        from: {opacity: 0},
        to: {opacity: 1},
        delay: 1000,
        config: {
            clamp: true,
            config: config.stiff
        }
    })

    const buttonAnimation = useSpring({
        from: {width: 0, opacity: 0},
        to: {width: descriptionWidth, opacity: 1},
        delay: 1500,
        config: {
            clamp: true,
            config: config.stiff
        }
    })

    const featuresAnimation = useSpring({
        from: {marginBottom: -300, opacity: 0},
        to: {marginBottom: 0, opacity: 1},
        delay: 1500
    })
    return(
        <div className="container-fluid landing-page-container">
            <div className="container my-auto h-100">
                <div className="row h-100">
                    <div className="col-md-6 introduction my-auto">
                        <h1 className="title">
                            Your notes.
                            <br />
                            <animated.strong style={slideInAnimation} className="standout-text">Revolutionized.</animated.strong>
                        </h1>
                        <animated.p style = {popUpAnimation} className="description" ref={descriptionRef}>
                            Dark themed notebook filled with features.
                            <br />
                            Blazingly fast.
                        </animated.p>

                        <animated.button
                            style={buttonAnimation}
                            className="btn see-more center-block"
                        >
                            See more
                        </animated.button>
                    </div>

                    <div className="col-md-6">
                        <animated.div className="features" style={featuresAnimation}>
                            {/* Since this is static, we can make it into an object and then .map() */}
                            <div className="feature">
                                <h4 className="feature-title"> Offline notes</h4>
                                <div className="icon-container">
                                    <img src={greenIcon} className="feature-icon" alt="By downloading your notes, you can read and edit them offline."/>
                                </div>
                                <p className="description">
                                    Download your notes to view and continue writing offline.
                                </p>
                            </div>
                            <div className="feature pt-5">
                                <h4 className="feature-title">Elegant</h4>
                                <div className="icon-container">
                                    <img src={orangeIcon} className="feature-icon" alt="By downloading your notes, you can read and edit them offline."/>
                                </div>
                                <p className="description">
                                    Our soothing dark theme is easy on the eyes.
                                </p>
                            </div>
                            <div className="feature pt-5 pb-4">
                                <h4 className="feature-title">
                                    Fast
                                </h4>
                                <div className="icon-container">
                                    <img src={pinkIcon} className="feature-icon" alt="By downloading your notes, you can read and edit them offline."/>
                                </div>

                                <p className="description">
                                    Simple and concise, our notebook allows you get stuff done. Quickly.
                                </p>
                            </div>
                        </animated.div>
                    </div>
                </div>
            </div>
        </div>)

}