import { useState } from 'react'
import {AiOutlineSearch ,AiFillCloseCircle} from 'react-icons/ai'
import classNames from 'classnames'

export default function Search() {
    const style = { color: "#8e8e8e"}
    const cStyle = { color: "#c7c7c7"}

    const [open, setOpen] = useState(false)

    return (
        <label className="w-[268px] relative text-gray group">
            <span  className={classNames({
                'absolute top-0 left-0 h-9 w-9 flex items-center justify-center group-focus-within:hidden': true,
                "hidden": !open
            })} >
                <AiOutlineSearch style={style}/>
            </span>    
            <input onFocus={()=> setOpen(true)} onBlur={()=> setOpen(false)} type="text" placeholder="Search" className="h-9 focus:pl-3 outline-none w-full pl-9 p-2 rounded bg-[#efefef]"/>
            <span className={classNames({
                'absolute hidden group-focus-within:flex top-0 right-0 w-9 h-9 cursor-pointer items-center justify-center' :true,
                "flex": open
            })}>
                <AiFillCloseCircle style={cStyle}/>
            </span>
        </label>
    )
}