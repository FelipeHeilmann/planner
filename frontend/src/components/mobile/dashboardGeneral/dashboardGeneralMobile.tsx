import Image from 'next/image'
import man from '../../../../public/assets/dashboard-man.png'
import girl from '../../../../public/assets/dashboard-girl.png'
import { Album } from 'lucide-react'
import VersesDashboardIcon from '../../../../public/icons/versesDashboardIcon'
import WordsDashboardIcon from '../../../../public/icons/wordsDashboardIcon'
import FetchUserInfo from '@/api/fetchUserInfo'
import DashboardGeneralHeader from './dashboardGeneralHeader'
import { TReading } from '../../../../types/readings-types'
import DashboardGeneralCompletedBooksPerTestamentChart from '@/components/desktop/dashboardGeneral/dashboardGeneralCompletedBooksPerTestamentChart'
import { EThemeColor } from '../../../../types/enums-color-theme'


type TCompletedBook = {
    book: string
    completed: number
    finishedAt: string[]
}[]

export default async function DashboardGeneralMobile(
    {
        completedBook,
        readings,
        numOfChaptersNewTestament,
        numOfChaptersOldTestament,
        comparedBooks,
        completedBooksByTestament,
        newTestamentCompletedBooks,
        oldTestamentCompletedBooks,
        totalCompletedBooksTestaments,
        chapters,
        verses,
        words,
        name,
        completedBible
    }: {
        completedBook: TCompletedBook,
        readings: [] | TReading[],
        numOfChaptersNewTestament: number,
        numOfChaptersOldTestament: number,
        comparedBooks: string[][],
        completedBooksByTestament: string[][],
        newTestamentCompletedBooks: number,
        oldTestamentCompletedBooks: number,
        totalCompletedBooksTestaments: number,
        chapters: number,
        verses: number,
        words: number,
        name: string
        completedBible: number
    }
) {

    const { imageUrl: img, theme } = await FetchUserInfo()

    return (
        <>
            <main className="block relative lg:hidden w-full mb-[51px]">
                <DashboardGeneralHeader img={img} />
                <section className="w-full flex flex-col gap-2 p-3">
                    <div className={`w-full h-[20vh] flex justify-between items-center relative rounded-lg ${theme === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'}`}>
                        <Image src={theme === EThemeColor.Blue ? man : girl} alt='Personagem' className='w-32 -mt-[4vh]' />
                        <div className="flex flex-col gap-4 p-3 mr-8">
                            <div className="flex flex-col">
                                <p className="text-white text-sm font-light">Livros concluidos</p>
                                <span className="text-white text-2xl font-semibold">
                                    {
                                        completedBook.length >= 1000 ? '+999' : completedBook.length
                                    }
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-white text-sm font-light">Biblia completa</p>
                                <span className="text-white text-2xl font-semibold">
                                    {
                                        completedBible! >= 1000 ? '+999' : completedBible

                                    }</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-ful flex gap-2">
                        <div className="w-1/2 bg-white flex flex-col items-center p-2 gap-3 rounded-lg">
                            <p className="text-weirdBlack text-[13px] font-light">Livros concluidos</p>
                            {/*rounded chart*/}
                            <span className="text-mainBlue text-sm font-light">Antigo Testamento</span>
                            <div className='w-full relative flex justify-center'>
                                <span className="text-lg text-weirdBlack font-semibold absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                                    {
                                        newTestamentCompletedBooks > 9999 ? '+9999' : newTestamentCompletedBooks
                                    }
                                </span>
                                <DashboardGeneralCompletedBooksPerTestamentChart
                                    booksCompleted={newTestamentCompletedBooks}
                                    totalTestaments={totalCompletedBooksTestaments}
                                    whichTestament="new testament"
                                />
                            </div>
                        </div>
                        <div className="w-1/2 bg-white flex flex-col items-center p-2 gap-3 rounded-lg">
                            <p className="text-weirdBlack text-[12px] font-light">Livros concluidos</p>
                            {/*rounded chart*/}
                            <span className="text-mainPink text-sm font-light">Novo Testamento</span>
                            <div className='w-full relative flex justify-center'>
                                <span className="text-lg text-weirdBlack font-semibold absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                                    {
                                        oldTestamentCompletedBooks > 9999 ? '+9999' : oldTestamentCompletedBooks
                                    }
                                </span>
                                <DashboardGeneralCompletedBooksPerTestamentChart
                                    booksCompleted={oldTestamentCompletedBooks}
                                    totalTestaments={totalCompletedBooksTestaments}
                                    whichTestament="old testament"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex gap-2">
                        <div className="w-1/3 bg-white rounded-lg flex flex-col gap-2 p-2">
                            <div className={`w-8  h-8 rounded-lg ${theme === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'} flex items-center justify-center`}>
                                <Album width={20} color="#F3F6FD" />
                            </div>
                            <span className="font-normal text-base text-weirdBlack">{chapters}</span>
                            <p className="text-sm font-light text-weirdBlack">Capítulos lidos</p>
                        </div>
                        <div className="w-1/3 bg-white rounded-lg flex flex-col gap-2 p-2">
                            <div className={`w-8  h-8 rounded-lg ${theme === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'} flex items-center justify-center`}>
                                <VersesDashboardIcon width={20} />
                            </div>
                            <span className="font-normal text-base text-weirdBlack">{verses}</span>
                            <p className="text-sm font-light text-weirdBlack">Versículos lidos</p>
                        </div>
                        <div className="w-1/3 bg-white rounded-lg flex flex-col gap-2 p-2">
                            <div className={`w-8  h-8 rounded-lg ${theme === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'} flex items-center justify-center`}>
                                <WordsDashboardIcon color="#F3F6FD" width={20} />
                            </div>
                            <span className="font-normal text-base text-weirdBlack">{words}</span>
                            <p className="text-sm font-light text-weirdBlack">Palavras lidas</p>
                        </div>

                    </div>
                    <div className="w-full flex bg-white flex-col rounded-lg gap-2 p-3">
                        <header className="w-full text-weirdBlack text-base">
                            Capítulos X Testamento
                        </header>
                        <div className="flex gap-16">
                            <div className="w-1/3 flex gap-2">
                                <div className="w-[15vw] flex items-end h-full p-1">
                                    <div style={{
                                        height:
                                            Number(((numOfChaptersOldTestament / chapters) * 100).toFixed()) <= 20 || isNaN(Number(((numOfChaptersOldTestament / chapters) * 100).toFixed()))
                                                ? '20%'
                                                : `${((numOfChaptersOldTestament / chapters) * 100).toFixed()}%`
                                    }}
                                        className="flex justify-center items-center w-full bg-mainBlue rounded-lg shadow-lg">
                                        <span className="text-sm text-white font-medium">
                                            {
                                                Number(((numOfChaptersOldTestament / chapters) * 100).toFixed()) <= 20 || isNaN(Number(((numOfChaptersOldTestament / chapters) * 100).toFixed()))
                                                    ? '0%'

                                                    : `${((numOfChaptersOldTestament / chapters) * 100).toFixed()}%`
                                            }
                                        </span>
                                    </div>
                                </div>
                                <div className="w-[15vw] flex items-end h-full p-1">
                                    <div style={{
                                        height:
                                            Number(((numOfChaptersNewTestament / chapters) * 100).toFixed()) <= 20 || isNaN(Number(((numOfChaptersNewTestament / chapters) * 100).toFixed()))
                                                ? '20%'
                                                : `${((numOfChaptersNewTestament / chapters) * 100).toFixed()}%`
                                    }}
                                        className="flex justify-center items-center w-full bg-mainPink rounded-lg shadow-lg">
                                        <span className="text-sm text-white font-medium">
                                            {
                                                Number(((numOfChaptersNewTestament / chapters) * 100).toFixed()) <= 20 || isNaN(Number(((numOfChaptersNewTestament / chapters) * 100).toFixed()))
                                                    ? '0%'

                                                    : `${((numOfChaptersNewTestament / chapters) * 100).toFixed()}%`
                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex gap-3 items-center">
                                    <div className="w-4 h-3 bg-mainBlue"></div>
                                    <p className="text-sm text-weirdBlack font-normal">Antigo Testamento</p>
                                </div>
                                <div>
                                    <p className="text-sm text-weirdBlack font-light"><span className="text-lg text-mainBlue font-semibold">
                                        {
                                            numOfChaptersOldTestament > 9999 ? '+9999' : numOfChaptersOldTestament
                                        }
                                    </span> Capítulos lidos</p>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <div className="w-4 h-3 bg-mainPink"></div>
                                    <p className="text-sm text-weirdBlack font-normal">Novo Testamento</p>
                                </div>
                                <div>
                                    <p className="text-sm text-weirdBlack font-light"> <span className="text-lg text-mainPink font-semibold">
                                        {
                                            numOfChaptersNewTestament > 9999 ? '+9999' : numOfChaptersNewTestament
                                        }
                                    </span> Capítulos lidos</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
