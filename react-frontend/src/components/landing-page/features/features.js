import {animated, useSpring} from "react-spring";
import './features.css';
import React from "react";

export const Features = (props) => {
    const featuresAnimation = useSpring({
        from: {marginBottom: -300, opacity: 0},
        to: {marginBottom: 0, opacity: 1},
        delay: 800
    })
    return (
        <animated.div className="features my-auto px-0 pb-3" style={featuresAnimation}>
            <h1 className="header mb-5">Features</h1>
            {/* Since this is static, we can make it into an object and then .map() */}
            <div className="feature">
                <h4 className="feature-title"> Offline notes </h4>
                <p className="description">
                    Download your notes to view and continue writing offline.
                </p>
            </div>
            <div className="feature mt-5">
                <h4 className="feature-title"> Elegant </h4>
                <p className="description">
                    Our soothing dark theme is easy on the eyes.
                </p>
            </div>
            <div className="feature mt-5">
                <h4 className="feature-title">
                    Fast
                </h4>

                <p className="description">
                    Simple and concise, achieve your goals faster.
                </p>
            </div>
        </animated.div>
    )}