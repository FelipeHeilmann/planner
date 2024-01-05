import { User } from 'lucide-react'
import Image from 'next/image'
import DashboardGeneralNav from './dashboardGeneralNav'
import FetchUserInfo from '@/api/fetchUserInfo'

export default async function DashboardGeneralHeader({ img }: { img: string }) {

    const { theme } = await FetchUserInfo()

    return theme && (
        <>
            <header className="w-full">
                <section className="w-full p-2 border-b-white flex justify-between bg-white">
                    <div className="flex gap-3 items-center">
                        {/* User icon */}
                        {img === '/NoImage' ?
                            <User className="w-[30px] aspect-square object-cover rounded-full" />
                            : <Image src={img} alt='Imagem do usuário' width={30} height={30} className="w-[30px] aspect-square object-cover rounded-full" />
                        }
                        <h3>Dashboard geral</h3>
                    </div>
                </section>
                {/* Client ^^ */}
                <DashboardGeneralNav theme={theme} />
            </header>
        </>
    )
}
