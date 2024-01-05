"use client"
import { FileEdit } from "lucide-react";
import { useState } from "react";
import Cookies from 'js-cookie'
import { axiosInstanceClient } from "@/libs/axiosAPICaller";

export default function SettingsFormName({ userName }: { userName: string }) {
    const [name, setName] = useState(userName)

    const handleNameSubmit = async (event: any) => {
        event.preventDefault()
        if (name !== userName) {
            await axiosInstanceClient.patch('/users/update', {
                name
            }, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                }
            }).catch(err => console.error(err))

            window.location.reload()
        }
    }


    return (
        <>
            <form noValidate id="name-form" className="w-full flex flex-col items-center" onSubmit={(event) => handleNameSubmit(event)}>
                <div className="w-1/4 flex items-center justify-center relative">
                    <input type="text" placeholder="Nome" onChange={(e) => { setName(e.target.value) }} value={name} className="border border-dashed bg-transparent p-2 text-sm text-white w-full" />
                    <button type="submit" className="absolute right-2">
                        <FileEdit color="white" />
                    </button>
                </div>
            </form>
        </>
    )
}
