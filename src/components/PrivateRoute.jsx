import React from 'react'
import { Navigate , useLocation} from 'react-router-dom'
import { useSelector } from 'react-redux/es/exports'

const PrivateRoute = ({children}) => {
const Location = useLocation()
const user = useSelector(state => state.auth.user)
if(!user){
 return <Navigate to="/auth/login" replace={true} state={{
    return_url: Location.pathname
 }} />
}
return children

}

export default PrivateRoute