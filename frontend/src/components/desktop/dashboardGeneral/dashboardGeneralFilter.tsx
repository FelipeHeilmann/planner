"use client"

import { useState } from "react"

type filterCheck = {
    [key: string]: boolean
}
export default function DashboardGeneralFilter() {
    const [filter, selectFilter] = useState<filterCheck>({
        thirty: false,
        ninety: false,
        three: false,
        twelve: false,
        perso: false
    })

    const handleFilter = (event: any) => {
        const element = event.target.id
        const result = { ...filter }
        for (const key in result) {
            if (key !== element) {
                result[key] = false
            }
        }
        result[element] = !result[element]
        selectFilter(result)
    }

    return (
        <div className="flex p-2 gap-2 items-center">
            <button onClick={(e) => handleFilter(e)} className={`whitespace-nowrap rounded-3xl ${filter["thirty"] ? 'bg-mainBlue text-weirdWhite' : 'bg-weirdWhite'} p-4`} id="thirty">30 dias</button>
            <button onClick={(e) => handleFilter(e)} className={`whitespace-nowrap rounded-3xl ${filter["ninety"] ? 'bg-mainBlue text-weirdWhite' : 'bg-weirdWhite'} p-4`} id="ninety">90 dias</button>
            <button onClick={(e) => handleFilter(e)} className={`whitespace-nowrap rounded-3xl ${filter["three"] ? 'bg-mainBlue text-weirdWhite' : 'bg-weirdWhite'} p-4`} id="three">3 meses</button>
            <button onClick={(e) => handleFilter(e)} className={`whitespace-nowrap rounded-3xl ${filter["twelve"] ? 'bg-mainBlue text-weirdWhite' : 'bg-weirdWhite'} p-4`} id="twelve">12 meses</button>
            <button onClick={(e) => handleFilter(e)} className={`whitespace-nowrap rounded-3xl ${filter["perso"] ? 'bg-mainBlue text-weirdWhite' : 'bg-weirdWhite'} p-4`} id="perso">Personalizado</button>
        </div>
    )

}