import React from "react";

interface UserProfileProps {
  name: string;
  avatar: string;
  xp: number;
  level: number;
  badges: { name: string; icon: string }[];
  articles: { id: string; title: string }[];
}

export default function UserProfile({ name, avatar, xp, level, badges, articles }: UserProfileProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-4 mb-4">
        <img src={avatar} alt={name} className="w-20 h-20 rounded-full object-cover border-2 border-primary" />
        <div>
          <h2 className="text-2xl font-bold">{name}</h2>
          <div className="text-sm text-gray-500">Niveau {level} • {xp} XP</div>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Badges</h3>
        <div className="flex gap-2">
          {badges.map((badge, i) => (
            <div key={i} className="flex flex-col items-center">
              <img src={badge.icon} alt={badge.name} className="w-8 h-8" />
              <span className="text-xs mt-1">{badge.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Articles enregistrés</h3>
        <ul className="list-disc pl-5">
          {articles.map((a) => (
            <li key={a.id}>{a.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
