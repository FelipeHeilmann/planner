import Link from "next/link"
import { ChevronRight } from 'lucide-react'

interface iconProps {
    icon: any
    text: string
    path: string
}

export default function MobileIcon({ icon, text, path }: iconProps) {
    return (
        <div className="w-full bg-white border-b-2 border-[#575353]">
            <Link href={`/${path}`} className="p-4 w-full flex items-center gap-2 justify-center">
                <div className="w-5/6 flex items-center gap-3">
                    {icon}
                    <p>{text}</p>
                </div>
                <ChevronRight />
            </Link>
        </div>
    )
}
