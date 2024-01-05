import FetchUserInfo from "@/api/fetchUserInfo";
import ScoreNav from "./scoreNav";
import Image from "next/image";
import { User } from "lucide-react";

export default async function ScoreNavbar() {

    const { imageUrl: img } = await FetchUserInfo()

    return (
        <>
            <header className="fixed block lg:hidden top-0 z-40">
                <section className="w-full border-b-white flex justify-between bg-white">
                    <div className="flex p-2 gap-3 items-center">
                        {img === '/NoImage'
                            ? <User className="w-[30px] h-[30px] object-cover rounded-full" />
                            : <Image src={img && img} alt="Imagem do usuário" width={30} height={30} className="w-[30px] h-[30px] object-cover rounded-full" />
                        }
                        <h3 className="text-weirdBlack font-medium">Pontuações</h3>
                    </div>
                </section>
                <ScoreNav />
            </header>
        </>
    )
}
