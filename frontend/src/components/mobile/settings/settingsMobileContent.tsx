"use client"
import SettingsImageFormMobile from "./settingsImageFormMobile";
import SettingsNameFormMobile from "./settingsNameFormMobile";
import SettingsInfoFormMobile from "./settingsInfoFormMobile";
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContex";
import { EThemeColor } from "../../../../types/enums-color-theme";

export default function SettingsMobileContent({ img, name, email, gender, birthDate }: { img: string, name: string, email: string, gender: string | null, birthDate: string | null }) {

    const { themeValue } = useContext(ThemeContext)

    return (
        <>
            <section className="w-full bg-white h-[calc(100vh-100px)] flex flex-col">
                <section className={`w-full flex flex-col gap-3 justify-center p-3  ${themeValue === EThemeColor.Blue ? 'bg-dashboardCard' : 'bg-dashboardCardPink'}`}>
                    <SettingsImageFormMobile img={img} />

                    <SettingsNameFormMobile userName={name} />
                </section>

                <section className="w-full h-full p-2">
                    <SettingsInfoFormMobile birthDate={birthDate} email={email} gender={gender} />
                </section>
            </section>
        </>
    )
}
