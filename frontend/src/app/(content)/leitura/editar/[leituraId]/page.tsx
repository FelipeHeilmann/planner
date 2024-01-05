import EditReadingMobile from "@/components/mobile/reading/readingEditMobile";

export default async function EditReadingRoute({ params }: { params: { leituraId: string } }) {
    const { leituraId } = params

    return (
        <EditReadingMobile leituraId={leituraId} />
    )
}