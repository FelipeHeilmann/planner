import Image from "next/image";
import Logo from "../../../public/assets/logo-planner.png"

export default function Loading() {
    return (
        <>
            <section className="hidden lg:flex relative animate-pulse w-full mx-2 overflow-hidden items-center bg-white rounded-lg p-2">
                <Image
                    src={Logo}
                    alt="Logo do Planner Bíblico"
                    width={150}
                    height={150}
                    className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 "
                />
            </section>
            <div className="block lg:hidden">
                <section className="w-screen h-screen relative animate-pulse">
                    <Image
                        src={Logo}
                        alt="Logo do Planner Bíblico"
                        width={100}
                        height={100}
                        className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 "
                    />
                </section>
            </div>
        </>
    )
}
