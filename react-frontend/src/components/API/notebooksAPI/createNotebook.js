import axios from 'axios';
import config from '../config'

export const CreateNotebookAPI = (name) => {
    const data = {
        name: name
    }
    return axios.post("http://127.0.0.1:8000/api/notebook/create/", data, config)

}