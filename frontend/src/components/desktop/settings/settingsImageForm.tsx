"use client"
import { Camera, User } from "lucide-react"
import Image from "next/image"
import Cookies from 'js-cookie'
import { axiosInstanceClient } from "@/libs/axiosAPICaller"

export default function SettingsImageForm({ img }: { img: string }) {
    const handleChange = async (event: any) => {
        if (event.target.files.length > 0) {
            const formData = {
                file: event.target.files[0]
            }
            await axiosInstanceClient.patch('/users/icon', formData, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                    "Content-Type": "multipart/form-data"
                }
            }).catch(err => console.error(err))
            window.location.reload()
        }
    }

    return (
        <>
            <form noValidate id="form-image" className="w-full p-3 flex flex-col items-center gap-4">
                <div className="relative">
                    {img === '/NoImage' ?
                        <User className='w-[112px] h-[112px] object-cover rounded-full shadow-xl' />
                        :
                        <Image src={img} width={112} height={112} alt="Imagem do usuário" className='w-28 aspect-square object-cover rounded-full shadow-lg' />
                    }
                    <div className="flex hover:cursor-pointer hover:bg-zinc-300 overflow-hidden items-center justify-center absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full">
                        <Camera width={30} className="cursor-pointer" />
                        <input className="absolute z-10 w-full opacity-0 cursor-pointer" type="file" id="file" name="image" onChange={(event) => handleChange(event)} />
                    </div>
                </div>
            </form>
        </>
    )
}
