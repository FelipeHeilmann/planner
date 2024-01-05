import CouponDetail from "@/components/admin/coupon/couponDetail";
import { axiosInstanceClient } from "@/libs/axiosAPICaller";
import { cookies } from "next/headers";
import { TAffiliatePayment, TCoupon } from "../../../../../../types/coupon-types";

export default async function CouponDetailRoute({ params }: { params: { couponId: string } }) {
    const { couponId } = params
    let coupon: TCoupon | null = null
    let payments: TAffiliatePayment[] | null = null
    try {
        const { data: couponData } = await axiosInstanceClient.get(`/coupons/${couponId}`, {
            headers: { Authorization: `Bearer ${cookies().get("token")?.value}` }
        })
        const { data: paymentData } = await axiosInstanceClient.get(`/coupons/${couponId}/payments`, {
            headers: { Authorization: `Bearer ${cookies().get("token")?.value}` }
        })

        coupon = couponData
        payments = paymentData
    }
    catch (err) {
        console.log("Error", err)
    }

    const valueTotalToPay = coupon ? coupon.usesCoupon.reduce((acc, curr) => acc + curr.total, 0) / 100 : 0
    const valueAlreadyPayed = payments ? payments.reduce((acc, curr) => acc + curr.value, 0) : 0
    const valueToPayToAffiliate = valueTotalToPay && coupon?.percentageToAffiliate ? (valueTotalToPay * (coupon.percentageToAffiliate / 100)) : 0
    const valueRemainingToPay = valueToPayToAffiliate && valueAlreadyPayed ? valueToPayToAffiliate - valueAlreadyPayed : 0

    const valueAlreadyPayedFormated = valueAlreadyPayed.toFixed(2).replace('.', ',')
    const valueToPayToAffiliateFormated = valueToPayToAffiliate.toFixed(2).replace('.', ",")
    const valueRemainingToPayFormtaed = valueRemainingToPay.toFixed(2).replace('.', ',')

    return (
        <>
            <CouponDetail valueRemainingToPay={valueRemainingToPayFormtaed} valueAlreadyPayed={valueAlreadyPayedFormated} valueTotalToPay={valueToPayToAffiliateFormated} payments={payments} coupon={coupon} couponId={couponId} />
        </>
    )
}
