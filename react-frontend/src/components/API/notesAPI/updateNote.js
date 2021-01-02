import Cookies from "js-cookie";
import axios from 'axios'


export function updateNote(data, notebookSlug, noteSlug) {
    const config = {
        headers: {
            Authorization: "Token " + Cookies.get("token")
        }
    }

        axios.patch(`https://django-react-297812.ew.r.appspot.com/api/note/update/${notebookSlug}/${noteSlug}/`,
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