import Image from 'next/image'
import { User } from 'lucide-react'
import logo from '../../../../public/assets/logo-planner.png'
import homeImg from '../../../../public/assets/home-couple.png'
import { EThemeColor } from '../../../../types/enums-color-theme'
import { TUserInfo } from '../../../../types/user-data-type'
import Link from 'next/link'

type Props = {
    userData: TUserInfo,
}

export default async function HomeMobile({ userData }: Props) {

    const { imageUrl, theme, name } = userData

    return (
        <>
            <section className="flex lg:hidden flex-col w-full h-[calc(100vh-60px)] bg-white gap-2 justify-center items-center min-w-iphoneSEWidth">
                <div className="w-full flex p-2 justify-center items-center">
                    <div className="flex w-5/6 gap-2 justify-center items-center">
                        <Image src={logo} alt="logo" width={25} height={20} />
                        <h1>PLANNER BÍBLICO</h1>
                    </div>
                </div>
                <div className={`w-11/12 h-[50vh] ${theme == EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'} flex flex-col rounded-xl gap-2 p-2 justify-center items-center`}>
                    {/* User imageUrl */}
                    {imageUrl == '/NoImage' ?
                        <User className='w-[120px] h-[120px] object-cover aspect-square rounded-full shadow-xl' />
                        : <Image src={imageUrl} width={120} height={30} alt="Imagem do usuário" className='w-[120px] h-auto object-cover aspect-square rounded-full bg-slate-600 shadow-xl' />
                    }
                    <h2 className='text-white font-bold mt-4'>{name}</h2>
                    <p className='text-white font-light'>Seja bem-vindo de volta</p>
                    <div className='w-full flex gap-2 justify-between'>
                    </div>
                </div>

                <div className="w-11/12 h-[calc(100vh-460px)] flex justify-center gap-2 p-2 bg-weirdWhite rounded-xl">
                    <figure>
                        <Image src={homeImg} width={150} className="h-full object-cover" alt="Casal de crentes, cada um com a bíblia nas mãos" />
                    </figure>
                    <article className="w-[42%] flex flex-col pl-1 gap-2 justify-center">
                        <p className="text-weirdBlack w-fit">Como usar o Planner Bíblico?</p>
                        <Link
                            target="_blank"
                            prefetch={false}
                            href="https://youtu.be/flSOxXnkICc"
                            className={`w-fit mb-4 h-fit whitespace-nowrap bg-mainPink px-2 py-[6px] rounded-lg`}
                        >
                            <span className="text-white border-b border-white w-fit h-fit">Ver tutorial</span>
                        </Link>
                    </article>
                </div>
            </section>
        </>
    )
}

