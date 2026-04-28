"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type Achievement } from "@/utils/achievements";
import Confetti from "react-confetti";
import useWindowSize from "@/hooks/use-window";
interface Props {
    achievement: Achievement | null;
    onClose: () => void;
}
export default function AchievementUnlocked({ achievement, onClose }: Props) {
    const { width, height } = useWindowSize();
    const [showConfetti, setShowConfetti] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowConfetti(false);
            onClose();
        }, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);
    if (!achievement) return null;
    return (
        <>
            {showConfetti && width && height && (
                <Confetti
                    width={width}
                    height={height}
                    numberOfPieces={200}
                    recycle={false}
                    gravity={0.2}
                />
            )}

            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0, rotate: -10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", damping: 15 }}
                        className="relative bg-white dark:bg-slate-900 rounded-3xl p-12 max-w-md w-full mx-4 text-center shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Glow effect */}
                        <div className="absolute inset-0 rounded-3xl bg-linear-to-r from-yellow-400 via-orange-400 to-red-400 opacity-20 blur-2xl" />

                        <div className="relative">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring" }}
                                className="text-6xl mb-4"
                            >
                                {achievement.icon}
                            </motion.div>

                            <p className="text-sm font-semibold text-orange-500 uppercase tracking-wider mb-2">
                                Achievement Unlocked!
                            </p>

                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                                {achievement.name}
                            </h2>

                            <p className="text-slate-600 dark:text-slate-400">
                                {achievement.description}
                            </p>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onClose}
                                className="mt-8 px-8 py-3 bg-linear-to-r from-orange-500 to-red-500 text-white rounded-full font-semibold"
                            >
                                Awesome!
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </>
    );
}