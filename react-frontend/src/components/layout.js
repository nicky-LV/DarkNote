import React from 'react';
import {Sidebar} from "./sidebar/sidebar";
import {RichTextEditor} from "./draft-js/RichTextEditor";

export class Layout extends React.Component{

    render(){
        return(
            <div className="container-fluid">
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
            </div>
        )
    }
}