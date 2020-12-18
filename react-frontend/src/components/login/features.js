import greenIcon from "../../static/images/green.png";
import orangeIcon from "../../static/images/orange.png";
import pinkIcon from "../../static/images/pink.png";
import {animated, useSpring} from "react-spring";

export const Features = (props) => {
    const featuresAnimation = useSpring({
        from: {marginBottom: -300, opacity: 0},
        to: {marginBottom: 0, opacity: 1},
        delay: 800
    })
    return (
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
    )}