import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className="h-full w-full flex flex-wrap overflow-auto items-center gap-x-8 justify-center pt-16">
        <Outlet/>
    </div>
  )
}

export default AuthLayout