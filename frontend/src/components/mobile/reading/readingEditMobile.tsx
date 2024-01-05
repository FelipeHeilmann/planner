import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ReadingEditFormMobile from "./readingEditFormMobile";
import { FetchReading } from "@/api/fetchReadings";
import FetchUserInfo from "@/api/fetchUserInfo";
import { EThemeColor } from "../../../../types/enums-color-theme";

export default async function EditReadingMobile({ leituraId }: { leituraId: string }) {

    const reading = await FetchReading(leituraId)

    const { theme } = await FetchUserInfo()

    return reading && (
        <main className="block w-full lg:hidden">
            <header className="w-full p-2 flex justify-between">
                <div className="flex gap-3 items-center">
                    <Link href={'/leitura'}>
                        <ArrowLeft />
                    </Link>
                    <h3>Editar leitura</h3>
                </div>
            </header>
            <section className={`w-full mb-[40px] p-2 flex flex-col min-h-screen ${theme === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'}`}>
                <ReadingEditFormMobile reading={reading} />
            </section>
        </main>
    )
}
