"use client"
import { ExclamationCircleFilled } from '@ant-design/icons'
import { axiosInstanceClient } from "@/libs/axiosAPICaller";
import Cookies from "js-cookie"
import { toast, Toaster } from "react-hot-toast"
import { useRouter } from "next/navigation";
import { timestampToUser } from "@/utils/dateParser";

type TUser = {
    id: string,
    name: string,
    email: string,
    createdAt: string,
    isActive: boolean,
    accessDuration: number,
    isAdmin: boolean,
    disabledAt: string | null,
    lastLoginAt: string | null,
    birthDate: string | null,
    gender: string
    isAffiliate: boolean
}[]


export default function Users({ users }: { users: TUser }) {
    const router = useRouter()
    const handleDelete = async (id: string) => {
        await axiosInstanceClient.patch(`/admin/users/${id}/disable`, {
            headers: { Authorization: `Bearer ${Cookies.get('token')}` }
        })
        router.refresh()
    }

    const handleChangePassword = async (id: string) => {
        try {
            await axiosInstanceClient.patch(`/admin/users/${id}`, {}, {
                headers: { Authorization: `Bearer ${Cookies.get('token')}` }
            })
            toast.success("Senha alterada com sucesso!")
        }
        catch (err) {
            console.log("error", err)
        }
    }

    const handleMakeAffiliate = async (id: string) => {
        try {
            await axiosInstanceClient.patch(`/admin/users/${id}/affiliate`, {}, {
                headers: { Authorization: `Bearer ${Cookies.get('token')}` }
            })
            router.refresh()
        }
        catch (err) {
            console.log("error", err)
        }
    }

    const showDeleteModal = async (event: any, id: string) => {
        event.stopPropagation()
        const { Modal } = await (import('antd'))
        Modal.confirm({
            title: 'Deseja mesmo excluir essa usuário?',
            icon: <ExclamationCircleFilled />,
            content: 'Dados como: orações, leituras, memorizações serão apagados',
            okText: 'Sim',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk() {
                handleDelete(id);
            },
            onCancel() {
            },

        })
    }
    const showChangePassword = async (event: any, id: string) => {
        event.stopPropagation()
        const { Modal } = await (import('antd'))
        Modal.confirm({
            title: 'Deseja mesmo mudar a senha deste usuário?',
            icon: <ExclamationCircleFilled />,
            content: 'A senha será alterada para: mudar123',
            okText: 'Sim',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk() {
                handleChangePassword(id);
            },
            onCancel() {
            },

        })
    }
    const showAffiliateModal = async (event: any, id: string) => {
        event.stopPropagation()
        const { Modal } = await (import("antd"))
        Modal.confirm({
            title: 'Deseja mesmo tonar esse usuário afiliado?',
            icon: <ExclamationCircleFilled />,
            okText: 'Sim',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk() {
                handleMakeAffiliate(id);
            },
            onCancel() {
            },

        })
    }


    return (
        <>
            <div><Toaster /></div>
            <main className="w-full h-[85vh] flex justify-center">
                <section className="w-11/12  flex flex-col rounded-xl bg-white h-full p-2 gap-2">
                    <h1 className="text-center font-semibold text-3xl">Usuários</h1>
                    <div className="w-full flex flex-col items-center gap-1 p-2">
                        <header className="w-full bg-slate-200 p-2 rounded-lg justify-evenly justify-items-center grid grid-cols-7">
                            <h4>Nome</h4>
                            <h4>Email</h4>
                            <h4>Admnistrador</h4>
                            <h4>Ativo</h4>
                            <h4>Data de cadastro</h4>
                            <h5>Afiliado</h5>
                            <h4>Ações</h4>
                        </header>
                        <div className='w-full h-[65vh] space-y-2 overflow-y-scroll'>
                            {users?.map(user =>
                                <div key={user.id} className="w-full border p-3 rounded-lg justify-evenly justify-items-center items-center grid grid-cols-7">
                                    <h4 className="text-md">{user.name.split(" ")[0]} {user.name.split(" ")[1]}</h4>
                                    <h4 className="text-md">{user.email}</h4>
                                    <h4 className="text-md">{user.isAdmin ? "Sim" : "Não"}</h4>
                                    <h4 className="text-md">{user.isActive ? "Ativo" : "Inativo"}</h4>
                                    <h4 className="text-md">{timestampToUser(user.createdAt)}</h4>
                                    <h4 className="text-md">{user.isAffiliate ? "Sim" : "Não"}</h4>
                                    <div className="flex gap-2">
                                        {user.isActive &&
                                            <>
                                                <button onClick={(event) => showDeleteModal(event, user.id)} className="p-1 border border-black rounded-lg transition-all duration-400 hover:bg-black hover:text-white text-sm">Excluir</button>
                                                <button onClick={(event) => showChangePassword(event, user.id)} className="p-1 border border-black rounded-lg transition-all duration-400 hover:bg-black hover:text-white text-sm">Mudar senha</button>
                                            </>
                                        }
                                        {
                                            user.isActive && !user.isAffiliate &&
                                            <>
                                                <button onClick={(event) => showAffiliateModal(event, user.id)} className="p-1 border border-black rounded-lg transition-all duration-400 hover:bg-black hover:text-white text-sm">Tornar afiliado</button>
                                            </>
                                        }
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
