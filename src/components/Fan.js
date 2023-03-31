import { motion } from "framer-motion";
import React from "react";


const variants = {
    open: { pathLength: 1 },
    closed: { pathLength: 0 },
};

const Fan = ({ angle, cx, cy }) => {
    const radius = 50;
    const startAngle = 0;
    const endAngle = angle;
    const largeArcFlag = angle > 180 ? 1 : 0;
    const x1 = cx + radius * Math.cos((startAngle * Math.PI) / 180);
    const y1 = cy + radius * Math.sin((startAngle * Math.PI) / 180);
    const x2 = cx + radius * Math.cos((endAngle * Math.PI) / 180);
    const y2 = cy + radius * Math.sin((endAngle * Math.PI) / 180);

    return (
        <svg viewBox="0 0 100 100">
            <motion.path
                d={`M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                variants={variants}
                // initial="closed"
                // animate="open"
                transition={{ duration: 0.5 }}
                // stroke="black"
                // strokeWidth="1"
                fill="#e8bb5a"
            />
        </svg>
    );
};
export default Fan