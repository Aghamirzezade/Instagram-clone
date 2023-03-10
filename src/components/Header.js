import React from 'react'
import InstaLogo from '../assets/images/main-instagram.png'
import {Link,NavLink} from 'react-router-dom'
import Search from './Search'
import { logout } from '../firebase'
import {GrHomeRounded} from 'react-icons/gr'
import {RiMessengerLine} from 'react-icons/ri'
import {CgAddR} from 'react-icons/cg'
import {ImCompass2} from 'react-icons/im'
import {AiOutlineHeart, } from 'react-icons/ai'
import DefaultAvatar from '../assets/images/DefaultAvatar.jpg'
import { useSelector } from 'react-redux'

export default function  Header () {
  const user = useSelector(state => state.auth.user)

  return (
    <header className='bg-white border-b border-gray-300 '>
        <div className=' h-[60px] flex items-center gap-x-36 justify-between mx-36'>
        <Link to="/">
        <img className='h-[29px]' src={InstaLogo} />
        </Link>
        <Search/>
        <nav className='flex items-center gap-x-6'>
          <NavLink to='/test1'> 
            <GrHomeRounded name='home' size={24}/> 
          </NavLink>
          <NavLink to="/" >
            <RiMessengerLine name="direct" size={24}/>
          </NavLink>
          <NavLink to="/">
            <CgAddR name="new" size={24} />
          </NavLink>
          <NavLink to="/" >
            <ImCompass2 name="explore" size={24} />
          </NavLink>
          <NavLink to="/" >
            <AiOutlineHeart name="heart" size={24} />
          </NavLink>

            <NavLink to={`/${user.username}`} >
              <img src={DefaultAvatar}  className="h-6 w-6 rounded-full"/>
            </NavLink>
        </nav>
        </div>
    </header>
  )
}
