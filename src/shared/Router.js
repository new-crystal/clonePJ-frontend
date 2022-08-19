import {Navigate, Route, Routes} from 'react-router-dom'

const Router = () => {

    return(
        <Routes>
            <Route path='/' element={<Main/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/singup' element={<SignUp/>}/>
            <Route path='/room/:roomId' element={<Room/>}/>
            <Route path='/*' element={<Navigate to="/"/>}/>
        </Routes>
    )
}

export default Router