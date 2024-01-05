import Script from "next/script";
import RegisterContent from "./registerContent";

export default function Register() {
    return (
        <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`} />
            <Script id="google-analytics">
                {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                
                        gtag('config', '${process.env.GOOGLE_ANALYTICS_ID}');
                    `}
            </Script>
            <RegisterContent />
        </>
    )
}