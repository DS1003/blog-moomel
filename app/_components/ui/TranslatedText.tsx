'use client';

import React from 'react';
import { useLanguage } from '@/app/_components/providers/LanguageProvider';
import { Locale } from '@/app/_i18n/dictionaries';

type NestedKeyOf<ObjectType extends object> = 
    {[Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
        ? `${Key}.${NestedKeyOf<ObjectType[Key]>}`
        : `${Key}`
    }[keyof ObjectType & (string | number)];

interface TranslatedTextProps {
    path: string; // e.g. "article_page.error_title"
    fallback?: string;
}

export default function TranslatedText({ path, fallback }: TranslatedTextProps) {
    const { t } = useLanguage();
    
    const getNestedTranslation = (obj: any, path: string): string | undefined => {
        return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    };

    const translation = getNestedTranslation(t, path);

    return <>{translation || fallback}</>;
}
