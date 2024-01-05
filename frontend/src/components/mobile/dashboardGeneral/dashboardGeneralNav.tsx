"use client"
import Link from "next/link";
import { EDashboardGeneralPath } from "../../../../types/enums-url-path";
import { usePathname } from "next/navigation";
import { EThemeColor } from "../../../../types/enums-color-theme";
import { useEffect, useState } from "react";

export default function DashboardGeneralNav({ theme: themeFromServer }: { theme: EThemeColor }) {
    const [theme, setTheme] = useState<string>('mainBlue')
    const pathName = usePathname()
    const validateTheme = () => {
        if (themeFromServer === EThemeColor.Blue) {
            setTheme('mainBlue')
        }
        else {
            setTheme('mainPink')
        }
    }
    useEffect(() => {
        validateTheme()
    })
    return (
        <>
            <nav className="w-full bg-white overflow-x-hidden">
                <div className="flex justify-center gap-8 border-b-[0.5px] w-fit self-center m-auto">
                    <Link
                        href={EDashboardGeneralPath.Default}
                        className={`${pathName == EDashboardGeneralPath.Default || pathName == EDashboardGeneralPath.Default ? `text-${theme} border-${theme}` : 'text-weirdBlack border-transparent'} text-md uppercase tracking-[3px] border-b py-2`}
                    >
                        Página 1
                    </Link>
                    <Link
                        href={EDashboardGeneralPath.Detail}
                        className={`${pathName == EDashboardGeneralPath.Detail ? `text-${theme} border-${theme}` : 'text-weirdBlack border-transparent'} text-md uppercase tracking-[3px] font-normal border-b py-2 `}
                    >
                        Página 2
                    </Link>
                </div>
            </nav>
        </>
    )
}
