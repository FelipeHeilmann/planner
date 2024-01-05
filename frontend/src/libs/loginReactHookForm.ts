import { useForm } from "react-hook-form";
import { loginZodFormSchema, TloginCredentials } from "./loginZodFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";

function FormHook(){
     const hookForm = useForm<TloginCredentials>({
        resolver:zodResolver(loginZodFormSchema)
    })
    return hookForm
}

export function useFormHook(){
    return FormHook()
}

