import EditPrayerMobile from "@/components/mobile/prayer/prayerEditMobile";

export default async function EditPrayerRoute({ params }: { params: { oracaoId: string } }) {
    const { oracaoId } = params
    return (
        <EditPrayerMobile oracaoId={oracaoId} />
    )
}