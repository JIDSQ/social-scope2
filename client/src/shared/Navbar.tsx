import React from 'react'
import Icon from '../assets/icon.svg'
import avatar from '../assets/Ellipse 15.png'

const Navbar = (): JSX.Element => {
    return (
        <nav className="w-full z-40 bg-white border-2 shadow-md border-gray-200 px-2 sm:px-10 py-5 ">
            <div className=" flex flex-wrap items-center justify-between mx-auto">
                <a
                    href="https://flowbite.com/"
                    className="flex justify-end items-center"
                >
                    <img
                        src={Icon}
                        className="h-6 mr-3 sm:h-9"
                        alt="Flowbite Logo"
                    />
                    <div className="mx-4">
                        <span className="self-center text-lg font-semibold whitespace-nowrap text-primary leading-none">
                            Social Scope
                        </span>
                        <p className="text-gray-400 text-sm leading-none ">
                            Insight for positive change
                        </p>
                    </div>
                </a>
                <div className="flex items-center ">
                    <button
                        type="button"
                        className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 "
                        id="user-menu-button"
                        aria-expanded="false"
                        data-dropdown-toggle="user-dropdown"
                        data-dropdown-placement="bottom"
                    >
                        <span className="sr-only">Open user menu</span>
                        <img
                            className="w-8 h-8 rounded-full"
                            src={avatar}
                            alt="user photo"
                        />
                    </button>

                    <span className="mx-3 hidden md:inline-block text-gray-600">
                        {' '}
                        Municipality Name
                    </span>

                    <button
                        type="button"
                        className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
                        aria-controls="mobile-menu-2"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-6 h-6"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
