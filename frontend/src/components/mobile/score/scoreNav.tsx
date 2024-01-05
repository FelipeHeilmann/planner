"use client"
import Link from "next/link";
import { EScorePath } from "../../../../types/enums-url-path";
import { usePathname } from "next/navigation"
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContex";
import { EThemeColor } from "../../../../types/enums-color-theme";

export default function ScoreNav() {

    const { themeValue } = useContext(ThemeContext)

    const pathName = usePathname()

    return (
        <>
            <nav className="w-screen min-w-iphoneSEWidth px-4 bg-white overflow-x-hidden">
                <div className="flex justify-center gap-8 border-b-[0.5px] w-fit self-center m-auto">
                    <Link
                        href={EScorePath.Default}
                        className={`${pathName == EScorePath.Default || pathName == EScorePath.Default
                            ? themeValue === EThemeColor.Blue
                                ? 'text-mainBlue border-mainBlue'
                                : 'text-mainPink border-mainPink'
                            : 'text-weirdBlack border-transparent'} 
                            text-md uppercase tracking-[3px] border-b py-2`}
                    >
                        Pontuação
                    </Link>
                    <Link
                        href={EScorePath.NextLevel}
                        className={`${pathName == EScorePath.NextLevel
                            ? themeValue === EThemeColor.Blue
                                ? 'text-mainBlue border-mainBlue'
                                : 'text-mainPink border-mainPink'
                            : 'text-weirdBlack border-transparent'} text-md uppercase tracking-[3px] font-normal border-b py-2 `}
                    >
                        Níveis
                    </Link>
                </div>
            </nav>
        </>
    )
}
