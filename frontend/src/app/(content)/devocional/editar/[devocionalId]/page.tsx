import DevotionalEditMobile from "@/components/mobile/devotional/devotionalEditMobile";
import NavbarMobile from "@/components/mobile/utils/navbarMobile";

export default async function EditDevotionalRoute({ params }: { params: { devocionalId: string } }) {
    const { devocionalId } = params
    return (
        <>
            <DevotionalEditMobile devocionalId={devocionalId} />
            <NavbarMobile />
        </>
    )
}
