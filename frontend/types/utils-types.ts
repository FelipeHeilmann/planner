export type modalProps = {
    open: boolean
    onClose: () => void
    id?: string
}

export type CategoryCheck = {
    [key: string]: boolean
}