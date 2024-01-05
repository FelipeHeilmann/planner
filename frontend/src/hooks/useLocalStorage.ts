export const useLocalStorage = (key: string) => {

    const setItem = (value: unknown) => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value))
        } catch (err) {
            console.log(err)
        }
    }

    const getItem = () => {
        try {
            const item = window.localStorage.getItem(key) as string
            return item ? JSON.parse(item) as unknown : undefined
        } catch (err) {
            console.log(err)
        }
    }

    const removeItem = () => {
        try {
            window.localStorage.removeItem(key)
        } catch (err) {
            console.log(err)
        }
    }

    return { setItem, getItem, removeItem }
}



