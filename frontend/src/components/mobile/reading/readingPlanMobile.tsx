import { Plus, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import FetchUserInfo from '@/api/fetchUserInfo'
import ReadingPlanMobileCard from './readingPlanMobileCard'
import { EThemeColor } from '../../../../types/enums-color-theme'
import ReadingPlanMobileCardClientDummy from './readingPlanMobileCardClientDummy'
import { FetchReadingPlans } from '@/api/fetchReadings'

export default async function ReadingPlanMobile() {

    const { imageUrl: img, theme } = await FetchUserInfo()

    const plansData = await FetchReadingPlans()

    return (
        <>
            <main className="bg-white block w-full lg:hidden overflow-hidden h-[calc(100vh-59px)]">
                <ReadingPlanMobileCardClientDummy />
                <header className="w-full flex p-2 items-center justify-between">
                    <div className='flex gap-2 items-center'>
                        {img === '/NoImage' ?
                            <User className="w-[30px] h-[30px] object-cover rounded-full" />
                            : <Image src={img && img} alt='Imagem do usuário' width={30} height={30} className="w-[30px] aspect-square object-cover rounded-full" />
                        }
                        <h1 className='font-medium text-[#575353]'>Planos de leitura</h1>
                    </div>
                </header>
                <section className={`w-full h-[calc(100vh-105px)] overflow-hidden ${theme === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'}`}>
                    <div className="w-full flex items-center justify-between p-4">
                        <h2 className="text-white font-semibold text-xl">Seus Planos</h2>
                        <Link
                            href={'/plano-leitura/criar'}
                            className="flex items-center gap-1 shadow-lg bg-white text-black p-2 rounded-3xl text-sm"
                        >
                            <Plus />
                            Criar plano
                        </Link>
                    </div>
                    <div className="w-full p-4 rounded-t-[50px] bg-white">
                        <section className="gap-2 flex flex-col h-[calc(100vh-205px)] mt-[20px] pb-[30px] overflow-y-scroll">
                            {plansData && plansData.map((plan: any) =>
                                <ReadingPlanMobileCard theme={theme} id={plan.id} book={plan.book} date={plan.endDate} status={plan.status} name={plan.name} key={plan.id} />
                            )}
                        </section>
                    </div>
                </section>
            </main>
        </>
    )
}
