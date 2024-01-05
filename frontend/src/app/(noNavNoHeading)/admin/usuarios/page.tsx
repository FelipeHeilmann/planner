export const dynamic = 'force-dynamic'

import Users from "@/components/admin/users/users";
import { axiosInstanceClient } from "@/libs/axiosAPICaller";
import { cookies } from "next/headers"


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

export default async function UsersRoute() {
    let users: TUser | null = null
    try {
        const { data } = await axiosInstanceClient.get('/admin/users', {
            headers: { Authorization: `Bearer ${cookies().get('token')?.value}` }
        })
        users = data
    }
    catch (err) {
        console.log("err", err)
    }

    return users &&
        (
            <Users users={users} />
        )
}