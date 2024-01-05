import { components } from 'react-select'

const NoOptionsMessage = (props: any) => {
    return (
        <>
            <components.NoOptionsMessage {...props}>
                <span>Sem Opções</span>
            </components.NoOptionsMessage>
        </>
    )
}

export { NoOptionsMessage }
