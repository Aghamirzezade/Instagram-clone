import AuthLayout from 'pages/auth'
import Login from 'pages/Login'
import Register from 'pages/Register'
import Home from './pages/Home'
import MainLayout from './pages/layout'
import PrivateRoute from 'components/PrivateRoute'
import ProfileLayout from 'pages/profile'
import ProfilePosts from 'pages/profile/posts'
import ProfileTagged from 'pages/profile/tagged'

const routes = [
    {
        path: '/',
        element: <MainLayout/>,
        auth: true,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: ':username',
                element: <ProfileLayout/>,
                children: [
                    {
                        index: true,
                        element:<ProfilePosts/>
                    },
                    {
                        path : 'tagged',
                        element: <ProfileTagged/>
                    }

                ]
            }            
        ]
    },
    {
        path: '/auth',
        element : <AuthLayout/>,
        children: [
            {
                path : 'login',
                element : <Login/>
            },
            {
                path: 'register',
                element :<Register/>
            }
        ]
    }
]

const authCheck = routes => routes.map(route=>{
    if(route?.auth){
        route.element= <PrivateRoute>{route.element}</PrivateRoute>
    }
    if(route?.children){
        route.children= authCheck(route.children)
    }
    return route
})

export default authCheck(routes)