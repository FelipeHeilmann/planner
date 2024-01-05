import Image from "next/image"
import logo from '../../../../public/assets/logo-planner.png'
import { Pencil, Brain, Settings, Palette, LogOut, User, Gamepad2, HelpingHand } from 'lucide-react'
import MobileIcon from "./menuMobileIcon"
import MenuMobileToggleTheme from "./menuMobileToggleTheme"
import FetchUserInfo from "@/api/fetchUserInfo"
import MenuMobileToggleColor from "./menuMobileToggleColor"

const icons = [
    { icon: <HelpingHand />, text: 'Orações', path: 'oracao' },
    { icon: <Pencil />, text: 'Devocionais', path: 'devocional' },
    { icon: <Brain />, text: 'Memorização', path: 'memorizacao' },
    { icon: <Gamepad2 />, text: 'Pontuação', path: 'pontuacao' },
    { icon: <Settings />, text: 'Configurações', path: 'configuracao' },
    { icon: <LogOut />, text: 'Sair', path: 'login' }
]

export default async function MobileMenu() {

    const { name, imageUrl: img, theme } = await FetchUserInfo()

    return (
        <>
            <section className={`overflow-x-hidden block lg:hidden bg-white w-screen h-screen min-w-iphoneSEWidth`}>
                <div className="flex p-2 justify-center items-center bg-white">
                    <div className="flex w-5/6 gap-2 justify-center items-center">
                        <Image src={logo && logo} alt="Logo do Planner Bíblico" width={25} height={20} />
                        <h1>PLANNER BÍBLICO</h1>
                    </div>
                </div>

                <div className="relative isolate w-full gap-2 p-4 flex flex-col justify-center items-center">
                    {/* Toggle color compo */}
                    <MenuMobileToggleColor whichElement="bg" />

                    <div className="relative isolate w-[84px] aspect-square p-[2px] bg-gradient-to-t to-pink-500 from-blue-100 rounded-full">
                        {img && img !== '/NoImage' ?
                            <Image src={img} alt="Imagem do usuário" width={40} height={40} className="w-full aspect-square object-cover rounded-full border-[3px] border-transparent" />
                            : <User className={`w-full h-full rounded-full`} />
                        }
                        {/* Toggle color compo */}
                        <MenuMobileToggleColor whichElement="border" />
                    </div>

                    <h2 className="text-white font-bold">{name && name}</h2>
                </div>
                {icons.map((item, index) => (
                    <MobileIcon key={index} icon={item.icon} path={item.path} text={item.text} />
                ))}
                <div className="w-full bg-white p-4 flex items-center gap-2 justify-center">
                    <div className="w-5/6 flex items-center gap-3">
                        <Palette />
                        <p>Cor do planner</p>
                    </div>
                    <div className="w-[24px] bg-white" />
                </div>
                <div className="w-full flex bg-white justify-center py-1 px-2 items-center">
                    {theme && <MenuMobileToggleTheme themeProp={theme} />}
                </div>
            </section>
        </>
    )
}
