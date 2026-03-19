'use client';

import { useSession } from 'next-auth/react';
import { useUIStore } from '@/store';
import clsx from 'clsx';
import { IoCloseOutline} from 'react-icons/io5';
import { AdminMenu } from './AdminMenu';
import { UserMenu } from './UserMenu';

export const SideBar = () => {

    const isSideMenuOpen = useUIStore(state => state.isSideMenuOpen);
    const closeMenu = useUIStore(state => state.closeSideMenu);

    const { data: token } = useSession();
    
    return (
        <div >

            {/* Black Background */}
            {
                isSideMenuOpen && (
                    <div
                        className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30"
                    />
                )
            }



            {/* Blur */}
            {
                isSideMenuOpen && (
                    <div
                        onClick={closeMenu}
                        className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-xs"
                    />
                )
            }



            {/* SideMenu */}
            <nav

                className={
                    clsx(
                        'fixed p-5 right-0 top-0 w-125 h-screen bg-white z-20 shadow-2xl transform transition-all duration-300',
                        {
                            "translate-x-full": !isSideMenuOpen
                        }
                    )
                }
            >
                <IoCloseOutline
                    size={50}
                    className="absolute top-5 right-5 cursor-pointer"
                    onClick={closeMenu}
                />

              {/* Menú */}
            {
                token?.user.role === 'admin' 
                    
                    ?   <AdminMenu />
                    :   <UserMenu />
                
            }

            </nav>

        </div>
    )
}
