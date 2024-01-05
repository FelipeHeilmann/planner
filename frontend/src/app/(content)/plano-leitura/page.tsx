export const dynamic = 'force-dynamic'
import ReadingPlanDesktop from "@/components/desktop/reading/readingPlanDesktop";
import ReadingPlanMobile from "@/components/mobile/reading/readingPlanMobile";

export default function ReadingPlanRoute() {
    return (
        <>
            <ReadingPlanMobile />
            <ReadingPlanDesktop />
        </>
    )
}
