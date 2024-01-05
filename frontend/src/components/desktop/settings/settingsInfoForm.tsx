"use client"
import { TUserUpdateZodFormSchema, userUpdateSchema } from "@/libs/updateUserZodFormShema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Cookies from 'js-cookie'
import { useContext, useEffect, useRef, useState } from "react"
import { timestampToInput } from "@/utils/dateParser"
import { axiosInstace, axiosInstanceClient } from "@/libs/axiosAPICaller"
import { ThemeContext } from "@/context/themeContex"
import { EThemeColor } from "../../../../types/enums-color-theme"
import { EnumsUrlPath } from "../../../../types/enums-url-path"
import { toast, Toaster } from "react-hot-toast"

export default function SettingsInfoForm({ birthDate, gender, email }: { birthDate: string | null, gender: string | null, email: string }) {

    const forgotPasswordEmailRef = useRef<HTMLInputElement>(null)

    const { themeValue } = useContext(ThemeContext)

    const [errorPassword, setErrorPassword] = useState<string>()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const { register, handleSubmit, setValue, } =
        useForm<TUserUpdateZodFormSchema>({ resolver: zodResolver(userUpdateSchema) })

    const handleGenderBirthDate = async (data: TUserUpdateZodFormSchema) => {
        setErrorPassword('')
        if (data.oldPassword !== "" && data.newPassword !== "") {
            axiosInstanceClient.patch('/users/update', {
                oldPassword: data.oldPassword,
                newPassword: data.newPassword
            }, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                }
            })
                .then(res => {
                    if (res.status === 200) return window.location.reload()
                })
                .catch(err => {
                    setErrorPassword(err.response.data.message)
                })
        }

        if (data.birthDate !== '') {
            const birthAPIDateString = birthDate !== null ? birthDate.split('T')[0].split('-') : ''
            const birthInputDateString = data.birthDate!.split('-')

            if (
                birthAPIDateString[0] !== birthInputDateString[0] ||
                birthAPIDateString[1] !== birthInputDateString[1] ||
                birthAPIDateString[2] !== birthInputDateString[2]
            ) {
                await axiosInstanceClient.patch('/users/update', {
                    birthDate: data.birthDate
                }, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`,
                    }
                }).catch(err => console.error(err))

                window.location.reload()
            }
        }

        if (data.gender !== gender) {
            await axiosInstanceClient.patch('/users/update', {
                gender: data.gender
            }, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                }
            }).catch(err => console.error(err))

            window.location.reload()
        }
    }

    const handleSubmitForgotPass = async () => {
        await axiosInstace.masterReq({ url: EnumsUrlPath().ForgotPassword, data: { 'email': forgotPasswordEmailRef.current?.value } })
            .then(res => {
                if (!res) return toast.error('Algo de errado aconteceu')
                if (res.status === 422) return toast.error('Email inválido')
                toast.success(res!.data.message)
            })
            .catch(err => {
                if (err.response.status !== 422) return toast.error(err.response.data.message)
                console.log('from catch : ', err)
            })
        setIsModalOpen(false)
    }

    const forgotPassword = async () => {
        const { Modal } = await (import('antd'))
        Modal.confirm({
            title: 'Esqueci a senha',
            open: isModalOpen,
            onOk: handleSubmitForgotPass,
            onCancel: () => setIsModalOpen(false),
            okText: <span className="text-black">Salvar</span>,
            cancelText: "Cancelar",
            content: <input
                ref={forgotPasswordEmailRef}
                type="email"
                placeholder="Digite seu email"
                className="w-full border p-2 rounded text-[15px]"
            />,
        })
    }

    useEffect(() => {
        gender && setValue("gender", gender)
        birthDate !== null && setValue("birthDate", timestampToInput((birthDate)))
    }, [])

    return (
        <>
            <div><Toaster /></div>
            <form noValidate onSubmit={handleSubmit(handleGenderBirthDate)} className="w-3/4">
                <div className="w-full flex items-center p-1 px-3">
                    <label className="text-md font-light">Email: </label>
                    <span id="email" className=" flex items-center w-[70%] h-8 text-weirdBlack rounded-md px-2">{email}</span>
                </div>

                <div className="w-full flex flex-col px-3 pb-1">
                    <label htmlFor="current-password" className="text-md font-light">Senha atual</label>
                    <input {...register("oldPassword")} onChange={(e) => setValue("oldPassword", e.target.value)} type="password" id="password" className="w-[70%] h-8 border bg-weirdWhite text-weirdBlack rounded-md px-2" />
                    {errorPassword && <p className="mt-2 text-red-600 text-lg">{errorPassword}</p>}
                </div>

                <div className="w-full flex flex-col px-3 pb-2">
                    <label htmlFor="new-password" className="text-md font-light">Alterar senha</label>
                    <input {...register("newPassword")} onChange={(e) => setValue("newPassword", e.target.value)} type="password" id="newPassword" className="w-[70%] h-8 border bg-weirdWhite text-weirdBlack rounded-md px-2" />
                </div>

                <div className="w-full flex items-center gap-2 justify-center">
                    <p className="text-weirdBlack text-sm font-light">Esqueceu sua senha?</p>
                    <button
                        type="button"
                        onClick={() => forgotPassword()}
                        className="text-sm font-light text-mainBlue"

                    >Redefinir via email</button>
                </div>

                <div className="w-full flex items-center gap-2 justify-center">
                    <div className="w-1/2 flex flex-col p-2 gap-1">
                        <label htmlFor="birthday">Aniversário</label>
                        <input {...register("birthDate")} onChange={(e) => setValue("birthDate", e.target.value)} type="date" id="birthday" className="h-10 p-2 border bg-weirdWhite rounded-md" />
                    </div>

                    <div className="w-1/2 flex flex-col p-2 gap-1">
                        <label htmlFor="sex">Sexo</label>
                        <select {...register("gender")} onChange={(e) => setValue("gender", e.target.value)} className="h-10 bg-weirdWhite border rounded-md p-2" name="gender" id="gender">
                            <option value={'Man'}>Homem</option>
                            <option value={'Woman'}>Mulher</option>
                        </select>
                    </div>
                </div>

                <div className="w-full flex items-center justify-center gap-2 pt-2">
                    <button type="submit" className={`w-1/4 ${themeValue === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'} p-3 text-weirdWhite text-xl rounded-lg`}>Enviar</button>
                </div>
            </form>
        </>
    )
}
