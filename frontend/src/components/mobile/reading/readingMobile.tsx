import { Plus, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ReadingMobileClient from "./readingMobileClient";
import FetchUserInfo from "@/api/fetchUserInfo";
import { EThemeColor } from "../../../../types/enums-color-theme";

export default async function ReadingMobile() {

    const { imageUrl: img, theme } = await FetchUserInfo()

    return (
        <>
            <div className="bg-white flex-1 lg:hidden overflow-y-hidden h-[calc(100vh-59px)]">
                <section className="block lg:hidden">
                    <header className="w-full p-2 flex justify-between">
                        <div className="flex gap-3 items-center">
                            {/* User icon*/}
                            {img === '/NoImage' ?
                                <User className="w-[30px] h-[30px] object-cover rounded-full" />
                                : <Image src={img && img} alt="Imagem do usuário" width={30} height={30} className="w-[30px] aspect-square object-cover bg-slate-600 rounded-full" />}
                            <h3>Minhas leituras</h3>
                        </div>
                    </header>
                    <section className={`w-full h-[calc(100vh-105px)] overflow-hidden ${theme === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'}`}>
                        <div className="w-full flex items-center justify-between p-4">
                            <h2 className="text-white font-semibold text-xl">Suas Leituras</h2>
                            <Link
                                href={'/leitura/criar'}
                                prefetch={false}
                                className="flex items-center gap-1 shadow-lg bg-white text-black p-2 rounded-3xl text-sm"
                            >
                                <Plus width={18} />
                                Nova leitura
                            </Link>
                        </div>
                        <div className="w-full h-full flex pt-4 flex-col gap-1 p-2 bg-white rounded-t-[50px]">
                            <ReadingMobileClient />
                        </div>
                    </section>
                </section>
            </div>
        </>
    )
}
