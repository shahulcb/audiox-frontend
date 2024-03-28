import { faBook, faHome, faPowerOff, faSearch, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTheme } from '../context/ThemeContext';
import { Link, NavLink } from 'react-router-dom';
import instance from "../axios"
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { userLogut } from '../redux-toolkit/userAuth';
import cookie from 'js-cookie'

const Drawer = ({ children }) => {
    const user = useSelector((state) => state.user.user)
    const dispatch = useDispatch()
    const { theme, handleToggle } = useTheme();
    const handleLogout = async () => {
        try {
            const response = await instance.post("user/logout", {}, { withCredentials: true })
            toast.success(response.data.message)
            await new Promise(resolve => setTimeout(resolve, 2000));
            cookie.remove('token')
            dispatch(userLogut())
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                <div className="navbar py-3 px-4 lg:py-7 lg:px-7">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                    <div className="flex-1 ml-2 lg:ml-0">Good afternoon {user?.username}</div>
                    <label className="swap swap-rotate mr-5">
                        <input type="checkbox" className="theme-controller" onChange={(e) => handleToggle(e.target.checked)} checked={theme === "light" ? false : true} />
                        <svg className="swap-on fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
                        <svg className="swap-off fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
                    </label>
                    <div className="flex-none">
                        <Link to={"/dashboard/profile"}>
                            <div className="avatar">
                                <div className="w-12 rounded-full">
                                    {user?.avatar ?
                                        <img src={user?.avatar} alt='' />
                                        :
                                        <img src={`https://avatar.iran.liara.run/username?username=${user?.username}`} alt='' />
                                    }
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className='p-6'>
                    {children}
                </div>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-72 min-h-full bg-base-200 gap-2">
                    <li><Link to={""} className='text-2xl font-bold flex gap-0'>Audio<span className=''>X</span></Link></li>
                    <li className='mt-10 text-base'><NavLink to={"/dashboard"}><FontAwesomeIcon icon={faHome} />Home</NavLink></li>
                    <li className='text-base'><NavLink to={"/dashboard/search"}><FontAwesomeIcon icon={faSearch} />Search</NavLink></li>
                    <li className='text-base'><NavLink to={"/dashboard/playlists"}><FontAwesomeIcon icon={faBook} />Playlists</NavLink></li>
                    <li className='text-base'><NavLink to={"/dashboard/upload"}><FontAwesomeIcon icon={faUpload} />Upload</NavLink></li>
                    <li className='text-base'><Link onClick={handleLogout}><FontAwesomeIcon className='text-error' icon={faPowerOff} />Logout</Link></li>
                </ul>
            </div>
        </div >
    )
}

export default Drawer
