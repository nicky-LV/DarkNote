import axios from 'axios';
import Cookies from 'js-cookie'

export async function DeleteNotebookAPI(notebookSlug, notebookName){
    const payload_with_headers = {
        "headers": {
            Authorization: "Token " + Cookies.get("token")
        },

        data: {
            name: notebookName
        }
    }
    return await axios.delete(`https://django-react-297812.ew.r.appspot.com/api/notebook/delete/${notebookSlug}/`, payload_with_headers)
}