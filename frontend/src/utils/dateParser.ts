export const timestampToInput = (date: string) => {
    // JS makes my life dumber as the days go by,
    // explanation: new Date('YYYY-mm-dd') makes date obj one day ago,
    // why? I don't know, but please let me out of my misery
    const passedYear = `${date[0]}${date[1]}${date[2]}${date[3]}`
    const passedMonth = `${date[5]}${date[6]}`
    const passedDay = `${date[8]}${date[9]}`
    return `${passedYear}-${passedMonth}-${passedDay}`
}

export const timestampToUserWithFullYear = (date: string) => {
    const passedDate = new Date(date)
    const passedYear = String(passedDate.getFullYear())
    const passedMonth = String(passedDate.getMonth() + 1).padStart(2, '0')
    const passedDay = String(passedDate.getDate()).padStart(2, '0')
    return `${passedDay}-${passedMonth}-${passedYear}`
}


export const timestampToUser = (date: string) => {
    const passedDate = new Date(date)
    const passedYear = String(passedDate.getFullYear()).slice(2)
    const passedMonth = String(passedDate.getMonth() + 1).padStart(2, '0')
    const passedDay = String(passedDate.getDate()).padStart(2, '0')
    return `${passedDay}-${passedMonth}-${passedYear}`
}

export const FormattedCurrentDate = () => {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0')
    const currentDay = String(currentDate.getDate()).padStart(2, '0')
    const formattedCurrentDate = `${currentYear}-${currentMonth}-${currentDay}`

    return {
        currentDate,
        currentYear,
        currentMonth,
        currentDay,
        formattedCurrentDate
    }
}
