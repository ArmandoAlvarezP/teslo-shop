'use client';

import { logout } from "@/actions";
import { useUIStore } from "@/store";
import { useSession } from "next-auth/react";
import Link from "next/link"
import { IoLogInOutline, IoLogOutOutline, IoPersonOutline, IoSearchOutline, IoTicketOutline } from "react-icons/io5"

export const UserMenu = () => {

    const closeMenu = useUIStore(state => state.closeSideMenu);

    const { data: session } = useSession();
    const isAuthenticated = !!session?.user;
    
        const loginOut = async () => {
            await logout();
            closeMenu();
            window.location.reload();
        }

    return (
        <>
            {/* Input */}
            <div className="relative mt-14">
                <IoSearchOutline size={20} className='absolute top-2 left-2' />
                <input
                    type="text"
                    placeholder='Buscar'
                    className='w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500'
                />
            </div>

            {/* Menú */}

            <Link
                onClick={closeMenu}
                href={'/profile'}
                className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
            >
                <IoPersonOutline size={30} />
                <span className='ml-3 text-xl'>Perfil</span>
            </Link>

            <Link
                href={'/'}
                className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
            >
                <IoTicketOutline size={30} />
                <span className='ml-3 text-xl'>Ordenes</span>
            </Link>

            {
                isAuthenticated && (
                    <button
                        onClick={loginOut}
                        className='flex w-full items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all cursor-pointer'
                    >
                        <IoLogOutOutline size={30} />
                        <span className='ml-3 text-xl'>Salir</span>
                    </button>
                )
            }

            {
                !isAuthenticated && (
                    <Link
                        href={'/auth/login'}
                        onClick={closeMenu}
                        className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                    >
                        <IoLogInOutline size={30} />
                        <span className='ml-3 text-xl'>Ingresar</span>
                    </Link>
                )
            }
        </>
    )
}
