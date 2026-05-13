"use client";

import dynamic from "next/dynamic";

const ChartCard = dynamic(() => import("./ChartCard"), { ssr: false });

export default ChartCard;
