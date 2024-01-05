import { X } from "lucide-react"
import { useLayoutEffect, useRef, useState } from "react"
import { modalProps } from "../../../../types/utils-types"
import dynamic from "next/dynamic"
import { axiosInstanceClient } from "@/libs/axiosAPICaller"
import Cookies from "js-cookie"

export default function AddPaymentModal({ open, onClose, id }: modalProps) {
    const refModal = useRef<HTMLDialogElement>(null)
    const refDate = useRef<HTMLInputElement>(null)
    const refValue = useRef<HTMLInputElement>(null)

    useLayoutEffect(() => {
        if (open && !refModal.current?.open) {
            refModal.current?.showModal()
        } else if (!open && refModal.current?.open) {
            refModal.current?.close()
        }
    }, [open])

    window.addEventListener("keydown", (e) => {
        if (!open) return
        if (e.key !== 'Escape') return
        onClose()
    })

    const handleSubmit = async (event: any) => {
        const { toast } = await import("react-hot-toast")

        event.preventDefault()
        if (refDate.current?.value === "" || refValue.current?.value === "")
            return toast.error("Preencha todos os campos")

        try {
            await axiosInstanceClient.post(`/coupons/${id}/payments`, {
                date: refDate.current?.value,
                value: Number(refValue.current?.value)
            }, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`
                }
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    const DynamicToast = dynamic(async () => (await import("react-hot-toast")).Toaster)

    return (
        <>
            <><DynamicToast /></>
            <dialog ref={refModal} className="backdrop:bg-black backdrop:opacity-75 rounded-lg">
                <div className="w-[40vw] h-[50vh] bg-white rounded-lg">
                    <header className="flex items-center justify-between p-3 bg-mainBlue">
                        <h2 className="text-white text-2xl font-semibold">Adicionar Pagamento</h2>
                        <button onClick={onClose} className="w-8 h-8 rounded-full bg-white bg-opacity-40 hover:opacity-75 flex items-center justify-center text-white text-xl font-semibold">
                            <X width={20} />
                        </button>
                    </header>
                    <form onSubmit={(event) => handleSubmit(event)} className="w-full flex items-center gap-2 pt-10 flex-col">
                        <div className="w-4/5 flex flex-col gap-1">
                            <label htmlFor="">Data</label>
                            <input ref={refDate} type="date" className="border p-2 rounded-lg bg-weirdWhite" />
                        </div>
                        <div className="w-4/5 flex flex-col gap-1">
                            <label htmlFor="">Valor</label>
                            <input ref={refValue} type="number" className="border p-2 rounded-lg bg-weirdWhite" />
                        </div>
                        <button type="submit" className="mt-3 bg-mainPink p-2 text-white text-xl rounded-3xl">
                            Adicionar pagamento
                        </button>
                    </form>
                </div>
            </dialog >
        </>
    )
}
