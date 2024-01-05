"use client"
import { axiosInstanceClient } from "@/libs/axiosAPICaller"
import { resetPasswordZodFormSchema } from "@/libs/resetPasswordZodFormSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOffIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast, Toaster } from "react-hot-toast"
import { TResetPasswordZodFormSchema } from "@/libs/resetPasswordZodFormSchema"

export default function ResetPassword({ token }: { token: string }) {

    const [passAnimation, setPassAnimation] = useState(false)
    const [seePass, setSeePass] = useState(false)
    const [seePassConfirm, setSeePassConfirm] = useState(false)
    const [isJwtExpired, setIsJwtExpired] = useState(false)

    const router = useRouter()

    const { register, reset, handleSubmit, getValues, formState: { errors, isSubmitting, isLoading, isValidating } }
        = useForm<TResetPasswordZodFormSchema>({ resolver: zodResolver(resetPasswordZodFormSchema) })

    const focusHandler = (e: React.FocusEvent<HTMLInputElement>) => {
        setPassAnimation(true)
    }

    const blurHandler = (e: any) => {
        if (e.target.value !== '') return
        setPassAnimation(false)
    }

    const toggleSeePassConfirm = () => {
        if (!seePassConfirm) return setSeePassConfirm(true)
        setSeePassConfirm(false)
    }

    const toggleSeePass = () => {
        if (!seePass) return setSeePass(true)
        setSeePass(false)
    }

    const handleSumitResetPassword = async () => {
        if (getValues("password") !== getValues("confirmPassword")) {
            return toast.error('As senhas devem ser iguais')
        }
        if (getValues("password") === '' || getValues("confirmPassword") === '') {
            return toast.error('As senhas devem ser iguais')
        }

        if (getValues("password"))
            axiosInstanceClient.patch('/reset-password',
                {
                    password: getValues("password"),
                    confirmPassword: getValues("confirmPassword"),
                },
                { headers: { Authorization: `Bearer ${token}` } })
                .then(res => {
                    if (res.status === 200) {
                        toast.success("Senha alterada com sucesso")
                        reset({
                            password: "",
                            confirmPassword: ""
                        })
                        router.push('/login')
                    }
                })
                .catch(err => {
                    console.error(err)
                    if (err.response.data.message == "jwt expired") {
                        reset({
                            password: "",
                            confirmPassword: ""
                        })
                        return setIsJwtExpired(true)
                    }
                    toast.error("Algo deu errado, tente novamente")
                })
        // JONAS FURTADO, MAKE THE RESPONSE HANDLE (SAY IT USING INDIAN ACCENT ;) )
        // - Done hehe, Todae we are going to learn how to fet  d a t a  in JavaScribt 2023
    }

    return (
        <>
            <main className="relative w-full h-screen flex justify-center items-center">
                <div><Toaster /></div>
                <span className="absolute block text-center text-red-500 top-4 w-4/5 left-1/2 -translate-x-1/2">{isJwtExpired && '* Pela sua segurança o token expirou, gere outro novamente indo para a página de login e clicando em "Esqueci a senha" e acessando um novo link vindo de um novo e-mail'}</span>
                <form onSubmit={handleSubmit(handleSumitResetPassword)} className={`${isJwtExpired && 'border-red-500'} border-2 border-transparent flex flex-col gap-3 rounded-lg bg-white px-5 py-8`}>
                    <section className="w-full flex flex-col relative">
                        <label className="text-weirdBlack text-lg" htmlFor="password">Sua nova senha</label>
                        <input
                            tabIndex={2}
                            autoComplete="current-passord"
                            type={!seePass ? 'password' : 'text'}
                            id="password"
                            {...register("password", { required: "A senha é obrigatória" })}
                            onFocus={(e) => focusHandler(e)}
                            onBlur={e => blurHandler(e)}
                            className={`w-full text-loginTitleColor h-11  px-2 border-b-[2px] border-[#adadad] focus:outline-0`}
                        />
                        <div className={`absolute h-[2px] w-full bg-gradient-to-r from-pink-500 to-indigo-500 bottom-[30px] transition origin-left duration-700 translate-x-0 ${passAnimation ? 'block' : 'hidden'}`} />
                        <span className="w-3/4 min-h-fit h-[30px] text-red-600">{errors.password?.message?.toString()}</span>
                        <button type="button" tabIndex={3} onClick={toggleSeePass} className="absolute right-2 bottom-10">
                            {
                                seePass ?
                                    <Eye className="text-loginInputPlaceholderColor" />
                                    :
                                    <EyeOffIcon className="text-loginInputPlaceholderColor" />
                            }
                        </button>
                    </section>
                    <section className="w-full flex flex-col relative">
                        <label className="text-weirdBlack text-lg" htmlFor="confirmPassword">Confirme sua senha</label>
                        <input
                            tabIndex={2}
                            autoComplete="current-passord"
                            type={!seePassConfirm ? 'password' : 'text'}
                            id="confirmPassword"
                            {...register("confirmPassword", { required: "A senha é obrigatória" })}
                            onFocus={(e) => focusHandler(e)}
                            onBlur={e => blurHandler(e)}
                            className={`w-full text-loginTitleColor h-11  px-2 border-b-[2px] border-[#adadad] focus:outline-0`}
                        />
                        <div className={`absolute h-[2px] w-full bg-gradient-to-r from-pink-500 to-indigo-500 bottom-[30px] transition origin-left duration-700 translate-x-0 ${passAnimation ? 'block' : 'hidden'}`} />
                        <span className="w-3/4 min-h-fit h-[30px] text-red-600">{errors.confirmPassword?.message?.toString()}</span>
                        <button type="button" tabIndex={3} onClick={toggleSeePassConfirm} className="absolute right-2 bottom-10">
                            {
                                seePassConfirm ?
                                    <Eye className="text-loginInputPlaceholderColor" />
                                    :
                                    <EyeOffIcon className="text-loginInputPlaceholderColor" />
                            }
                        </button>
                    </section>
                    <button
                        tabIndex={4}
                        type="submit"
                        disabled={isSubmitting || isLoading || isValidating}
                        className={`mt-6 ${isSubmitting || isLoading || isValidating ? 'bg-gray-400' : 'bg-gradient-to-r from-pink-500 to-indigo-500'} text-[#fff] rounded-[10px] text-center h-[50px]`}
                    >
                        Mudar senha
                    </button>
                </form>
            </main>
        </>
    )
}
