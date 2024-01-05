import Image from "next/image";
import { User } from "lucide-react";
import { timestampToUser } from '@/utils/dateParser'
import homeImg from '../../../../public/assets/home-couple.png'
import { TBooksCompleted } from "../../../../types/readings-types";
import HomeDesktopToggleCardTheme from "./homeDesktopToggleCardTheme";
import Link from "next/link";

type Props = {
    completedBooks: TBooksCompleted,
    // There is more, but I'm just using these
    userData: {
        imageUrl: string,
        name: string,
    },
}

export default function HomeDesktop({ userData: { name, imageUrl }, completedBooks }: Props) {
    return (
        <>
            <main className="w-full mx-2 overflow-hidden items-center bg-white hidden lg:flex rounded-lg p-2">
                <section className="flex flex-col justify-between h-full gap-2 items-center w-1/3">
                    <div className={`relative isolate overflow-hidden w-11/12 flex-1 flex flex-col rounded-xl gap-2 p-2 justify-center items-center`}>
                        {/* Toggle theme compo */}
                        <HomeDesktopToggleCardTheme whichElement="bgCardUserImage" />
                        {imageUrl === '/NoImage' ?
                            <User className='w-[120px] h-[120px] object-cover rounded-full shadow-xl' />
                            : <Image src={imageUrl} alt="Imagem do usuário" width={120} height={120} className='w-[120px] aspect-square object-cover rounded-full shadow-xl' />
                        }
                        <h2 className='text-white font-bold mt-4'>{name}</h2>
                        <p className='text-white font-light'>Seja bem-vindo de volta</p>
                        <div className='w-full flex gap-2 justify-between'>
                        </div>
                    </div>
                    <div className='w-11/12 flex h-fit bg-[#F3F6FD] rounded-xl gap-2 p-2'>
                        <figure className="flex justify-center pb-1">
                            <Image src={homeImg} alt='couple' width={150} />
                        </figure>
                        <article className="flex flex-col gap-2 justify-center">
                            <p className="text-weirdBlack">Como usar o Planner Bíblico?</p>
                            <Link
                                target="_blank"
                                prefetch={false} href="https://youtu.be/flSOxXnkICc"
                                className={`w-fit mb-4 h-fit whitespace-nowrap bg-mainPink px-2 py-[6px] rounded-lg`}
                            >
                                <span className="text-white border-b border-white w-fit h-fit">Ver tutorial</span>
                            </Link>
                        </article>
                    </div>
                </section>
                <section className="flex-1 flex flex-col h-full gap-20">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-3xl text-weirdBlack font-semibold">Essa é a sua jornada espiritual</h1>
                    </div>
                    <div className="flex flex-col justify-end gap-1">
                        <div className="flex justify-between">
                            <span className="text-weirdBlack font-semibold text-sm">Ultimos livro iniciados</span>
                        </div>
                        <div className="flex flex-col w-full">
                            <header className={`relative isolate overflow-hidden p-1 grid grid-cols-6 rounded-t-lg`}>
                                {/* Toggle theme compo */}
                                <HomeDesktopToggleCardTheme whichElement="bgTableHeader" />
                                <h4 className="text-white text-lg font-semibold">Livro</h4>
                                <h4 className="text-white text-lg text-center font-semibold">Data início</h4>
                                <h4 className="text-white text-lg text-center font-semibold">Conclusão</h4>
                                <h4 className="text-white text-lg text-center font-semibold">% Lida</h4>
                                <h4 className="text-white text-lg text-center font-semibold">Status</h4>
                            </header>
                            <section className="h-[calc(100vh-280px)] overflow-y-scroll overflow-x-hidden">
                                {completedBooks.map((completedBook, i) =>
                                    <div key={i} className="p-1 grid grid-cols-6 items-center rounded-t-lg">
                                        <h3 className="text-weirdBlack font-semibold text-md">{completedBook.book}</h3>
                                        <h3 className="text-weirdBlack text-center font-semibold text-md">{timestampToUser(completedBook.startedAt[0])}</h3>
                                        <h3 className="text-weirdBlack text-center font-semibold text-md">
                                            {
                                                completedBook.finishedAt.length === 0 ? '-' : timestampToUser(completedBook.finishedAt[0])
                                            }</h3>
                                        <h3 className="text-weirdBlack text-center font-semibold text-md">
                                            {
                                                Number(completedBook.completedPercentage) >= 100 ? 100 : completedBook.completedPercentage
                                            }%</h3>
                                        <h3 className={`p-1 ${Number(completedBook.completedPercentage) >= 100 ? 'bg-mainBlue' : 'bg-mainYellow'} text-white rounded-lg`}>
                                            {
                                                Number(completedBook.completedPercentage) >= 100 ? 'Completo' : 'Em andamento'
                                            }
                                        </h3>
                                    </div>
                                )}
                            </section>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
