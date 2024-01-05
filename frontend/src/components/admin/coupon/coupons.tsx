"use client"
import { ChevronRight, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import dynamic from "next/dynamic";
import { TCoupon } from "../../../../types/coupon-types";

export default function Coupons({ coupons }: { coupons: TCoupon[] }) {
    const [modalIsOpen, setModalIsOpen] = useState<boolean>()

    const DynamicCouponModal = dynamic(() => import('./couponModal'))

    return (
        <>
            {modalIsOpen && <DynamicCouponModal open={modalIsOpen} onClose={() => setModalIsOpen(false)} />}
            <main className="w-full h-[85vh] flex justify-center">
                <section className="w-11/12  flex flex-col rounded-xl bg-white h-full p-2 gap-2">
                    <header className="flex flex-col gap-2">
                        <h1 className="text-2xl">Cupons cadastrados</h1>
                        <nav className="flex items-center gap-2">
                            <button onClick={() => setModalIsOpen(true)} className="flex gap-2 text-white bg-mainPink rounded-lg p-2">
                                <Plus />
                                Cupom
                            </button>
                            <div className="flex items-center gap-1">
                                <select className="p-1 rounded-lg" id="">
                                    <option value="">Ordernar por data</option>
                                </select>
                                <select className="p-1 rounded-lg" id="">
                                    <option value="">Afiliado</option>
                                </select>
                            </div>
                        </nav>
                    </header>

                    <section className="w-full flex flex-col gap-1">
                        <header className="grid grid-cols-8 justify-evenly justify-items-center rounded-lg p-2 bg-slate-200">
                            <h4>Nome</h4>
                            <h4>Desconto</h4>
                            <h4>Afiliado</h4>
                            <h4>Vendas</h4>
                            <h4>% afiliado</h4>
                            <h4>Valor à receber</h4>
                            <h4>Status cupom</h4>
                            <h4>Ver vendas</h4>
                        </header>
                        <div className="w-full h-[calc(100vh-280px)] flex flex-col gap-2 overflow-y-scroll">
                            {
                                coupons?.map(coupon =>
                                    <div key={coupon.id} className="border grid grid-cols-8 justify-evenly justify-items-center items-center rounded-lg p-2">
                                        <h4>{coupon.name}</h4>
                                        <h4>{coupon.value}%</h4>
                                        <h4>{coupon.affiliateName !== null ? coupon.affiliateName : ""}</h4>
                                        <h4>{coupon.use}</h4>
                                        <h4>{coupon.percentageToAffiliate}%</h4>
                                        <h4>R$ {
                                            coupon.percentageToAffiliate !== null
                                                ? ((coupon.usesCoupon.reduce((acc, curent) => acc + (curent.total / 100), 0) * (coupon.percentageToAffiliate / 100)).toFixed(2).replace('.', ','))
                                                : 0
                                        }</h4>
                                        <div className={`flex ${!coupon.isValid && 'flex-row-reverse'} gap-2 items-center p-1 rounded-md bg-slate-200 bg-opacity-70`}>
                                            <div className={`w-5 h-5 rounded-full ${coupon.isValid ? 'bg-[#83C770]' : 'bg-mainPink'} `}></div>
                                            {coupon.isValid ? 'Ativo' : 'Destivado'}
                                        </div>
                                        <h4>
                                            <Link href={`/admin/cupom/${coupon.id}`} className="w-7 h-7 p-1 bg-mainBlue flex items-center justify-center rounded-full">
                                                <ChevronRight color="#fff" width={25} />
                                            </Link>
                                        </h4>
                                    </div>
                                )
                            }
                        </div>
                    </section>
                </section>
            </main>
        </>
    )
}
