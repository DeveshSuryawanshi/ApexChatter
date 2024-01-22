import Cookies from "js-cookie";

export default function GetCookie(cookieName) {
    return Cookies.get(cookieName);
}
