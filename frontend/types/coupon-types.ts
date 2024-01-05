export type TCoupon = {
    id: string,
    name: string,
    value: number,
    usesCoupon: TusesCoupon[],
    isValid: boolean,
    use: number,
    createdAt: string,
    dueAt: string | null
    affiliateName: string | null
    percentageToAffiliate: number | null
}

type TusesCoupon = {
    userId: string
    status: string
    total: number
    date: string | null
    userName: string | null
    userEmail: string | null
}


export type TAffiliatePayment = {
    id: string
    date: string
    value: number
    couponId: string
}