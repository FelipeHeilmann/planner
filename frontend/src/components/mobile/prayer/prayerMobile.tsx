import FetchUserInfo from "@/api/fetchUserInfo";
import PrayerMobileClient from "./prayerMobileClient";
import Image from "next/image";
import { User } from "lucide-react";

export default async function PrayerMobile() {

    const { imageUrl: img } = await FetchUserInfo()

    return (
        <>
            <main className="block lg:hidden">
                <header className="w-full p-2 flex justify-between">
                    <div className="flex gap-3 items-center">
                        {img === '/NoImage' ?
                            <User className="w-[30px] aspect-square object-cover rounded-full" />
                            : <Image src={img && img} alt='Imagem do usuário' width={30} height={30} className="w-[30px] aspect-square object-cover rounded-full" />
                        }
                        <h3>Orações</h3>
                    </div>
                </header>
                <PrayerMobileClient />
            </main>
        </>
    )
}
