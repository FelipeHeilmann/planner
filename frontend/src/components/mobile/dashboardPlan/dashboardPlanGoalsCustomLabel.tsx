
export default function CustomizedLabel({ x, y, value }: any) {
    return (
        <text x={x} y={y} dy={-4} fill={"#6266f5"} fontWeight={600} fontSize={12} textAnchor="middle">
            {value}
        </text>
    );
}


