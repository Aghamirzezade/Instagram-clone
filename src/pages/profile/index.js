import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Outlet } from "react-router";
import { getUserInfo } from "firebase.js";
import Header from "../profile/header";
import { NavLink  } from "react-router-dom";
import {AiOutlineTable, AiOutlineTag} from 'react-icons/ai'
import classNames from "classnames";
import ProfileNotFound from '../profile/not-found';

export default function ProfileLayout() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const { username } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getUserInfo(username)
      .then((user) => {
        setUser(user);
      })
			.catch(err => {
				setUser(false)
			})
},[])
if(user === false){
  return <ProfileNotFound/>
}
if (user === null) {
  return (
    <div>
      Loading...
    </div>
  )
}
  
  return user && (
   <div>
    <Header user={user} />
       <nav className="border-t  mx-36 gap-x-16 flex justify-center items-center">
        <NavLink to={`/${username}`} end={true} className={({isActive})=> classNames({
            'text-xs flex border-t  tracking-widest  py-5 items-center gap-x-1.5 font-semibold': true,
            'text-[#8e8e8e] border-transparent' : !isActive,
            'text-black border-black': isActive
        })} >
            <AiOutlineTable name="post" size={24}/>
            POSTS
        </NavLink>
        <NavLink to={`/${username}/tagged`} end={true} className={({isActive})=> classNames({
            'text-xs flex border-t  tracking-widest py-5 items-center gap-x-1.5 font-semibold': true,
            'text-[#8e8e8e] border-transparent' : !isActive,
            'text-black border-black': isActive
        })}  >
            <AiOutlineTag name="tag" size={24}/>
            TAGGED
        </NavLink>
        </nav> 
        <Outlet/>
    </div>
    )
}