import React from 'react';
import Image from 'next/image';
import XPProgress from './XPProgress';
import Badge from './Badge';

interface UserProfile {
    name: string;
    image?: string | null;
    level: number;
    xp: number;
    badges: Array<{
        id: string;
        name: string;
        icon: string;
        description: string;
    }>;
}

interface ProfileCardProps {
    user: UserProfile;
    className?: string;
}

export default function ProfileCard({ user, className = '' }: ProfileCardProps) {
    // Simple logic for next level XP (can be more complex)
    const nextLevelXP = user.level * 1000;

    return (
        <div className={`card p-6 ${className}`}>
            <div className="flex flex-col items-center text-center">
                <div className="relative w-24 h-24 mb-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full animate-pulse blur-sm opacity-50"></div>
                    <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-lg">
                        {user.image ? (
                            <Image
                                src={user.image}
                                alt={user.name}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-neutral-100 flex items-center justify-center text-3xl font-bold text-neutral-400">
                                {user.name[0]}
                            </div>
                        )}
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                        Lvl {user.level}
                    </div>
                </div>

                <h3 className="text-xl font-bold text-neutral-800 mb-1">{user.name}</h3>
                <p className="text-sm text-neutral-500 mb-6">Membre passionnée</p>

                <XPProgress
                    currentXP={user.xp}
                    nextLevelXP={nextLevelXP}
                    level={user.level}
                    className="mb-8"
                />

                <div className="w-full">
                    <h4 className="text-sm font-bold text-neutral-700 mb-4 text-left">Badges récents</h4>
                    <div className="flex flex-wrap justify-center gap-4">
                        {user.badges.length > 0 ? (
                            user.badges.map((badge) => (
                                <Badge
                                    key={badge.id}
                                    name={badge.name}
                                    icon={badge.icon}
                                    description={badge.description}
                                />
                            ))
                        ) : (
                            <p className="text-sm text-neutral-400 italic">Aucun badge pour le moment</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
