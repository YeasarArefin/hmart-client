import React, { useState } from 'react';
import { HiMenuAlt3 } from 'react-icons/hi';
import Fade from 'react-reveal/Fade';
import { NavLink, Link } from 'react-router-dom';
import logo from '../../assets/laptop.png';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
    const { user, SingOut } = useAuth();
    const [mobileNav, setMobileNav] = useState(false);
    const menu = [
        { id: 1, text: 'Home', to: '/home' },
        { id: 1, text: 'Explore', to: '/explore' },
        { id: 3, text: 'Singin', to: '/singin' },
        { id: 2, text: 'Singup', to: '/singup' },
        { id: 4, text: 'Dashboard', to: '/dashboard' },
    ];

    //handle click 
    const handleClick = () => {
        setMobileNav(!mobileNav);
    };
    return (
        <header className="fixed top-0 w-full z-50 bg-blue-600">
            {/* desktop nav  */}
            <nav className="container flex items-center px-12 py-3">
                {/* brand  */}
                <Link to="/home" className="flex items-center gap-x-5 flex-grow">
                    <img width="50px" src={logo} alt="brand" />
                    <h1 className="text-xl font-semibold text-white select-none">Hmart</h1>
                </Link>
                {/* menus */}

                <div className="hidden md:flex lg:flex space-x-10">
                    <ul className="flex items-center space-x-6">
                        {menu.map(item => (
                            <li key={item.id}>
                                <NavLink exact activeStyle={{ borderBottom: '2px solid #FFF' }} to={item.to} className="text-white text-lg">{item.text}</NavLink>
                            </li>
                        ))}
                    </ul>

                    {user?.email ? (

                        <div className="flex items-center gap-x-3">

                            <div>
                                <img width="40px" className="rounded-full" src={user?.photoURL ? user?.photoURL : "https://image.flaticon.com/icons/png/512/206/206853.png"} alt="user" />
                            </div>
                            <h1 className="text-white">{user.displayName}</h1>
                            <button onClick={SingOut} className="bg-white px-3 py-2 text-indigo-600 focus:ring-4 transition duration-300 rounded-lg">Sign Out</button>
                        </div>

                    ) : (

                        <Link to="/singup">
                            <button className="bg-white px-3 py-2 text-indigo-600 focus:ring-4 transition duration-300 rounded-lg">Signup</button>
                        </Link>

                    )}

                </div>

                {/* menu icon  */}
                <div className="block md:hidden lg:hidden">
                    <HiMenuAlt3 className="w-10 h-10 ring-blue-300 text-white border border-gray-400 focus:ring-4 cursor-pointer rounded-lg p-2 transform transition duration-200 hover:scale-110" onClick={handleClick} />
                </div>
            </nav>

            {/* mobile nav  */}
            {mobileNav && (
                <Fade>
                    <nav className="bg-white shadow-lg mx-6 mt-2 rounded-lg border border-gray-300 py-4 block md:hidden lg:hidden">
                        <ul>
                            {menu.map(item => (
                                <NavLink exact activeStyle={{ borderBottom: '2px solid #FFF' }} key={item.id} to={item.to} className="text-gray-600 text-lg">
                                    <li className="py-2 px-3 w-full hover:bg-gray-200 transition duration-300 cursor-default">
                                        {item.text}
                                    </li>
                                </NavLink>
                            ))}
                        </ul>

                        {/* button  */}
                        <div className="px-3 py-2">
                            <button className="bg-blue-600 ring-blue-300 px-3 py-2 text-white focus:ring-4 transition duration-300 rounded-lg hover:bg-blue-700 w-full">Signup</button>
                        </div>
                    </nav>
                </Fade>
            )}
        </header>
    );
};

export default Navbar;