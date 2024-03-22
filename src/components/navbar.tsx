'use client'
import React, {useEffect, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useAuth} from "@/context/AuthContext";

const MenuItemsObject = [
    {
        label: 'Shop',
        href: '/'
    },
    {
        label: 'Skills',
        href: '/'
    },
    {
        label: 'Stories',
        href: '/'
    },
    {
        label: 'About',
        href: '/'
    },
    {
        label: 'Contact Us',
        href: '/'
    }
]

const NavBar = () => {
    const router = useRouter();
    const {user, logout} = useAuth();
    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth >= 1100);
        };
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])
    return (
        <>
            {isMobile ? (
                <div>
                    <div className="h-[32px] justify-around items-center bg-black flex flex-row">
                        {[...Array(3)].map((i, index) => (
                            <div key={index} className="flex flex-row gap-[5px] items-center">
                                <img src="/lorem-element.svg" alt={'element'} className="w-[16px] h-[16px]"/>
                                <span className="text-[#EB4C6B] text-[14px] font-light">
                            Lorem Impus
                        </span>
                            </div>
                        ))}
                    </div>
                    <div className="w-[100%] mt-[20px] flex-col flex border-b border-[#E5E5E5]">
                        <div className="h-[50px] justify-around items-center flex flex-1 flex-row">
                            <img src='/Logo.svg' alt={'logo'} className="w-[36px] h-[36px] "/>
                            <h1 className="text-[36px] font-bold text-[#000]">LOGO</h1>
                            <div className="flex flex-row gap-[20px] items-center">
                                <img src='/search-normal.svg' alt='img' className="cursor-pointer w-[24px] h-[24px]"/>
                                <img src='/unlike.svg' alt='img' className="cursor-pointer w-[24px] h-[24px]"/>
                                <img src='/shopping-bag.svg' alt='img' className="cursor-pointer w-[24px] h-[24px]"/>
                                {user ? (
                                    <button onClick={logout}
                                            className="h-[35px] px-[20px] flex items-center justify-center bg-black text-white rounded font-medium text-[18px]">Logout
                                    </button>
                                ) : (
                                    <button onClick={() => router.push("/login")}
                                            className="h-[35px] px-[20px] flex items-center justify-center bg-black text-white rounded font-medium text-[18px]">Login
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-center items-center py-[20px]">
                            <div className="flex flex-row items-center gap-[40px]">
                                {MenuItemsObject.map((i, index) => (
                                    <Link href={i.href}
                                          key={index}
                                          className="cursor-pointer font-medium text-[18px] uppercase text-black">
                                        {i.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="relative">
                    <div className="h-[32px] justify-center items-center bg-black flex flex-row">
                        {[...Array(1)].map((i, index) => (
                            <div key={index} className="flex flex-row gap-[5px] items-center">
                                <img src="/lorem-element.svg" alt={'element'} className="w-[16px] h-[16px]"/>
                                <span className="text-[#EB4C6B] text-[14px] font-light">
                            Lorem Impus
                        </span>
                            </div>
                        ))}
                    </div>
                    <div
                        className="py-[20px] flex flex-row justify-between items-center border-b border-[#F1F1F1] px-[10px]">
                        <div className="flex flex-row gap-[8px]">
                            <img onClick={() => setIsOpen(true)} src="/hamburger-menu.svg" alt={'hamburger-menu'}
                                 className="w-[20px] h-[20px] cursor-pointer"/>
                            <img src="/Logo.svg" alt="logo" className="w-[20px] h-[20px] cursor-pointer"/>
                        </div>
                        <h1 className="text-[24px] font-bold uppercase text-black">
                            Logo
                        </h1>
                        <div className="flex flex-row gap-[5px] items-center">
                            <img src="/search-normal.svg" alt={'serach icon'}
                                 className="cursor-pointer w-[20px] h-[20px]"/>
                            <img src="/unlike.svg" alt={'like icon'} className="cursor-pointer w-[20px] h-[20px]"/>
                            {user ? (
                                <button
                                    onClick={logout}
                                    className="text-white bg-black px-[10px] py-[4px] rounded font-medium text-[14px]">Logout
                                </button>
                            ) : (
                                <button
                                    onClick={() => router.push("/login")}
                                    className="text-white bg-black px-[10px] py-[4px] rounded font-medium text-[14px]">Login
                                </button>
                            )}
                            <div
                                className={`fixed  inset-0 z-[22] top-0 pt-[40px] flex  justify-center  left-0 h-full w-[100%] md:w-[250px] bg-[#E5E6FF] transform transition-transform ease-in-out duration-300 ${
                                    isOpen ? 'translate-x-0' : '-translate-x-full'
                                }`}
                            >
                                <div className="flex flex-col justify-center items-center gap-[40px]">
                                    {MenuItemsObject.map((i, index) => (
                                        <Link href={i.href}
                                              key={index}
                                              onClick={() => setIsOpen(false)}
                                              className="cursor-pointer font-medium text-[18px] uppercase text-black">
                                            {i.label}
                                        </Link>
                                    ))}
                                </div>
                                <div
                                    onClick={() => setIsOpen(false)}
                                    className={`absolute top-[20px] bg-black text-white w-[30px] h-[30px] rounded-full flex items-center justify-center shadow-md cursor-pointer right-[20px] ${
                                        isOpen ? 'block' : 'hidden'
                                    }`}
                                >
                                    X
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default NavBar;
