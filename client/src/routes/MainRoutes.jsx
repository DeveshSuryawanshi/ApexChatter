import {Routes, Route} from 'react-router-dom';
import Chats from '../pages/Chats';
import Login from '../pages/Login';
import Register from '../pages/Register';
import SetUserAvtar from '../pages/SetUserAvtar';

export default function MainRoutes() {
  return (
    <Routes>
        <Route path='/' element={<Chats/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/setUserAvatar' element={<SetUserAvtar/>}/>
        <Route path='*' element={<h1>404 Not found</h1>}/>
    </Routes>
  )
}
