import FetchUserInfo from "@/api/fetchUserInfo"
import axios from "axios"
import { ChevronLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cookies } from "next/headers"
import { EThemeColor } from "../../../../types/enums-color-theme"
import { FetchDevotional } from "@/api/fetchDevotional"

// type devotionalProps = {
//     id: string,
//     verses: number[]
//     book: {
//         id: number
//         name: string,
//         chapter: number
//         verses: number
//         words: number
//         testamentId: number
//     },
//     subject: string
//     learned: string
//     application: string
//     date: string
// }


export default async function DevotionalDetailMobile({ devocionalId }: { devocionalId: string }) {

    const { imageUrl: img, theme } = await FetchUserInfo()

    const devotional = await FetchDevotional(devocionalId)

    return devotional && theme && (
        <>
            <main className="block w-full lg:hidden">
                <header className="w-full p-2 flex justify-between">
                    <div className="flex gap-3 items-center">
                        <Image src={img && img} width={30} height={30} alt="Imagem do usuário" className="w-[30px] aspect-square object-cover rounded-full" />
                        <h1>Detalhes do devocional</h1>
                    </div>
                </header>

                <section className={`w-full min-h-screen ${theme == EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'} `}>
                    <div className="w-full flex items-center p-2 gap-2">
                        <Link href={'/devocional'} className="w-[35px] h-[35px] flex items-center justify-center bg-white bg-opacity-40 rounded-full">
                            <ChevronLeft stroke="white" />
                        </Link>
                        <h2 className="text-lg text-white">{devotional?.book.name} {devotional?.book.chapter}:{devotional?.verses[0]}-{devotional?.verses[devotional?.verses.length - 1]}</h2>
                    </div>

                    <div className="w-full flex flex-col p-2 min-h-screen rounded-t-[50px] bg-white">
                        <div className="p-4 flex flex-col gap-2">
                            <div className="w-full flex items-center gap-1 ">
                                <span className={`block w-[50px] text-center text-3xl text-white font-bold ${theme == EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'} p-2 rounded-xl`}>T</span>
                                <p className="text-base font-semibold">ema abordado</p>
                            </div>
                            <p className="font-light">{devotional?.subject}</p>
                        </div>

                        <div className="p-4 flex flex-col gap-2">
                            <div className="w-full flex items-center gap-1 ">
                                <span className={`block w-[50px] text-center text-3xl text-white font-bold ${theme == EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'} p-2 rounded-xl`}>O</span>
                                <p className="text-base font-semibold">que eu aprendi com essa pasagem?</p>
                            </div>
                            <p className="font-light max-w-full">{devotional?.learned}</p>
                        </div>

                        <div className="p-4 flex flex-col gap-2">
                            <div className="w-full flex items-center gap-1 ">
                                <span className={`block w-[50px] text-center text-3xl text-white font-bold ${theme == EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'} p-2 rounded-xl`}>C</span>
                                <p className="text-base font-semibold">omo aplicar em minha vida?</p>
                            </div>
                            <p className="font-light">{devotional?.application}</p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
