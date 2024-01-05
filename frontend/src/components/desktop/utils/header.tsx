import Image from "next/image";
import logo from '@/../public/assets/logo-planner.png'
import HeaderToggleTheme from "./headerToggleTheme";
import FetchUserInfo from "@/api/fetchUserInfo";
import { User } from "lucide-react";

export default async function Header() {

    const { imageUrl, theme, name } = await FetchUserInfo()

    return imageUrl !== '' && (
        <>
            <header className="hidden w-full lg:flex bg-weirdWhite items-center justify-between p-2" >
                <div className="flex p-2  items-center gap-2">
                    <Image width={40} src={logo} alt="logo" />
                    <h2 className="text-weirdBlack text-xl">Planner Bíblico</h2>
                </div>
                <div className="flex px-2 items-center gap-3">
                    {/* Toggle theme */}
                    <div className="relative w-14 h-7 bg-white rounded-3xl hover:cursor-pointer isolate ">
                        {theme && <HeaderToggleTheme themeProp={theme} />}
                    </div>
                    <div className="w-[1px] h-[5vh] bg-weirdBlack/40" />
                    <div className="flex items-center gap-3">
                        <div className="w-20 flex p-2 h-9 gap-2 bg-white items-center relative rounded-xl">
                            <Image src={logo} alt="logo" width={25} height={25} />
                            {imageUrl !== '/NoImage' ?
                                <>
                                    <div className="absolute z-10 aspect-square rounded-full w-[40px] bg-zinc-200 h-full -right-1" />
                                    <Image src={imageUrl} alt="Imagem do usuário" width={40} height={20} className="z-40 shadow-xl object-cover h-auto aspect-square rounded-full absolute -right-1" />
                                </>
                                : <User className="bg-white shadow-xl w-10 h-10 rounded-full absolute -right-1" />}
                        </div>
                        <div>
                            <h2 className="pb-1 text-sm font-normal text-weirdBlack">{name}</h2>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}
