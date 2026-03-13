import { tittleFont } from "@/config/fonts"
import Link from "next/link"

export const Footer = () => {
    return (
        <div className="flex w-full justify-center text-xs mb-10 mt-5">
            <Link
                href={'/'}
            >
                <span className={`${ tittleFont.className } antialiased font-bold`}>Teslo </span>
                <span>| Shop </span>
                <span>&copy; { new Date().getFullYear() }</span>
            </Link>

            <Link
                href={'/'}
                className="mx-5"
            >
                Privacidad & Legal
            </Link>

            <Link
                href={'/'}
                className="mx-5"
            >
                Ubicaciones
            </Link>
        </div>
    )
}
