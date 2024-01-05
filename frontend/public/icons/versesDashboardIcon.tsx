export default function VersesDashboardIcon({ color = "#F3F6FD", width = 25 }: { color?: string, width?: number }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height="33" viewBox="0 0 30 33" fill="none">
            <g clipPath="url(#clip0_160_901)">
                <path d="M2.5 5.49038C2.50229 5.12927 2.63363 4.78365 2.86564 4.52817C3.09766 4.2727 3.41173 4.12788 3.74 4.125H26.26C26.945 4.125 27.5 4.73688 27.5 5.49038V27.5096C27.4977 27.8707 27.3664 28.2164 27.1344 28.4718C26.9023 28.7273 26.5883 28.8721 26.26 28.875H3.74C3.41102 28.8746 3.09562 28.7306 2.86311 28.4746C2.6306 28.2186 2.5 27.8715 2.5 27.5096V5.49038ZM13.75 6.875H5V26.125H13.75V6.875ZM16.25 6.875V26.125H25V6.875H16.25ZM17.5 9.625H23.75V12.375H17.5V9.625ZM17.5 13.75H23.75V16.5H17.5V13.75Z" fill={color} />
            </g>
            <defs>
                <clipPath id="clip0_160_901">
                    <rect width="30" height="33" fill="white" />
                </clipPath>
            </defs>
        </svg>
    )
}