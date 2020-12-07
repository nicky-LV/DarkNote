import axios from 'axios';
import config from '../config'

export const CreateNotebookAPI = (name) => {
    const data = {
        name: name
    }
    return axios.post("https://django-react-297812.ew.r.appspot.com/api/notebook/create/", data, config)

}