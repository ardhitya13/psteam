"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface DashboardCardProps {
    title: string;
    value: number;
    color: string;
    icon: React.ReactNode;
    path?: string;
    showProgress?: boolean;
    percent?: number;
}

export default function DashboardCard({
    title,
    value,
    color,
    icon,
    path,
    showProgress = false,
    percent = 0,
}: DashboardCardProps) {
    const router = useRouter();

    return (
        <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={() => path && router.push(path)}
            className="cursor-pointer bg-white border border-gray-200 rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition-transform duration-200 ease-out"
        >

            {/* Header Card */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-gray-800 font-semibold text-base">{title}</h2>
                {icon}
            </div>

            {/* Nilai & Progress */}
            <p className="text-3xl font-bold text-gray-900">{value}</p>

            {showProgress && (
                <div className="mt-3">
                    <div className="flex justify-between mb-1 text-xs text-gray-500">
                        <span>{percent}%</span>
                        <span>Selesai</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <motion.div
                            className={`h-2.5 rounded-full ${color}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${percent}%` }}
                            transition={{ duration: 1 }}
                        />
                    </div>
                </div>
            )}
        </motion.div>
    );
}
