"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { EThemeColor } from "../../../../types/enums-color-theme"
import { useEffect, useState } from "react"

export default function DashboardNavToggleNavSection({ readingsPlanId, theme: themeFromServer }: { readingsPlanId: string, theme: EThemeColor }) {
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
            {readingsPlanId &&
                <div className="flex justify-center gap-8 border-b-[0.5px] w-fit self-center m-auto">
                    <Link
                        href={`/dashboard-plano/${readingsPlanId}/desempenho`}
                        className={`${pathName.includes('/desempenho') ? `text-${theme} border-${theme}` : 'text-weirdBlack border-weirdWhite'} text-lg uppercase tracking-wider border-b py-3 font-light`}
                    >
                        desempenho
                    </Link>
                    <Link
                        href={`/dashboard-plano/${readingsPlanId}/metas`}
                        className={`${pathName.includes('/metas') ? `text-${theme} border-${theme}` : 'text-weirdBlack border-transparent'} text-lg uppercase tracking-wider border-b py-3 font-light`}
                    >
                        metas
                    </Link>
                    <Link
                        href={`/dashboard-plano/${readingsPlanId}/status`}
                        className={`${pathName.includes('/status') ? `text-${theme} border-${theme}` : 'text-weirdBlack border-transparent'} text-lg uppercase tracking-wider border-b py-3 font-light`}
                    >
                        status
                    </Link>
                </div>
            }
        </>
    )
}
