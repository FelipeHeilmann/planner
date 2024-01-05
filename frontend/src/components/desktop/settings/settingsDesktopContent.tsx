"use client"
import { ThemeContext } from "@/context/themeContex";
import { useContext } from "react";
import { EThemeColor } from "../../../../types/enums-color-theme";
import SettingsFormName from "./settingsFormName";
import SettingsImageForm from "./settingsImageForm";
import SettingsInfoForm from "./settingsInfoForm";

export default function SettingsDektopContent({ img, name, email, gender, birthDate }: { img: string, name: string, email: string, gender: string | null, birthDate: string | null }) {
    const { themeValue } = useContext(ThemeContext)

    return (
        <main className="mx-2 overflow-hidden h-[89vh] flex-1 hidden lg:flex flex-col bg-white rounded-lg">
            <section className={`w-full flex flex-col p-2 gap-2 ${themeValue === EThemeColor.Blue ? 'bg-dashboardCard' : 'bg-dashboardCardPink'} rounded-lg`}>
                <SettingsImageForm img={img} />
                <SettingsFormName userName={name} />
            </section>

            <section className="w-full flex flex-col items-center p-2">
                <SettingsInfoForm birthDate={birthDate} email={email} gender={gender} />
            </section>
        </main >
    )
}
