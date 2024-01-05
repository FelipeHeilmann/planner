"use client"
import { Plus } from "lucide-react"
import { useState } from "react"
import dynamic from "next/dynamic"
import { timestampToUser } from "@/utils/dateParser";
import { TAffiliatePayment, TCoupon } from "../../../../types/coupon-types";

export default function CouponDetail({ coupon, couponId, payments, valueTotalToPay, valueAlreadyPayed, valueRemainingToPay }: { coupon: TCoupon | null, couponId: string, payments: TAffiliatePayment[] | null, valueTotalToPay: string | null, valueAlreadyPayed: string | null, valueRemainingToPay: string | null }) {

    const [modalIsOpen, setModalIsOpen] = useState<boolean>()

    const DynamicAddPaymentModal = dynamic(() => import('./addPaymentModal'))

    return (
        <>
            {modalIsOpen && <DynamicAddPaymentModal open={modalIsOpen} onClose={() => setModalIsOpen(false)} />}
            <main className="w-full h-[85vh] flex flex-col justify-center overflow-y-hidden">
                <section className="w-11/12  flex flex-col rounded-xl bg-white h-full p-2 gap-4">
                    <header className="w-full flex gap-2 items-center">
                        <h2 className="text-2xl">{coupon?.name}</h2>
                        <button onClick={() => setModalIsOpen(true)} className="flex gap-2 bg-mainPink p-2 text-white rounded-xl">
                            <Plus width={20} color="#fff" />
                            ao afiliado
                        </button>
                    </header>
                    <div className="w-full flex gap-2">
                        <div className="flex flex-col items-center p-8 rounded-lg text-white bg-mainBlue">
                            <span className="font-semibold text-3xl">{coupon?.usesCoupon.length}</span>
                            <span>vendas</span>
                        </div>
                        <div className="flex flex-col items-center p-8 rounded-lg text-white bg-mainBlue">
                            <span className="font-semibold text-3xl">R$ {valueTotalToPay}</span>
                            <span>valor para afiliado</span>
                        </div>
                        <div className="flex flex-col items-center p-8 rounded-lg text-white bg-[#83C770]">
                            <span className="font-semibold text-3xl">R$ {valueAlreadyPayed}</span>
                            <span>Total pago</span>
                        </div>
                        <div className="flex flex-col items-center p-8 rounded-lg text-white bg-mainPink">
                            <span className="font-semibold text-3xl">R$ {valueRemainingToPay}</span>
                            <span>Á pagar</span>
                        </div>
                    </div>
                    <div className="w-full mt-3 flex flex-col gap-1">
                        <h2 className="text-xl">Pagamentos afiliado</h2>
                        <header className="w-1/4 rounded-lg grid grid-cols-2 p-2 bg-zinc-200">
                            <h4>Data</h4>
                            <h4>Valor</h4>
                        </header>
                        {
                            payments &&
                            payments.map(payment =>
                                <div key={payment.id} className="w-1/4 rounded-lg grid grid-cols-2 p-2 border">
                                    <h4>{timestampToUser(payment.date)}</h4>
                                    <h4>R$ {payment.value}</h4>
                                </div>
                            )
                        }


                    </div>
                    <div className="w-full mt-4 flex flex-col gap-1">
                        <h2 className="text-xl">Vendas cupom</h2>
                        <header className="rounded-lg grid grid-cols-5 p-2 bg-zinc-200">
                            <h4>Nome</h4>
                            <h4>Email</h4>
                            <h4>Data</h4>
                            <h4>Valor</h4>
                            <h4>Status</h4>
                        </header>
                        <div className="w-full max-h-[30vh] pb-10 flex flex-col gap-2 overflow-y-scroll">
                            {
                                coupon &&
                                coupon.usesCoupon.map(use =>
                                    <div key={use.userId} className="rounded-lg grid grid-cols-5 p-2 border">
                                        <h4 className="text-md">{use.userName?.split(" ")[0]} {use.userName?.split(" ")[1]}</h4>
                                        <h4 className="text-md">{use.userEmail}</h4>
                                        <h4 className="text-md">{use.date ? timestampToUser(use.date) : ''}</h4>
                                        <h4 className="text-md">R$ {(use.total / 100).toFixed(2).replace('.', ',')}</h4>
                                        <h4 className="text-md">{use.status}</h4>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
