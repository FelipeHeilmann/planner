import { axiosInstanceClient } from "@/libs/axiosAPICaller";
import { Camera, User } from "lucide-react";
import Image from "next/image";
import Cookies from "js-cookie"

export default function SettingsImageFormMobile({ img }: { img: string }) {
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
            <form noValidate className="w-full flex flex-col items-center gap-4">
                <div className="relative">
                    {img === '/NoImage' ?
                        <User className='w-[80px] h-[80px] object-cover rounded-full shadow-xl' />
                        :
                        <Image src={img} alt="Imagem do Usuário" width={80} height={80} className='w-[80px] aspect-square object-cover rounded-full shadow-lg' />
                    }
                    <div className="flex items-center justify-center absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full">
                        <Camera width={25} />
                        <input
                            onChange={(event) => handleChange(event)}
                            type="file" id="file" name="image"
                            className="absolute z-10 w-full opacity-0"
                        />
                    </div>
                </div>
            </form>
        </>
    )
}
