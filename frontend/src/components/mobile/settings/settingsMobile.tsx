import FetchUserInfo from "@/api/fetchUserInfo"
import Image from "next/image"
import SettingsMobileContent from "./settingsMobileContent"
import { User } from "lucide-react"

export default async function SettingsMobile() {

    const { imageUrl: img, name, email, gender, birthDate } = await FetchUserInfo()

    return img && (
        <>
            <main className="bg-white block w-full lg:hidden">
                <header className="w-full p-2 flex justify-center">
                    <div className="flex gap-3 items-center">
                        {img === '/NoImage' ?
                            <User className="w-[30px] aspect-square object-cover rounded-full" />
                            : <Image src={img && img} alt="Imagem do usuário" width={30} height={30} className="w-[30px] aspect-square object-cover rounded-full" />
                        }
                        <h3>Configurações</h3>
                    </div>
                </header>
                <SettingsMobileContent img={img && img} name={name} birthDate={birthDate} email={email!} gender={gender!} />
            </main>
        </>
    )
}
