"use client"
import { useEffect, useRef, useState } from "react"
import { toast, Toaster } from "react-hot-toast"
import { axiosInstace } from "@/libs/axiosAPICaller"
import { EnumsUrlPath } from "../../types/enums-url-path"
import { useForm } from "react-hook-form"
import Image from "next/image"
import { loginZodFormSchema } from "@/libs/loginZodFormSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { Eye, EyeOffIcon } from "lucide-react"
import Logo from '../../public/assets/logo-planner.png'
import Casal from '../../public/assets/casal-login.svg'
import Fundo from '../../public/assets/object.svg'

type TLoginInputs = {
    email: string,
    password: string
}

export function Login() {

    const forgotPasswordEmailRef = useRef<HTMLInputElement>(null)

    const [emailAnimation, setEmailAnimation] = useState(false)
    const [passAnimation, setPassAnimation] = useState(false)

    const [seePass, setSeePass] = useState(false)

    const [errorMsg, setErrorMsg] = useState('')

    const [isModalOpen, setIsModalOpen] = useState(false)

    const router = useRouter()

    // Use <DevTool control={control}> to debug react-hook-form 
    const { register, reset, handleSubmit, formState: { errors, isSubmitSuccessful, isSubmitting, isLoading, isValidating } } = useForm<TLoginInputs>({ resolver: zodResolver(loginZodFormSchema) })

    const loginSubmitHandler = async (data: TLoginInputs) => {
        const base64Credentials = btoa(data.email + ':' + data.password);
        axiosInstace.masterReq({
            url: EnumsUrlPath().Auth, data: {}, headerAuth: `Basic ${base64Credentials}`
        })
            .then(res => {
                setErrorMsg('')
                if (res === undefined) {
                    toast.error(errorMsg)
                    setErrorMsg('Usuário/senha incorretos')
                    return
                }
                const cookieExpiresInSeconds = 60 * 60 * 24 * 30;
                Cookies.set('token', res?.data.token, { expires: cookieExpiresInSeconds });
                router.push('/bemvindo')
            }).catch(err => {
                console.error(err)
                setErrorMsg('Não foi possível completar essa ação')
                return toast.error(errorMsg)
            })
        reset({
            email: '',
            password: '',
        })
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

    const focusHandler = (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.target.id == 'email') return setEmailAnimation(true)
        setPassAnimation(true)
    }

    const blurHandler = (e: any) => {
        if (e.target.value !== '') return
        if (e.target.id == 'email') {
            return setEmailAnimation(false)
        }
        setPassAnimation(false)
    }

    const toggleSeePass = () => {
        if (!seePass) return setSeePass(true)
        setSeePass(false)
    }

    useEffect(() => {
        setEmailAnimation(true)
        setPassAnimation(true)
    }, [])

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
                type="email"
                ref={forgotPasswordEmailRef}
                placeholder="Digite seu email"
                className="w-full border p-2 rounded text-[15px]"
            />,
        })
    }

    return (
        <>
            <section className="h-screen flex-1 overflow-x-hidden">
                <div><Toaster /></div>
                <div className="h-full flex justify-center items-center gap-[20px] bg-mainBlue box-border p-[20px]">
                    {/* Login form card */}
                    <article className="flex flex-col gap-[20px] bg-loginCardBgColor w-[30%] min-w-[350px] h-fit border border-black rounded-[10px] shadow-loginCardBoxShadow box-border pt-[30px] pb-[33px] px-[55px]">
                        <h1 className="text-[30px] text-center text-loginTitleColor leading-10">Bem vindo ao Planner Bíblico!</h1>
                        <figure className="m-auto">
                            <Image className="aspect-square object-contain" width={90} height={90} src={Logo} alt="Logo do Planner Bíblico, ícone azul roxo de um livro virando as páginas com sua capa cor salmão." />
                        </figure>
                        <form onSubmit={handleSubmit(loginSubmitHandler)} noValidate className="flex flex-col gap-3 w-full">
                            <section className="flex flex-col relative">
                                {/* Top error message */}
                                <span className={isSubmitSuccessful ? `whitespace-nowrap absolute -top-[30px] text-red-600` : 'hidden'}>{errorMsg}</span>
                                <label className={`absolute left-[4px] w-fit text-loginInputPlaceholderColor text-[15px] transition-all ${emailAnimation ? '-top-[10px]' : 'top-[10px]'} `} htmlFor="email">Email</label>
                                <input
                                    tabIndex={1}
                                    type="email"
                                    id="email"
                                    {...register("email", { required: true })}
                                    onFocus={e => focusHandler(e)}
                                    onBlur={e => blurHandler(e)}
                                    className={`w-full text-loginTitleColor h-11 ${emailAnimation ? 'bg-loginInputBgColor' : 'bg-transparent'} px-2 border-b-[2px] border-[#adadad] focus:outline-0`}
                                />
                                <div className={`absolute h-[2px] w-full bg-gradient-to-r from-pink-500 to-indigo-500 bottom-[30px] transition origin-left duration-700 translate-x-0 ${emailAnimation ? 'block' : 'hidden'}`} />
                                <span className="w-full min-h-fit h-[30px] text-red-600">{errors.email?.message}</span>
                            </section >
                            <section className="flex flex-col relative">
                                <label className={`absolute left-[4px] w-fit text-loginInputPlaceholderColor text-[15px] transition-all ${passAnimation ? '-top-[10px]' : 'top-[10px]'} `} htmlFor="password">Pasword</label>
                                <input
                                    tabIndex={2}
                                    autoComplete="current-passord"
                                    type={!seePass ? 'password' : 'text'}
                                    id="password"
                                    {...register("password", { required: true })}
                                    onFocus={(e) => focusHandler(e)}
                                    onBlur={e => blurHandler(e)}
                                    className={`w-full text-loginTitleColor h-11 ${passAnimation ? 'bg-loginInputBgColor' : 'bg-transparent'} px-2 border-b-[2px] border-[#adadad] focus:outline-0`}
                                />
                                <div className={`absolute h-[2px] w-full bg-gradient-to-r from-pink-500 to-indigo-500 bottom-[30px] transition origin-left duration-700 translate-x-0 ${passAnimation ? 'block' : 'hidden'}`} />
                                <span className="w-full min-h-fit h-[30px] text-red-600">{errors.password?.message}</span>
                                <button type="button" tabIndex={3} onClick={toggleSeePass} className="absolute right-2 bottom-10">
                                    {
                                        seePass ?
                                            <Eye className="text-loginInputPlaceholderColor" />
                                            :
                                            <EyeOffIcon className="text-loginInputPlaceholderColor" />
                                    }
                                </button>
                            </section>
                            <section className="flex flex-col">
                                {/* Modal forgot password*/}
                                <div className="pb-1">
                                    <button
                                        tabIndex={5}
                                        type="button"
                                        onClick={() => forgotPassword()}
                                        className="text-blue-700 text-[16px] hover:text-blue-400"
                                    >
                                        Esqueci a senha
                                    </button>
                                </div>
                                <button
                                    tabIndex={4}
                                    type="submit"
                                    disabled={isSubmitting || isLoading || isValidating}
                                    className={`${isSubmitting || isLoading || isValidating ? 'bg-gray-400' : 'bg-gradient-to-r from-pink-500 to-indigo-500'} text-[#fff] rounded-[10px] text-center h-[50px]`}
                                >
                                    LOGIN
                                </button>
                            </section>
                        </form>
                        <div>
                            <p className="text-loginInputPlaceholderColor text-[14px]">
                                Deseja comprar nosso planner?
                                <a tabIndex={6} className="text-blue-500" href="/registrar"> Clique aqui.</a>
                            </p>
                        </div>
                    </article>
                    {/* Login girl icon */}
                    <figure className="relative hidden lg:block w-[30%] isolate">
                        <Image className="aspect-square object-contain w-full" width={980} height={190} src={Casal} alt="Ícone de uma mulher de cabelos roxos e camisa amarela lendo a Bíblia de pernas cruzadas atrás de um aparente por do sol cor salmão em um abiente com folhas atrás da mesma." />
                        <Image className="absolute -z-10 -right-14 -bottom-[67px] w-full aspect-square object-contain" width={180} height={190} src={Fundo} alt="Ícone de uma mulher de cabelos roxos e camisa amarela lendo a Bíblia de pernas cruzadas atrás de um aparente por do sol cor salmão em um abiente com folhas atrás da mesma." />
                    </figure>
                </div >
            </section>
        </>
    )
}
