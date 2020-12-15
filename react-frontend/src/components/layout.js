import React from 'react';
import {Sidebar} from "./sidebar/sidebar";
import {RichTextEditor} from "./draft-js/RichTextEditor";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {UserLoginInterface} from "./login/user-login-interface";

export class Layout extends React.Component{

    render(){
        return(
                <Router>
                    <Switch>
                        <Route exact path="/">

                            <UserLoginInterface />

                        </Route>

                        <Route exact path="/dashboard">

                            <div className="row" style={{height:"100vh"}}>
                                <Sidebar />
                            </div>

                        </Route>
                    </Switch>
                </Router>

        )
    }
}