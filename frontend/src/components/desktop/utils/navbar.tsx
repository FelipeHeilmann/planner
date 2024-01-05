"use client"
import { Book, Brain, ChevronRight, Compass, Gamepad2, HelpingHand, Home, LineChart, LogOut, Pencil, Settings } from "lucide-react";
import Link from "next/link";
import { useContext, useState } from "react";
import { usePathname } from "next/navigation";
import { ThemeContext } from "@/context/themeContex";
import { EThemeColor } from "../../../../types/enums-color-theme";

export default function Navbar() {

    const [isNavbarFull, setIsNavbarFull] = useState(false)

    const { themeValue } = useContext(ThemeContext)

    const pathName = usePathname()

    const mainBlue = '#6266f5'
    const mainPink = '#f25178'

    let iconColor: string

    themeValue === EThemeColor.Blue ? iconColor = mainBlue : iconColor = mainPink

    const icons = [
        {
            icon: <Home width={20} stroke="#fff" color={iconColor} strokeWidth={2} className={`${(!isNavbarFull && pathName === '/bemvindo') && 'hidden'} absolute z-10 ${isNavbarFull ? 'duration-150 -translate-x-[35px] w-[22px]' : 'group-hover:hidden left-1/2 -translate-x-1/2 w-[25px]'}`} />,
            iconHover: <Home width={20} stroke={iconColor} color={iconColor} strokeWidth={2} className={`${pathName === '/bemvindo' ? 'block' : 'hidden'} group-hover:block absolute ${isNavbarFull ? 'duration-150 -translate-x-[25px] w-[22px]' : 'left-1/2 -translate-x-1/2 w-[25px]'}`} />,
            expandText: 'Página Inicial',
            href: '/bemvindo'
        },
        {
            icon: <Book width={20} stroke="#fff" color={iconColor} strokeWidth={2} className={`${(!isNavbarFull && pathName === '/leitura') && 'hidden'} absolute z-10 ${isNavbarFull ? 'duration-150 -translate-x-[35px] w-[22px]' : 'group-hover:hidden left-1/2 -translate-x-1/2 w-[25px]'}`} />,
            iconHover: <Book width={20} stroke={iconColor} color={iconColor} strokeWidth={2} className={`${pathName === '/leitura' ? 'block' : 'hidden'} group-hover:block absolute ${isNavbarFull ? 'duration-150 -translate-x-[25px] w-[22px]' : 'left-1/2 -translate-x-1/2 w-[25px]'}`} />,
            expandText: 'Leituras',
            href: '/leitura'
        },
        {
            icon: <Compass width={20} stroke="#fff" color={iconColor} strokeWidth={2} className={`${(!isNavbarFull && pathName === '/plano-leitura') && 'hidden'} absolute z-10 ${isNavbarFull ? 'duration-150 -translate-x-[35px] w-[22px]' : 'group-hover:hidden left-1/2 -translate-x-1/2 w-[25px]'}`} />,
            iconHover: <Compass width={20} stroke={iconColor} color={iconColor} strokeWidth={2} className={`${pathName === '/plano-leitura' ? 'block' : 'hidden'} group-hover:block absolute ${isNavbarFull ? 'duration-150 -translate-x-[25px] w-[22px]' : 'left-1/2 -translate-x-1/2 w-[25px]'}`} />,
            expandText: 'Planos',
            href: '/plano-leitura'
        },
        {
            icon: <Pencil width={20} stroke="#fff" color={iconColor} strokeWidth={2} className={`${(!isNavbarFull && pathName === '/devocional') && 'hidden'} absolute z-10 ${isNavbarFull ? 'duration-150 -translate-x-[35px] w-[22px]' : 'group-hover:hidden left-1/2 -translate-x-1/2 w-[25px]'}`} />,
            iconHover: <Pencil width={20} stroke={iconColor} color={iconColor} strokeWidth={2} className={`${pathName === '/devocional' ? 'block' : 'hidden'} group-hover:block absolute ${isNavbarFull ? 'duration-150 -translate-x-[25px] w-[22px]' : 'left-1/2 -translate-x-1/2 w-[25px]'}`} />,
            expandText: 'Devocional',
            href: '/devocional'
        },
        {
            icon: <LineChart width={20} stroke="#fff" color={iconColor} strokeWidth={2} className={`${(!isNavbarFull && pathName === '/dashboard-geral') && 'hidden'} absolute z-10 ${isNavbarFull ? 'duration-150 -translate-x-[35px] w-[22px]' : 'group-hover:hidden left-1/2 -translate-x-1/2 w-[25px]'}`} />,
            iconHover: <LineChart width={20} stroke={iconColor} color={iconColor} strokeWidth={2} className={`${pathName === '/dashboard-geral' ? 'block' : 'hidden'} group-hover:block absolute ${isNavbarFull ? 'duration-150 -translate-x-[25px] w-[22px]' : 'left-1/2 -translate-x-1/2 w-[25px]'}`} />,
            expandText: 'Dashboard geral',
            href: '/dashboard-geral'
        },
        {
            icon: <HelpingHand width={20} stroke="#fff" color={iconColor} strokeWidth={2} className={`${(!isNavbarFull && pathName === '/oracao') && 'hidden'} absolute z-10 ${isNavbarFull ? 'duration-150 -translate-x-[35px] w-[22px]' : 'group-hover:hidden left-1/2 -translate-x-1/2 w-[25px]'}`} />,
            iconHover: <HelpingHand width={20} stroke={iconColor} color={iconColor} strokeWidth={2} className={`${pathName === '/oracao' ? 'block' : 'hidden'} group-hover:block absolute ${isNavbarFull ? 'duration-150 -translate-x-[25px] w-[22px]' : 'left-1/2 -translate-x-1/2 w-[25px]'}`} />,
            expandText: 'Orações',
            href: '/oracao'
        },
        {
            icon: <Brain width={20} stroke="#fff" color={iconColor} strokeWidth={2} className={`${(!isNavbarFull && pathName === '/memorizacao') && 'hidden'} absolute z-10 ${isNavbarFull ? 'duration-150 -translate-x-[35px] w-[22px]' : 'group-hover:hidden left-1/2 -translate-x-1/2 w-[25px]'}`} />,
            iconHover: <Brain width={20} stroke={iconColor} color={iconColor} strokeWidth={2} className={`${pathName === '/memorizacao' ? 'block' : 'hidden'} group-hover:block absolute ${isNavbarFull ? 'duration-150 -translate-x-[25px] w-[22px]' : 'left-1/2 -translate-x-1/2 w-[25px]'}`} />,
            expandText: 'Memorização',
            href: '/memorizacao'
        },
        {
            icon: <Gamepad2 width={20} stroke="#fff" color={iconColor} strokeWidth={2} className={`${(!isNavbarFull && pathName === '/pontuacao') && 'hidden'} absolute z-10 ${isNavbarFull ? 'duration-150 -translate-x-[35px] w-[22px]' : 'group-hover:hidden left-1/2 -translate-x-1/2 w-[25px]'}`} />,
            iconHover: <Gamepad2 width={20} stroke={iconColor} color={iconColor} strokeWidth={2} className={`${pathName === '/pontuacao' ? 'block' : 'hidden'} group-hover:block absolute ${isNavbarFull ? 'duration-150 -translate-x-[25px] w-[22px]' : 'left-1/2 -translate-x-1/2 w-[25px]'}`} />,
            expandText: 'Pontuações',
            href: '/pontuacao'
        },
    ] as const

    return (
        <aside className={`hidden lg:flex justify-center h-[89vh] relative gap-3 transition-all ${isNavbarFull ? 'w-[200px]' : 'w-[80px]'} rounded-2xl ${themeValue === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'} `}>
            <nav className="w-full flex flex-col items-center">
                <button onClick={() => setIsNavbarFull(!isNavbarFull)} className="shadow-lg w-6 aspect-square flex items-center justify-center rounded-lg bg-white absolute -right-1 -top-[3px]">
                    <ChevronRight className={`duration-200 ${isNavbarFull && ' rotate-180'}`} />
                </button>
                <div className="w-full px-4 mt-8 mb-4">
                    <p className="text-white text-sm uppercase border-b text-center w-full px-1 py-1">Menu</p>
                </div>
                <section className="w-full flex flex-col items-center justify-between h-full">
                    <ul className="flex flex-col h-fit w-full p-1 gap-5">
                        {icons.map((icon, i) => {
                            return (
                                <li key={i} className="group">
                                    <Link className={`rounded border-2 border-transparent transition-all relative flex group items-center pl-[45px] px-1`} href={icon.href}>
                                        <div className={`${isNavbarFull && 'hidden'} ${pathName == icon.href && 'bg-white shadow-md'} group-hover:bg-white group-hover:shadow-md absolute w-[93%] aspect-video rounded-l-xl px-[.5em] py-[1.2em] -right-2`} />
                                        {icon.iconHover}
                                        {icon.icon}
                                        <p className={`${isNavbarFull ? 'opacity-100 duration-500 ' : 'opacity-0 invisible'} group-hover:border-gray-100 transition-none border-b border-transparent text-sm font-normal text-white whitespace-nowrap`}>
                                            {icon.expandText}
                                        </p>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                    <ul className="flex flex-col gap-4 h-full w-full justify-end pb-6">
                        <li className="group">
                            <Link className={`rounded border-2 border-transparent transition-all relative flex group items-center pl-[45px] px-1`} href={'/configuracao'}>
                                <div className={`${isNavbarFull && 'hidden'} ${pathName == '/configuracao' && 'bg-white shadow-md'} group-hover:bg-white group-hover:shadow-md absolute w-[93%] aspect-video rounded-l-xl px-[.5em] py-[1.2em] -right-2`} />
                                <Settings width={20} stroke="#fff" color={iconColor} strokeWidth={2} className={`${(!isNavbarFull && pathName === '/configuracao') && 'hidden'} absolute z-10 ${isNavbarFull ? 'duration-150 -translate-x-[30px] w-[22px]' : 'group-hover:hidden left-1/2 -translate-x-1/2 w-[25px]'}`} />
                                <Settings width={20} stroke={iconColor} color={iconColor} strokeWidth={2} className={`${pathName === '/configuracao' ? 'block' : 'hidden'}  group-hover:block absolute ${isNavbarFull ? 'duration-150 -translate-x-[30px] w-[22px]' : 'left-1/2 -translate-x-1/2 w-[25px]'}`} />
                                <p className={`${isNavbarFull ? 'opacity-100 duration-500' : 'opacity-0 invisible'} group-hover:border-gray-100 transition-none border-b border-transparent text-sm font-normal text-white whitespace-nowrap`}>Configurações</p>
                            </Link>
                        </li>
                        <li className="group">
                            <Link className={`rounded border-2 border-transparent transition-all relative flex group items-center pl-[45px] px-1`} href={'/login'}>
                                <div className={`${isNavbarFull && 'hidden'} group-hover:bg-white group-hover:shadow-md absolute w-[93%] aspect-video rounded-l-xl px-[.5em] py-[1.2em] -right-2`} />
                                <LogOut width={20} stroke="#fff" color={iconColor} strokeWidth={2} className={`${!isNavbarFull && 'group-hover:hidden'} absolute ${isNavbarFull ? 'duration-150 -translate-x-[28px] w-[22px]' : 'left-[53%] -translate-x-1/2 w-[25px]'}`} />
                                <LogOut width={20} stroke={iconColor} color={iconColor} strokeWidth={2} className={`${isNavbarFull && 'invisible'} hidden group-hover:block absolute ${isNavbarFull ? 'duration-150 -translate-x-[28px] w-[22px]' : 'left-[53%] -translate-x-1/2 w-[25px]'}`} />
                                <p className={`${isNavbarFull ? 'opacity-100 duration-500' : 'opacity-0 invisible'} group-hover:border-gray-100 transition-none border-b border-transparent text-sm font-normal text-white whitespace-nowrap`}>Sair</p>
                            </Link>
                        </li>
                    </ul>
                </section>
            </nav>
        </aside >
    )
}
