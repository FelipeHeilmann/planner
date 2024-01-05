import { axiosInstanceClient } from "@/libs/axiosAPICaller"
import { TCouponZodForm, couponZodFormSchema } from "@/libs/couponZodFormSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, X } from "lucide-react"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import Cookies from "js-cookie"
import { modalProps } from "../../../../types/utils-types"

type TAffiliates = {
    id: string
    name: string
    email: string
    createdAt: string
    isAdmin: boolean
    isActive: boolean
    accessDuration: number
    gender: string | null
    disabledAt: Date | null
    lastLoginAt: Date | null
    birthDate: Date | null
    isAffiliate: boolean
    origin: string | null
}[]


export default function CouponModal({ open, onClose }: modalProps) {

    const ref = useRef<HTMLDialogElement>(null)

    const [endDateCheck, setEndDateCheck] = useState(false)
    const [isActive, setIsActive] = useState<boolean>(false)
    const [affiliates, setAffiliates] = useState<TAffiliates>([])

    const { register, getValues, handleSubmit } = useForm<TCouponZodForm>({ resolver: zodResolver(couponZodFormSchema) })

    const toggleIsActive = (event: any) => {
        event.preventDefault()
        if (!isActive) {
            return setIsActive(true)
        }
        setIsActive(false)
    }

    const handleCouponSubmit = async () => {
        await axiosInstanceClient.post('/coupons', {
            name: getValues("name"),
            value: Number(getValues("value")),
            isValid: isActive,
            dueAt: !endDateCheck ? getValues("dueAt") : null,
            affiliateId: getValues("affiliateId") === "default" ? null : getValues("affiliateId"),
            percentageToAffiliate: getValues("percentageToAffiliate")?.toString().length === 0 ? null : Number(getValues("percentageToAffiliate")),
        }, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        })
        onClose()
    }

    useLayoutEffect(() => {
        if (open && !ref.current?.open) {
            ref.current?.showModal()
        } else if (!open && ref.current?.open) {
            ref.current?.close()
        }
    }, [open])

    const fetchAffiliates = async () => {
        const { data } = await axiosInstanceClient.get('/affiliates', {
            headers: { Authorization: `Bearer ${Cookies.get('token')}` }
        })

        setAffiliates(data)
    }

    useEffect(() => {
        fetchAffiliates()
    }, [])

    window.addEventListener("keydown", (e) => {
        if (!open) return
        if (e.key !== 'Escape') return
        onClose()
    })

    return (
        <>
            <dialog ref={ref} className="backdrop:bg-black backdrop:opacity-75 rounded-lg">
                <div className="w-[40vw] h-[80vh] bg-white rounded-lg">
                    <header className="flex items-center justify-between p-3 bg-mainBlue">
                        <h2 className="text-white text-2xl font-semibold">Criar Cupom</h2>
                        <button onClick={onClose} className="w-8 h-8 rounded-full bg-white bg-opacity-40 hover:opacity-75 flex items-center justify-center text-white text-xl font-semibold">
                            <X width={20} />
                        </button>
                    </header>
                    <form noValidate onSubmit={handleSubmit(handleCouponSubmit)} className="w-full flex items-center gap-1 pb-2 pt-10 flex-col">
                        <div className="w-4/5 flex flex-col gap-1 p-1">
                            <label className="text-lg" htmlFor="">Nome</label>
                            <input {...register("name")} type="text" className="border p-2 rounded-lg bg-weirdWhite" />
                        </div>
                        <div className="w-4/5 flex flex-col gap-1 p-1">
                            <label className="text-lg" htmlFor="">Desconto</label>
                            <input {...register("value")} type="number" className="border p-2 rounded-lg bg-weirdWhite" />
                        </div>
                        <div className="w-4/5 flex flex-col gap-1 p-1">
                            <label className="text-lg" htmlFor="">Afiliado</label>
                            <select {...register("affiliateId")} className="border p-2 rounded-lg bg-weirdWhite">
                                <option value="default">Escolha um afiliado</option>
                                {
                                    affiliates &&
                                    affiliates.map(item =>
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div className="w-4/5 flex flex-col gap-1 p-1">
                            <label className="text-lg" htmlFor="">Porcentagem para afiliado</label>
                            <input {...register("percentageToAffiliate")} type="number" className="border p-2 rounded-lg bg-weirdWhite" />
                        </div>
                        <div className="w-4/5 flex flex-wrap items-center gap-1 p-1">
                            <div className="w-1/2 flex flex-wrap items-center gap-2">
                                <label className="text-lg" htmlFor="">Sem data de término</label>
                                <label className={`border flex justify-center items-center ${endDateCheck ? 'bg-mainBlue border-mainBlue' : 'bg-white border-black'} transition-all rounded-full w-6 cursor-pointer h-6`} htmlFor="endDate">
                                    {
                                        <Check color="#fff" width={15} />
                                    }
                                </label>
                                <input onChange={() => setEndDateCheck(prev => !prev)} className="hidden" id="endDate" type="checkbox" />
                            </div>
                            <div className={`w-2/5 relative flex flex-col`}>
                                <input disabled={endDateCheck} type="date" {...register("dueAt")} className={`border p-2 rounded-lg bg-weirdWhite ${!endDateCheck ? 'opacity-100' : 'opacity-40'}`} />
                            </div>

                        </div>
                        <div className="w-4/5 flex flex-col gap-1 p-1">
                            <label className={`${isActive ? 'text-black' : 'text-zinc-400'} transition-all text-lg mr-4 left-16`} htmlFor="">Ativo</label>
                            <div className={` ${!isActive && 'opacity-70'} relative w-14 h-7 bg-weirdWhite rounded-3xl hover:cursor-pointer isolate`}>
                                <button onClick={(event) => toggleIsActive(event)} className="w-full h-full absolute rounded-3xl z-10  top-0 bottom-0 left-0 right-0" />
                                <div className={`transition-all absolute -z-10 cursor-pointer ${isActive ? 'translate-x-1 bg-green-700' : 'translate-x-8 bg-zinc-600'} top-1/2 -translate-y-1/2 rounded-full h-4/6 aspect-square`} />
                            </div>
                        </div>
                        <button className="bg-mainPink p-4 text-white text-xl rounded-3xl">
                            Adicionar Cupom
                        </button>
                    </form>
                </div>
            </dialog>
        </>
    )
}
