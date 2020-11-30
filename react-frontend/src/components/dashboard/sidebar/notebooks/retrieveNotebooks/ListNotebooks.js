import axios from "axios";
import Cookies from "js-cookie";
import React from 'react';
import {GetNotebooks} from "./getNotebooks";
import {GetNotebooksAPI} from "../../../../API/notebooks/getNotebooks";
import '../../../../../static/css/dashboard/notebooks/getNotebooks.css';


export class ListNotebooks extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            notebookList: [],
            notebookRenamed: null
        }

        this.getNotebooks = this.getNotebooks.bind(this)
    }

    getNotebooks(){
        const list_of_notebooks = []
        GetNotebooksAPI() // API returns an array of arrays [notebookName, notebookSlug]
            .then( res => {
                    const notebooks = res.data.success
                    notebooks.forEach(notebook => {
                            list_of_notebooks.push(notebook)
                        }
                    )

                    this.setState({
                            notebookList: list_of_notebooks
                        }
                    )

                }
            )
            .catch( err => console.log(err.response.data))
    }


    componentDidMount() {
        this.getNotebooks()
    }

    render(){
        return(
            <GetNotebooks
                notebookList = {this.state.notebookList}
                handleNotebookClick = {this.props.handleNotebookClick}
                handleRenameIconClick = {this.props.handleRenameIconClick}
                handleDeleteIconClick = {this.props.handleDeleteIconClick}
                handleNotebookCreate = {this.props.handleNotebookCreate}
            />
        )

    }

}