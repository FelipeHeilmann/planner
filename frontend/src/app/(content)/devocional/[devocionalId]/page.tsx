import DevotionalDetailMobile from "@/components/mobile/devotional/devotionalDetailMobile"

export default async function DevotionalDetailRoute({ params }: { params: { devocionalId: string } }) {
    const { devocionalId } = params
    return (
        <>
            <DevotionalDetailMobile devocionalId={devocionalId} />
        </>
    )
}
