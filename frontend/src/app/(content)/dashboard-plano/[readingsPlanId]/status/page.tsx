import DashboardPlanNav from "@/components/mobile/dashboardPlan/dashboardPlanNav";
import DashboardPlanStatus from "@/components/mobile/dashboardPlan/dashboardPlanStatus";

export default function DashboardPlanStatusRoute({ params }: { params: { readingsPlanId: string } }) {

    const { readingsPlanId } = params

    return (
        <>
            <DashboardPlanNav readingsPlanId={readingsPlanId} />
            <DashboardPlanStatus />
        </>
    )
}
