import Cookies from "js-cookie";
import axios from 'axios'


export function updateNote(data, notebookSlug, noteSlug) {
    const config = {
        headers: {
            Authorization: "Token " + Cookies.get("token")
        }
    }

        axios.patch(`http://127.0.0.1:8000/api/note/update/${notebookSlug}/${noteSlug}/`,
                data, config)
                .then(res => {
                        console.log(res.data)
                    }
                )
                .catch(err => {
                        console.log(err.response.data)
                    }
                )
    }