import { axiosInstace, axiosInstanceClient } from "@/libs/axiosAPICaller"
import { TUserUpdateZodFormSchema, userUpdateSchema } from "@/libs/updateUserZodFormShema"
import { timestampToInput } from "@/utils/dateParser"
import { zodResolver } from "@hookform/resolvers/zod"
import { useContext, useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import Cookies from "js-cookie"
import { ThemeContext } from "@/context/themeContex"
import { EThemeColor } from "../../../../types/enums-color-theme"
import { toast, Toaster } from "react-hot-toast"
import { EnumsUrlPath } from "../../../../types/enums-url-path"

export default function SettingsInfoFormMobile({
    birthDate,
    gender,
    email
}: { birthDate: string | null, gender: string | null, email: string }) {

    const { themeValue } = useContext(ThemeContext)

    const forgotPasswordEmailRef = useRef<HTMLInputElement>(null)

    const [errorPassword, setErrorPassword] = useState<string>()

    const [isModalOpen, setIsModalOpen] = useState(false)

    const { register, handleSubmit, setValue } =
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
            }).then(res => {
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
                    headers: { Authorization: `Bearer ${Cookies.get('token')}` }
                }).catch(err => console.error(err))

                window.location.reload()
            }
        }

        if (data.gender !== gender) {
            await axiosInstanceClient.patch('/users/update', {
                gender: data.gender
            }, {
                headers: { Authorization: `Bearer ${Cookies.get('token')}` }
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
            <form
                onSubmit={handleSubmit(handleGenderBirthDate)}
                className="h-full flex flex-col justify-around"
            >
                <div className="w-full flex flex-col px-3">
                    <span className="text-md font-light">Email</span>
                    <span className="text-md font-medium px-1 overflow-x-scroll">{email}</span>
                </div>

                <div className="w-full flex flex-col p-3">
                    <label htmlFor="current-password" className="text-md font-light">Senha atual</label>
                    <input
                        tabIndex={4}
                        {...register('oldPassword')}
                        onChange={e => setValue("oldPassword", e.target.value)}
                        type="password" id="password" className="w-[70%] h-8 border border-zinc-100 bg-weirdWhite text-weirdBlack rounded-md px-2"
                    />
                    {errorPassword && <p className="mt-2 text-red-600 text-lg">{errorPassword}</p>}
                </div>

                <div className="w-full flex flex-col p-3">
                    <label htmlFor="new-password" className="text-md font-light">Alterar senha</label>
                    <input
                        tabIndex={5}
                        {...register('newPassword')}
                        onChange={e => setValue("newPassword", e.target.value)}
                        type="password" id="new-password" className="w-[70%] h-8 border border-zinc-100 bg-weirdWhite text-weirdBlack rounded-md px-2"
                    />
                </div>

                {/* TODO: ADD LOGIC */}
                <div className="w-full flex items-center gap-2 p-3">
                    <p className="text-weirdBlack text-sm font-light">Esqueceu sua senha?</p>
                    <button
                        type="button"
                        onClick={() => forgotPassword()}
                        className="text-sm font-light text-mainBlue"
                    >Redefinir via email</button>
                </div>

                <div className="w-full flex items-center gap-2 justify-center">
                    <div className="w-1/2 flex flex-col p-2 gap-2">
                        <label htmlFor="birthday">Aniversário</label>
                        <input
                            tabIndex={6}
                            {...register('birthDate')}
                            onChange={e => setValue("birthDate", e.target.value)}
                            type="date" id="birthday" className="h-8 border border-zinc-100 p-1 bg-weirdWhite rounded-md"
                        />
                    </div>

                    <div className="w-1/2 flex flex-col p-2 gap-2">
                        <label htmlFor="gender">Sexo</label>
                        <select
                            tabIndex={7}
                            {...register('gender')}
                            onChange={e => setValue("gender", e.target.value)}
                            className="bg-weirdWhite border border-zinc-100 rounded-md p-1" name="gender" id="gender"
                        >
                            <option value={'Man'}>Homem</option>
                            <option value={'Woman'}>Mulher</option>
                        </select>
                    </div>
                </div>
                <div className="w-full flex justify-center">
                    <button
                        tabIndex={8}
                        type="submit"
                        className={`${themeValue === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'} shadow-md mt-4 rounded w-5/6 text-white py-2 px-3`}
                    >
                        Editar
                    </button>
                </div>
            </form >
        </>
    )
}
