import Cookies from 'js-cookie';

export default function RemoveCookie(cookieName) {
   Cookies.remove(cookieName);
}
