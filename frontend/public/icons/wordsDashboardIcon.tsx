export default function WordsDashboardIcon({ color = "#F3F6FD", width = 25 }: { color?: string, width?: number }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="18" viewBox="0 0 15 18" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M13.4675 14.4834V3.24723C13.4675 2.00612 12.5372 1 11.3896 1H3.07792C1.93032 1 1 2.00612 1 3.24723V14.4834C1 15.7245 1.93032 16.7306 3.07792 16.7306H11.3896C12.5372 16.7306 13.4675 15.7245 13.4675 14.4834Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4.11719 6.61865H9.31199" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4.11719 8.86609H10.351" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4.11719 11.1135H7.23407" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}