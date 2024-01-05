"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function DashboardNavToggleNavSection({ readingsPlanId }: { readingsPlanId: string }) {

    const pathName = usePathname()

    return (
        <>
            <Link
                href={`/dashboard-plano/${readingsPlanId}/desempenho`}
                className={`${pathName.includes('/desempenho') ? 'text-mainBlue border-mainBlue' : 'text-weirdBlack border-weirdWhite'} text-lg uppercase tracking-wider border-b py-3 font-light`}
            >
                desempenho
            </Link>
            <Link
                href={`/dashboard-plano/${readingsPlanId}/metas`}
                className={`${pathName.includes('/metas') ? 'text-mainBlue border-mainBlue' : 'text-weirdBlack border-transparent'} text-lg uppercase tracking-wider border-b py-3 font-light`}
            >
                metas
            </Link>
            <Link
                href={`/dashboard-plano/${readingsPlanId}/status`}
                className={`${pathName.includes('/status') ? 'text-mainBlue border-mainBlue' : 'text-weirdBlack border-transparent'} text-lg uppercase tracking-wider border-b py-3 font-light`}
            >
                status
            </Link>
        </>
    )
}
