import {animated, config, useSpring} from "react-spring";
import './introduction.css';
import {Link} from "react-scroll";

export const Introduction = (props) => {
    // useLayoutEffect should be used when working with the DOM. useEffect will run after content is shown to the user (which can be unpleasant).
    // useLayoutEffect handles your DOM operations before actually rendering to the user. Advantage.

    const popUpAnimation = useSpring({
        from: {opacity: 0},
        to: {opacity: 1},
        delay: 800,
        config: {
            clamp: true,
            config: config.stiff
        }
    })

    const slideInAnimation = useSpring({
        from: {height: 0, opacity: 0, color: "#051C2C", fontSize: "0em"},
        to: {height: 100, opacity: 1, color: "#FF8D72", fontSize: "1em"},
        config: {

            clamp: true,
            config: config.stiff
        },
        delay: 600
    })

    const buttonAnimation = useSpring({
        from: {width: "0%", opacity: 0},
        to: {width: "100%", opacity: 1},
        delay: 800,
        config: {
            clamp: true,
            config: config.stiff
        }
    })
    return(
        <div className="col-md-6 my-auto">
            <div className="introduction">
                <h1 className="title">
                    Your notes.
                    <br />
                    <animated.strong style={slideInAnimation} className="standout-text">Revolutionized.</animated.strong>
                </h1>
                <animated.p style = {popUpAnimation} className="description">
                    Dark themed notebook filled with features.
                    <br />
                    Blazingly fast.
                </animated.p>
                <Link to="login-section" spy={true} smooth={true}>
                    <animated.button
                        style={buttonAnimation}
                        className="btn see-more center-block"
                    >
                        Get started
                    </animated.button>
                </Link>
            </div>
        </div>
    )
}