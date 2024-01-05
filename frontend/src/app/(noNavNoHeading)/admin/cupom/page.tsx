export const dynamic = 'force-dynamic'
import Coupons from "@/components/admin/coupon/coupons";
import { axiosInstanceClient } from "@/libs/axiosAPICaller";
import { cookies } from "next/headers"
import { TCoupon } from "../../../../../types/coupon-types";


export default async function CouponRoute() {
    let coupons: TCoupon[] | null = null
    try {
        const { data } = await axiosInstanceClient.get('/coupons', {
            headers: { Authorization: `Bearer ${cookies().get("token")?.value}` }
        })
        coupons = data
    }
    catch (err) {
        console.log("Error", err)
    }

    return coupons &&
        (
            <Coupons coupons={coupons} />
        )
}