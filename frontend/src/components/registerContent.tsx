"use client"
import { axiosInstanceClient } from '@/libs/axiosAPICaller'
import { TRegisterZodFormSchema, registerZodFormSchema } from '@/libs/registerZodFormSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, Phone, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import InputMask from 'react-input-mask'

export default function RegisterContent() {
    const [coupon, setCoupon] = useState<string>('')
    const [couponError, setCouponError] = useState<string>('')
    const [couponMessage, setCouponMessage] = useState<string>('')
    const [plan, setPlan] = useState<number>(0)
    const router = useRouter()

    const { setValue, getValues, handleSubmit, register } = useForm<TRegisterZodFormSchema>({ resolver: zodResolver(registerZodFormSchema) })


    const handleRegisterSubmit = async (data: TRegisterZodFormSchema) => {
        const res = await axiosInstanceClient.post('/payment', {
            name: data.name,
            email: data.email,
            cpf: data.cpf,
            telephone: data.telephone,
            plan: data.plan,
            couponName: coupon !== '' ? coupon : null
        })

        const pagarmeLink = res.data

        router.push(pagarmeLink)
    }


    const handleCouponValidate = async (event: any) => {
        event.preventDefault()
        setCouponMessage('')
        setCouponError('')

        if (coupon !== '') {
            try {
                const res = await axiosInstanceClient.get(`/payment/coupon/${coupon}`)
                setCouponMessage(res.data.value)
            }
            catch (err: any) {
                setCouponError(err.response.data.message)
                setCoupon('')
            }

        }
    }

    useEffect(() => {
        router.refresh()
    }, [])
    return (
        <main className='w-full bg-weirdWhite flex justify-center pb-2'>
            <section className='w-4/5 lg:w-2/5 mt-7 flex flex-col items-center p-2 bg-white border border-mainBlue rounded-lg space-y-5'>
                <h2 className='text-4xl text-black font-semibold text-center'>Checkout</h2>
                <p className='text-black text-lg text-center'>Planner Bíblico Digital</p>
                <span className='w-11/12 h-[1px] bg-[#ccc]'></span>
                <form noValidate onSubmit={handleSubmit(handleRegisterSubmit)} className='w-full flex flex-col items-center px-6 gap-6'>
                    <div className='w-full flex flex-col gap-1'>
                        <label htmlFor="">Nome completo</label>
                        <div className='w-full relative'>
                            <input {...register("name")} type="text" name='name' className='h-10 border rounded-lg p-1 pl-9 w-full' />
                            <User width={20} className='absolute top-2 left-2' />
                        </div>
                    </div>

                    <div className='w-full flex flex-col gap-1'>
                        <label htmlFor="">CPF</label>
                        <div className='w-full relative'>
                            <InputMask {...register("cpf")} mask="999.999.999-99" maskChar={null} name='cpf' className='h-10 border rounded-lg p-1 pl-9 w-full' />
                            <User width={20} className='absolute top-2 left-2' />
                        </div>
                    </div>

                    <div className='w-full flex flex-col gap-1'>
                        <label htmlFor="">Telefone</label>
                        <div className='w-full relative'>
                            <InputMask {...register("telephone")} mask="(99) 99999-9999" maskChar={null} className='h-10 border rounded-lg p-1 pl-9 w-full' />
                            <Phone width={20} className='absolute top-2 left-2' />
                        </div>
                    </div>

                    <div className='w-full flex flex-col gap-1'>
                        <label htmlFor="">Email</label>
                        <div className='w-full relative'>
                            <input {...register("email")} type="email" className='h-10 border rounded-lg p-1 pl-9 w-full' />
                            <Mail width={20} className='absolute top-2 left-2' />
                        </div>
                    </div>

                    <div className='w-full flex flex-col gap-1'>
                        <label htmlFor="">Tempo de acesso</label>
                        <div className='w-full relative'>
                            <select {...register("plan")} name='plan' onChange={(e) => e.target.value === '6' ? setPlan(67) : setPlan(77)} className='h-10 border rounded-lg p-1 w-full'>
                                <option value="">Escolha um plano de acesso</option>
                                <option value="1">1 ano - R$ 77,00</option>
                            </select>
                        </div>
                    </div>

                    <div className='w-full flex flex-col gap-1'>
                        <label htmlFor="">Cupom de desconto</label>

                        <div className='flex gap-2 items-center flex-wrap'>
                            <input onChange={(event) => setCoupon(event.target.value)} value={coupon} type="text" name='coupon' className='w-full h-10 bg-white border rounded-lg p-1 ' />
                            <button onClick={(event) => handleCouponValidate(event)} className=' rounded-lg bg-mainBlue p-2 text-white'>Validar</button>
                            {couponError !== '' && <p className='text-red-500'>{couponError}</p>}
                            {
                                couponMessage !== '' &&
                                <div className='w-full flex gap-2'>
                                    <p className='text-green-500'>
                                        Valor com {couponMessage}% de desconto:
                                    </p>
                                    {
                                        plan !== 0 &&
                                        <p className='text-green-500'>
                                            Total de R${plan - (plan * (Number(couponMessage) / 100))}
                                        </p>

                                    }
                                </div>

                            }
                        </div>
                    </div>

                    <div className='w-full flex flex-col gap-3'>
                        <button className='w-24 rounded-lg bg-mainBlue p-2 text-white'>Comprar</button>
                    </div>
                </form>
            </section>
        </main>
    )
}
