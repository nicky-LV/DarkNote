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
    return await axios.delete(`http://127.0.0.1:8000/api/notebook/delete/${notebookSlug}/`, payload_with_headers)
}