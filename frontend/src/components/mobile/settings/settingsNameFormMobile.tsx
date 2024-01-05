import { axiosInstanceClient } from "@/libs/axiosAPICaller"
import { FileEdit } from "lucide-react"
import { useState } from "react"
import Cookies from 'js-cookie'
export default function SettingsNameFormMobile({ userName }: { userName: string }) {
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
            <form onSubmit={handleNameSubmit} className="flex items-center relative pr-6">
                <input
                    tabIndex={2}
                    onChange={e => { setName(e.target.value) }}
                    value={name}
                    type="text" className=" border border-dashed bg-transparent p-2 text-sm text-white w-full"
                />
                <button
                    tabIndex={3}
                    className="absolute right-0"
                    type="submit"
                >
                    <FileEdit color="white" />
                </button>
            </form>
        </>
    )
}
