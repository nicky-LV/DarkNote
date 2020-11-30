import Cookies from "js-cookie";

export const config = {
    headers: {
        Authorization: "Token " + Cookies.get("token"),
        'Content-Type': 'application/json'
    }
}