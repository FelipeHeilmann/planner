import { Plus, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import FetchUserInfo from "@/api/fetchUserInfo"
import FetchDevotionals from "@/api/fetchDevotional"
import { EThemeColor } from "../../../../types/enums-color-theme"
import dynamic from "next/dynamic"

export default async function DevotionalMobile() {

    const { imageUrl: img, theme } = await FetchUserInfo()

    const devotionals = await FetchDevotionals()

    const DynamicDevotionalMobileContent = dynamic(() => import('./devotionalMobileFilters'), { ssr: false })

    return (
        <>
            <main className="block w-full lg:hidden overflow-hidden">
                <header className="w-full p-2 flex justify-between">
                    {/* User Icon */}
                    <div className="flex gap-3 items-center">
                        {img === '/NoImage' ?
                            <User className="w-[30px] h-[30px] object-cover rounded-full" />
                            : <Image src={img} alt="Imagem do usuário" width={30} height={30} className="w-[30px] aspect-square object-cover bg-slate-600 rounded-full" />
                        }
                        <h3>Meus Aprendizados</h3>
                    </div>
                </header>
                <section className={`min-w-iphoneSEWidth w-full ${theme === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'}`}>
                    <div className="w-full flex p-2 px-3 items-center justify-between">
                        <h3 className="max-w-[150px] pl-2 h-fit text-white text-lg font-semibold">Escreva aqui seus devocionais</h3>
                        <Link
                            href={'/devocional/criar'}
                            className={`flex gap-2 h-[40px] items-center p-2 text-sm text-black shadow-lg bg-white rounded-3xl`}
                        >
                            <Plus />
                            Novo devocional
                        </Link>
                    </div>
                    <div className="w-full p-2 bg-white h-[calc(100vh-206px)] rounded-t-[50px]">
                        {devotionals && <DynamicDevotionalMobileContent devotionalsArrayProp={devotionals} />}
                    </div>
                </section>
            </main>
        </>
    )
}
