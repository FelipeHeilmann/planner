import FetchDevotionals from "@/api/fetchDevotional"
import DevotionalDesktopClient from "./devotionalDesktopClient"

export default async function DevotionalDesktop() {

    const devotionals = await FetchDevotionals()

    return devotionals && (
        <>
            <DevotionalDesktopClient devotionalsFromServer={devotionals} />
        </>
    )

}
