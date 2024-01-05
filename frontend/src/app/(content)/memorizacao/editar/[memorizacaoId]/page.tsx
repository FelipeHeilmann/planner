import MemorizationEditMobile from "@/components/mobile/memorization/memorizationEditMobile";

export default function EditMemorizationRoute({ params }: { params: { memorizacaoId: string } }) {
    const { memorizacaoId } = params
    return (
        <>
            <MemorizationEditMobile memorizcaoId={memorizacaoId} />
        </>
    )
}