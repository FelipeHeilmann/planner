import FetchUserInfo from "@/api/fetchUserInfo";
import SettingsDektopContent from "./settingsDesktopContent";

export default async function SettingsDektop() {
    const { imageUrl, name, birthDate, email, gender } = await FetchUserInfo()

    return imageUrl && (
        <SettingsDektopContent img={imageUrl} name={name} birthDate={birthDate} email={email} gender={gender} />
    )

}
