'use client';

import React from 'react';
import { useLanguage } from '@/app/_components/providers/LanguageProvider';
import LikeButton from '@/app/_components/articles/LikeButton';
import ShareButton from '@/app/_components/articles/ShareButton';

interface EngagementSectionProps {
    articleId: string;
    initialLikes: number;
    isLiked: boolean;
    title: string;
    excerpt: string;
}

export default function EngagementSection({ articleId, initialLikes, isLiked, title, excerpt }: EngagementSectionProps) {
    const { t } = useLanguage();

    return (
        <div className="mt-16 pt-8 border-t border-neutral-200">
            <h3 className="text-2xl font-bold text-neutral-800 mb-6">
                {t.article_page.engagement_title}
            </h3>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-primary-50 rounded-2xl p-6 border border-primary-100 gap-6">
                <div>
                    <p className="text-neutral-700 mb-2">
                        {t.article_page.engagement_xp} <span className="font-bold text-primary-600">{t.article_page.engagement_xp_points}</span> {t.article_page.engagement_xp_action}
                    </p>
                    <p className="text-sm text-neutral-500">
                        {t.article_page.engagement_login}
                    </p>
                </div>
                <div className="flex gap-4">
                    <LikeButton articleId={articleId} initialLikes={initialLikes} isLiked={isLiked} />
                    <ShareButton title={title} text={excerpt || "Découvrez cet article sur Moomel !"} />
                </div>
            </div>
        </div>
    );
}
