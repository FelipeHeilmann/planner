'use client'
import { useContext } from 'react'
import { Home, Book, LineChart, Menu, Compass } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { EDashboardPlanPath } from '../../../../types/enums-url-path'
import Link from 'next/link'
import { ThemeContext } from '@/context/themeContex'
import { EThemeColor } from '../../../../types/enums-color-theme'

enum EIconId {
    Home = '/bemvindo',
    Reading = '/leitura',
    DashboardPlanIcon = '/plano-leitura',
    DashboardIcon = '/dashboard-geral',
    Hamburger = '/mobile-menu',
}

const routes = ['/login', '/registrar', '/mudar-senha',]

export default function NavbarMobile() {

    const { themeValue } = useContext(ThemeContext)

    const activeColor = themeValue === EThemeColor.Blue ? '#6266F5' : '#f25178' as any
    enum EStatusColor {
        Active = activeColor,
        Inactive = '#C2C2C2',
    }

    // const [iconsColor, setIconsColor] = useState({
    //     [EIconId.Home]: EStatusColor.Inactive, // Must not have a different init state because it re-renders thus 2 changes are seen 
    //     [EIconId.Reading]: EStatusColor.Inactive,
    //     [EIconId.DashboardPlanIcon]: EStatusColor.Inactive,
    //     [EIconId.DashboardIcon]: EStatusColor.Inactive,
    //     [EIconId.Hamburger]: EStatusColor.Inactive,
    // })

    // const [isMenuOpen, setIsMenuOpen] = useState(false)

    const pathName = usePathname()

    if (routes.includes(pathName) || pathName.startsWith("/admin")) return

    // const colorNavIcons = (whichIcon: string) => {
    //     setIconsColor((prevColors) => {
    //         const iconsColors: any = { ...prevColors }
    //         Object.keys(iconsColors).map((item) => {
    //             iconsColors[item] = EStatusColor.Inactive
    //         })
    //         if (pathName == '/dashboard-plano/desempenho'
    //             || pathName == '/dashboard-plano/metas'
    //             || pathName == '/dashboard-plano/status'
    //         ) {
    //             iconsColors[EIconId.DashboardPlanIcon] = EStatusColor.Active
    //         } else {
    //             iconsColors[whichIcon] = EStatusColor.Active
    //         }
    //         return iconsColors
    //     })
    // }

    // const handleClick = (id: EIconId) => {
    //     if (id !== EIconId.Hamburger) return setIsMenuOpen(false)
    //     if (isMenuOpen) {
    //         setIsMenuOpen(false)
    //     } else {
    //         setIsMenuOpen(true)
    //     }
    // }

    // const icons = [
    //     { icon: <Home strokeWidth={1.5} color={`${pathName == EIconId.Home ? EStatusColor.Active : EStatusColor.Inactive}`} id={EIconId.Home} /> },
    //     { icon: <Book strokeWidth={1.5} color={`${pathName == EIconId.Reading && !isMenuOpen ? EStatusColor.Active : EStatusColor.Inactive}`} id={EIconId.Reading} /> },
    //     { icon: <PieChart strokeWidth={1.5} color={`${!isMenuOpen && (pathName == EIconId.DashboardPlanIcon || pathName == EDashboardPlanPath.Performance || pathName == EDashboardPlanPath.Goals || pathName == EDashboardPlanPath.Status) ? EStatusColor.Active : EStatusColor.Inactive}`} id={EIconId.DashboardPlanIcon} /> },
    //     { icon: <LineChart strokeWidth={1.5} color={`${pathName == EIconId.DashboardIcon && !isMenuOpen ? EStatusColor.Active : EStatusColor.Inactive}`} id={EIconId.DashboardIcon} /> },
    //     { icon: <Menu strokeWidth={1.5} color={`${isMenuOpen ? EStatusColor.Active : EStatusColor.Inactive}`} id={EIconId.Hamburger} /> },
    // ]

    const icons = [
        { icon: <Home strokeWidth={1.5} color={`${pathName == EIconId.Home ? EStatusColor.Active : EStatusColor.Inactive}`} id={EIconId.Home} /> },
        { icon: <Book strokeWidth={1.5} color={`${pathName.includes('/leitura') ? EStatusColor.Active : EStatusColor.Inactive}`} id={EIconId.Reading} /> },
        { icon: <Compass strokeWidth={1.5} color={`${(pathName.startsWith('/plano-leitura') || pathName.includes('dashboard-plano') || pathName == EDashboardPlanPath.Performance || pathName == EDashboardPlanPath.Goals || pathName == EDashboardPlanPath.Status) ? EStatusColor.Active : EStatusColor.Inactive}`} id={EIconId.DashboardPlanIcon} /> },
        { icon: <LineChart strokeWidth={1.5} color={`${pathName.includes('/dashboard-geral') ? EStatusColor.Active : EStatusColor.Inactive}`} id={EIconId.DashboardIcon} /> },
        { icon: <Menu strokeWidth={1.5} color={`${pathName == EIconId.Hamburger || pathName.includes('pontuacao') || pathName.includes('/configuracao') || pathName.includes('/memorizacao') || pathName.includes('/oracao') || pathName.includes('/devocional') ? EStatusColor.Active : EStatusColor.Inactive}`} id={EIconId.Hamburger} /> },
    ]

    // <MobileMenu isOpen={isMenuOpen} />
    return (
        <>
            <div className='block lg:hidden'>
                {/* Margin for nav bar in other compos */}
                <div className='mt-[65px]' />
                <div className="fixed z-50 -bottom-[1px] flex w-[100vw] min-w-iphoneSEWidth justify-center items-center gap-7 h-[60px] p-3 bg-white" >
                    {icons.map((item, idx) => (
                        <Link href={item.icon.props.id} key={idx} className='relative flex flex-col justify-center items-center'>
                            {item.icon}
                        </Link>
                    ))}
                </div >
            </div>

        </>
    )
}
