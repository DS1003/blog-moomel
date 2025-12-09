import React from "react";
import { motion } from "framer-motion";

interface UserXpBarProps {
  xp: number;
  level: number;
  nextLevelXp: number;
}

export default function UserXpBar({ xp, level, nextLevelXp }: UserXpBarProps) {
  const percent = Math.min((xp / nextLevelXp) * 100, 100);
  return (
    <div className="mb-4">
      <div className="flex justify-between text-xs mb-1">
        <span>Niveau {level}</span>
        <span>{xp} / {nextLevelXp} XP</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <motion.div
          className="bg-primary h-3 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: percent + "%" }}
          transition={{ duration: 0.7 }}
        />
      </div>
    </div>
  );
}
