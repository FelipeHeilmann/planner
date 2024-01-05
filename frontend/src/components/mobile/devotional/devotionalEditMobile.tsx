import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import EditClientDevotionalMobileForm from "./editClientDevotionalMobileForm";
import { books } from "@/utils/books";
import { FetchDevotional } from "@/api/fetchDevotional";
import FetchUserInfo from "@/api/fetchUserInfo";
import { EThemeColor } from "../../../../types/enums-color-theme";

export default async function DevotionalEditMobile({ devocionalId }: { devocionalId: string }) {

    const devotional = await FetchDevotional(devocionalId)

    const { theme } = await FetchUserInfo()

    return devotional && (
        <main className="block w-full lg:hidden">
            <header className="w-full p-2 flex justify-between">
                <div className="flex gap-3 items-center">
                    <Link href={'/devocional'}>
                        <ArrowLeft />
                    </Link>
                    <h3>Editar Devocional</h3>
                </div>
            </header>
            <section className={`w-full -mb-2 p-2 py-4 pb-20 flex flex-col min-h-screen ${theme === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'}`}>
                <div className="w-full flex pt-4 flex-col gap-1 min-h-full p-3 bg-white rounded-[50px]">
                    {devotional && <EditClientDevotionalMobileForm devotional={devotional} books={books} />}
                </div>
            </section>
        </main>
    )
}
