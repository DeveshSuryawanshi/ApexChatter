//Host
// export const Host = 'http://localhost:3002'
export const Host = process.env.REACT_APP_API_URL || "http://localhost:3002";

//Routes
export const registerApi = `${Host}/users/api/auth/register`;
export const loginApi = `${Host}/users/api/auth/login`;
export const setAvatarApi = `${Host}/users/api/auth/setAvatar`;
// export const multiAvatarApi = `https://api.multiavatar.com/2645698`;
export const multiAvatarApi = `${Host}/users/api/auth/createAvatars`;
export const allContactsApi = `${Host}/users/api/auth/allContacts`;
export const sendMessage = `${Host}/api/messages/addMessage`;
export const getMessages = `${Host}/api/messages/getMessages`;
