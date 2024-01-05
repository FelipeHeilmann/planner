export const EnumsUrlPath = (tokenForUserId?: string) => {
    return {
        Test: '/api' as const,
        Register: '/register' as const,
        Auth: '/auth' as const,
        UserInfo: '/users/info' as const,
        ToggleTheme: '/theme' as const,
        UserCountData: '/users/count/data' as const,
        ChangeUserName: '/users/name' as const,
        ForgotPassword: '/forget-password' as const,
        ResetPassword: `reset-password/${tokenForUserId}` as const,
        ChangeUserPassword: '/users/password' as const,
        ChangeUserIcon: '/users/icon' as const,
        ListDevotionals: '/devotionals' as const,
        ListDevotionalById: `/devotionals/${tokenForUserId}` as const,
        CreateDevotional: '/devotionals' as const,
        EditDevotional: `/devotionals/${tokenForUserId}` as const,
        DeleteDevotional: `/devotionals/${tokenForUserId}` as const,
        ListPrayers: '/prayers' as const,
        ListPrayerById: `/prayers/${tokenForUserId}` as const,
        CreatePrayer: '/prayers' as const,
        EditPrayer: `/prayers/${tokenForUserId}` as const,
        DeletePrayer: `/prayers/${tokenForUserId}` as const,
        AddPrayerDate: `/prayers/${tokenForUserId}` as const,
        ListMemorizations: '/memorizations' as const,
        ListMemorizationById: `/memorizations/${tokenForUserId}` as const,
        AddMemorization: '/memorizations' as const,
        EditMemorization: `/memorizations/${tokenForUserId}` as const,
        DeleteMemorization: `/memorizations/${tokenForUserId}` as const,
        AddMemorizationDate: `/memorizations/${tokenForUserId}` as const,
        ListReadings: '/readings' as const,
        ListReadingById: `/readings/${tokenForUserId}` as const,
        AddReading: '/readings' as const,
        EditReadings: '/readings' as const,
        DeleteReadings: `/readings/${tokenForUserId}` as const,
        ListPlans: '/plans' as const,
        ListPlanById: `/plans/${tokenForUserId}` as const,
        ListReadingsOfPlan: `/plans/${tokenForUserId}/readings` as const,
        AddPlan: '/plans' as const,
        EditPlan: `/plans/${tokenForUserId}` as const,
        DeletePlan: `/plans/${tokenForUserId}` as const,
        IncreaseDayInGoalsPlan: '/plans/id/goal/increment' as const,
        DecreaseDayInGoalsPlan: '/plans/id/goal/decrement' as const,
        // BookChapters: `/books/chapters?name=${}` as const,
        // BookVerses: `/books/verses?name=${}chapter=${}` as const,
        // ListUsersAsAdmin : '/admin/users' as const,
        // ChangeUserPasswordAsAdmin : `/admin/users/${tokenForUserId}` as const,
        // DeleteUserAsAdmin : `/admin/users/${tokenForUserId}` as const,
    }
}


export enum EDashboardPlanPath {
    Default = '/dashboard-plano',
    Performance = `${Default}`,
    Goals = `${Default}/metas`,
    Status = `${Default}/status`,
}

export enum EScorePath {
    Default = '/pontuacao',
    Ranking = `${Default}/ranking`,
    NextLevel = `${Default}/nivel`
}

export enum EDashboardGeneralPath {
    Default = '/dashboard-geral',
    Detail = `${Default}/detalhe`
}
