import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdOutlineSort } from "react-icons/md";
import {useSelector } from "react-redux"

const Navbar = () => {
    const links = [
        {
            title: "Home",
            link: "/",
        },
        {
            title: "All Books",
            link: "/all-books",
        },
        {
            title: "About",
            link: "/about",
        },
        {
            title: "Cart",
            link: "/cart",
        },
        {
            title: "Profile",
            link: "/profile",
        },
        {
            title: "Admin Profile",
            link: "/profile",
        },
    ];
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role)
    const location = useLocation();

    if (isLoggedIn === false) {
        // Guest: keep Home, All Books, About; remove Cart, Profile, Admin Profile
        links.splice(3, 3);
    }
    if (isLoggedIn === true && role === "user") {
        // Logged-in user: remove Admin Profile
        links.splice(5, 1);
    }
    if (isLoggedIn === true && role === "admin") {
        // Admin: remove Cart and user Profile
        links.splice(3, 2);
    }

    const [MobileNav, setMobileNav] = useState("hidden"); //MobileNav is a state variable that controls the visibility of the mobile navigation menu. Initially, it is set to "hidden".

    return (
        <>
            <nav className='z-50 sticky top-0 flex bg-white text-zinc-900 dark:bg-zinc-800 dark:text-white px-8 py-4 items-center justify-between shadow-sm dark:shadow-none'>
                <Link to="/" className='flex items-center'>
                    <img
                        className="h-10 me-4"
                        src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
                        alt="logo"
                    />
                    <h1 className="text-2xl font-semibold">Digital BookShelf</h1>
                </Link>
                <div className='nav-links-digitalbookshelf block md:flex items-center gap-4'>
                    
                    
                    <div className='hidden md:flex gap-4'>
                        {links.map((items) => {
                            const isActive = location.pathname === items.link;
                            return (
                              <div className='flex items-center' key={items.title}>
                                <Link
                                  to={items.link}
                                  className={
                                    isActive
                                      ? 'px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'
                                      : 'hover:text-blue-500 transition-all duration-300'
                                  }
                                >
                                  {items.title}
                                </Link>
                              </div>
                            );
                        })}
                    </div>

                    
                    <div className='hidden md:flex gap-4 items-center'>
                        {isLoggedIn === false && (
                            <>
                                <Link
                                    to="/Login"
                                    className='px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'
                                >
                                    LogIn
                                </Link>
                                <Link
                                    to="/SignUp"
                                    className='px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'
                                >
                                    SignUp
                                </Link>
                            </>
                        )}
                    </div>


                    <button
                     className='block md:hidden text-white text-2xl hover:text-zinc-400' 
                    onClick={() => 
                    MobileNav === "hidden" 
                    ? setMobileNav("block") 
                    : setMobileNav("hidden")}>
                        <MdOutlineSort />
                    </button>
                </div>
            </nav>
            <div className={`${MobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
                {links.map((items) => (
                    <Link
                        to={items.link}
                        className={` ${MobileNav}text-white text-4xl mb-8 font-semibold hover:text-blue-500 transition-all duration-300`}
                        key={items.title}
                        onClick={() => 
                            MobileNav === "hidden" 
                            ? setMobileNav("block") 
                            : setMobileNav("hidden")}
                    >
                        {items.title}{" "}
                    </Link>
                ))}


                    {isLoggedIn === false && (
                        <>
                        
                <Link
                    to="/Login"
                    className= {`${MobileNav} px-8 mb-8 text-3xl font-semibold py-2 border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300`}
                >
                    LogIn
                </Link>
                <Link
                    to="/SignUp"
                    className= {`${MobileNav} px-8 mb-8 text-3xl font-semibold py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300`}
                >
                    SignUp
                </Link>
                </>
                    )}


            </div>
        </>
    );
};

export default Navbar;
