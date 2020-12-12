import React from 'react';
import {Sidebar} from "./sidebar/sidebar";
import {RichTextEditor} from "./draft-js/RichTextEditor";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

export class Layout extends React.Component{

    render(){
        return(
            <div className="container-fluid">
                <Router>
                    <Switch exact path="/">
                        <h1>Hi!</h1>
                    </Switch>
                    <Switch>
                        <Route exact path="/dashboard/">
                            <div className="row" style={{height:"100vh"}}>
                                <Sidebar />
                                <div className="col">
                                    <div className="row">
                                        <div className="col-md" id="rich-text-editor">
                                            <RichTextEditor />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Route>
                    </Switch>
                </Router>

            </div>
        )
    }
}