import Cookies from "js-cookie"

export default function SetCookie(cookieName, userIn) {
    Cookies.set(cookieName, userIn,{
        expires: 7,
        secure: true,
        sameSite: 'strict',
        path: "/"
    });
}
