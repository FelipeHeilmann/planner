'use client'
import { books } from "@/utils/books"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useState } from 'react'

export default function EditReadingPlanMobile({ planoId }: { planoId: string }) {
    const [planBook, setPlanBook] = useState(false)

    const handleBook = (event: any) => {
        const element = event.target.value
        if (element === 'book') {
            setPlanBook(true)
        }
        else {
            setPlanBook(false)
        }
    }

    return (
        <main className="block w-full lg:hidden">
            <header className="w-full p-2 flex justify-between">
                <div className="flex gap-3 items-center">
                    <Link href={'/plano-leitura'}>
                        <ArrowLeft />
                    </Link>
                    <h3>Novo Plano de leitra</h3>
                </div>
            </header>
            <section className="w-full -mb-2 p-2 py-4 flex flex-col min-h-screen bg-mainBlue">
                <div className="w-full p-4 flex justify-center">
                    <h1 className="text-white text-xl font-semibold">Crie uma novo plano de leitura</h1>
                </div>
                <div className="w-full flex pt-4 flex-col gap-1 min-h-full p-3 bg-white rounded-[50px]">
                    <form>
                        <div className="w-full flex flex-col p-2 pt-4">
                            <label htmlFor="title" className="text-[#575353]">Nome do plano</label>
                            <input type="title" className="p-2 h-8 border-2 rounded-lg bg-[#F3F6FD]" name="title" id="title" />
                        </div>

                        <div className="w-full flex flex-col gap-2 p-2">
                            <label htmlFor="planOf" className="text-[#575353]">Tipo</label>
                            <select onChange={(event) => handleBook(event)} className="h-8 border-2 rounded-lg bg-[#F3F6FD]" name="planOf" id="planOf">
                                <option>Selecione um tipo de plano</option>
                                <option value="testament">Novo testamento</option>
                                <option value="testament">Antigo testamento</option>
                                <option value="bible">Biblia toda</option>
                                <option value="book">Livro</option>
                            </select>
                        </div>

                        {
                            planBook && <div className="w-full flex flex-col p-2 pt-4">
                                <label htmlFor="book" className="text-[#575353]">Livro</label>
                                <select className="h-8 border-2 rounded-lg text-[#2E3A59] bg-[#F3F6FD]" name="book" id="book">
                                    <option>Selecione um livro</option>
                                    {books.map((item, index) =>
                                        <option key={index} value={item}>{item}</option>
                                    )}
                                </select>
                            </div>
                        }

                        <div className="w-full flex flex-col gap-2 p-2">
                            <label htmlFor="date" className="text-[#575353]">Meta de finalização</label>
                            <input type="date" className="text-[#2E3A59] p-2 h-8 border-2 rounded-lg bg-[#F3F6FD]" name="endDate" id="date" />
                        </div>
                        <div className="w-full flex p-3 px-6 flex-col gap-1">
                            <button type="submit" className="w-full h-14 p-2 bg-mainBlue text-white text-base font-semibold rounded-3xl">Criar Plano</button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    )
}
