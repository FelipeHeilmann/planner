import ResetPassword from "@/components/resetPassword";

export default function ResetPasswordRout({ params }: { params: { token: string } }) {
    const { token } = params
    return (
        <>
            <ResetPassword token={token} />
        </>
    )
}