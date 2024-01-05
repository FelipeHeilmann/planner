import EditReadingPlanMobile from "@/components/mobile/reading/readingPlanEditMobile";

export default async function EditReadingPlanRoute({ params }: { params: { planoId: string } }) {
    const { planoId } = params
    return (
        <EditReadingPlanMobile planoId={planoId} />
    )
}