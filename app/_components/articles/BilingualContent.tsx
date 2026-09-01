'use client';

import React from 'react';
import { useLanguage } from '@/app/_components/providers/LanguageProvider';

interface BilingualTextProps {
    fr: string;
    en?: string | null;
}

export function BilingualText({ fr, en }: BilingualTextProps) {
    const { locale } = useLanguage();
    if (locale === 'en' && en && en.trim() !== '') {
        return <>{en}</>;
    }
    return <>{fr}</>;
}

interface BilingualHtmlProps {
    fr: string;
    en?: string | null;
    className?: string;
}

export function BilingualHtml({ fr, en, className }: BilingualHtmlProps) {
    const { locale } = useLanguage();
    const content = locale === 'en' && en && en.trim() !== '' ? en : fr;

    return (
        <div
            dangerouslySetInnerHTML={{ __html: content }}
            className={className}
        />
    );
}
