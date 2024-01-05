import FetchUserInfo from "@/api/fetchUserInfo";
import DashboardPlanNavClient from "./dashboardPlanNavClient";
import DashboardPlanNavToggleSection from "./dashboardPlanNavToggleNavSection";
import { FetchReadingPlan, FetchReadingPlanReadings, FetchReadingPlans } from "@/api/fetchReadings";

export default async function DashboardPlanNav({ readingsPlanId }: { readingsPlanId: string }) {

    const { theme } = await FetchUserInfo()

    const plan = await FetchReadingPlan(readingsPlanId)
    const planArr = await FetchReadingPlans()
    const readings = await FetchReadingPlanReadings(readingsPlanId)

    return plan && planArr && readings && (
        <>
            {theme && readingsPlanId &&
                <header className="lg:hidden fixed top-0 z-50">
                    <section className="w-screen min-w-iphoneSEWidth py-4 px-2 bg-white flex justify-between items-center">
                        <h1 className="text-xl text-weirdBlack font-semibold pl-[10px]">Dashboard Plano</h1>
                        <div className="w-1/3">
                            {planArr && plan && readings &&
                                <DashboardPlanNavClient theme={theme} planArr={planArr} planInfo={plan} />
                            }
                        </div>
                    </section>
                    <nav className="w-screen min-w-iphoneSEWidth px-4 bg-white overflow-x-hidden">
                        {readingsPlanId && <DashboardPlanNavToggleSection theme={theme} readingsPlanId={readingsPlanId} />}
                    </nav>
                </header >
            }

        </>
    )
}

