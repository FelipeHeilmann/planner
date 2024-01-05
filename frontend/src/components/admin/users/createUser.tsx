"use client"
import { axiosInstanceClient } from "@/libs/axiosAPICaller"
import { TCreateUserFormZodFormSchema, createUserZodFormSchema } from "@/libs/createUserZodFormSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOffIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast, Toaster } from "react-hot-toast"

export default function CreateUser() {
    const router = useRouter()
    const [isAdmin, setIsAdmin] = useState(false)
    const [passAnimation, setPassAnimation] = useState(false)

    const [seePass, setSeePass] = useState(false)

    const { register, reset, handleSubmit, getValues, setValue, formState: { errors, isSubmitSuccessful, isSubmitting, isLoading } } = useForm<TCreateUserFormZodFormSchema>({ resolver: zodResolver(createUserZodFormSchema) })

    const focusHandler = (e: React.FocusEvent<HTMLInputElement>) => {
        setPassAnimation(true)
    }

    const handleSubmitCreateUser = async (data: TCreateUserFormZodFormSchema) => {
        try {
            const res = await axiosInstanceClient.post('/register', data)
            if (res.status === 201) {
                return toast.success("Usuário criado com sucesso")
            }
        } catch (err) {
            console.error(err)
        }
    }
    const blurHandler = (e: any) => {
        setPassAnimation(false)
    }

    const toggleSeePass = () => {
        if (!seePass) return setSeePass(true)
        setSeePass(false)
    }

    const toggleIsAdmin = (event: any) => {
        event.preventDefault()
        if (!isAdmin) {
            setValue("isAdmin", true)
            return setIsAdmin(true)
        }
        setIsAdmin(false)
        setValue("isAdmin", false)
    }

    useEffect(() => {
        router.refresh()
    }, [])


    return (
        <>
            <main className="w-full flex justify-center h-full">
                <div><Toaster /></div>
                <form onSubmit={handleSubmit(handleSubmitCreateUser)} className="w-5/6 lg:w-2/5 flex flex-col bg-mainBlue gap-3 mt-16 p-2 rounded-lg ">
                    <h1 className="text-center text-white text-2xl">Cadastro de usuários</h1>
                    <div className="w-full flex flex-col">
                        <label className="text-white text-lg" htmlFor="">Nome</label>
                        <input {...register("name", { required: true })} type="text" className={`w-full rounded-lg text-loginTitleColor h-11 bg-loginInputBgColor px-2 border-b-[2px] border-[#adadad] focus:outline-0`} />
                    </div>
                    <div className="w-full flex flex-col">
                        <label className="text-white text-lg" htmlFor="">Email</label>
                        <input {...register("email", { required: true })} type="text" className={`w-full rounded-lg text-loginTitleColor h-11 bg-loginInputBgColor px-2 border-b-[2px] border-[#adadad] focus:outline-0`} />
                    </div>
                    <div className="w-full flex flex-col relative">
                        <label className="text-white text-lg" htmlFor="">Senha</label>
                        <input
                            tabIndex={2}
                            autoComplete="current-passord"
                            type={!seePass ? 'password' : 'text'}
                            id="password"
                            {...register("password", { required: true })}
                            onFocus={(e) => focusHandler(e)}
                            onBlur={e => blurHandler(e)}
                            className={`w-full text-loginTitleColor h-11 bg-loginInputBgColor px-2 border-b-[2px] rounded-lg border-[#adadad] focus:outline-0`}
                        />
                        <button type="button" tabIndex={3} onClick={toggleSeePass} className="absolute right-2 bottom-2">
                            {
                                seePass ?
                                    <Eye className="text-loginInputPlaceholderColor" />
                                    :
                                    <EyeOffIcon className="text-loginInputPlaceholderColor" />
                            }
                        </button>
                    </div>
                    <div className="w-full flex p-2 relative">
                        <label className={`${isAdmin ? 'text-white' : 'text-zinc-600'} transition-all text-lg mr-4 left-16`} htmlFor="">Admin</label>
                        <div className={` ${!isAdmin && 'opacity-70'} relative w-14 h-7 bg-white rounded-3xl hover:cursor-pointer isolate`}>
                            <button onClick={(event) => toggleIsAdmin(event)} className="w-full h-full absolute rounded-3xl z-10  top-0 bottom-0 left-0 right-0" />
                            <div className={`transition-all absolute -z-10 cursor-pointer ${isAdmin ? 'translate-x-1 bg-green-700' : 'translate-x-8 bg-zinc-600'} top-1/2 -translate-y-1/2 rounded-full h-4/6 aspect-square`} />
                        </div>
                    </div>
                    <div className="w-full flex flex-col p-2">
                        <label className="text-white text-lg" htmlFor="">Duração de acesso</label>
                        <select {...register("accessDuration")} onChange={(e) => setValue("accessDuration", Number(e.target.value))} name="" className="rounded-lg p-2">
                            <option value="">Selecione uma duração</option>
                            <option value="6">6 meses</option>
                            <option value="1">1 ano</option>
                        </select>
                    </div>
                    <button
                        tabIndex={4}
                        type="submit"
                        disabled={isSubmitting || isLoading}
                        className={`${isSubmitting || isLoading ? 'bg-gray-400' : 'bg-gradient-to-r from-pink-500 to-indigo-500'} text-[#fff] rounded-[10px] text-center h-[50px]`}
                    >
                        Criar usuário
                    </button>
                </form>
            </main>
        </>
    )
}
