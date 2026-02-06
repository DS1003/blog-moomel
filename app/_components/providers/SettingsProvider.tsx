'use client';

import React, { createContext, useContext, ReactNode } from 'react';

interface SettingsContextType {
    site_name: string;
    site_description: string;
    primary_color: string;
    [key: string]: string;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

export function SettingsProvider({
    children,
    settings
}: {
    children: ReactNode;
    settings: Record<string, string>;
}) {
    const value = {
        site_name: settings.site_name || 'Trésor Moomel',
        site_description: settings.site_description || '',
        primary_color: settings.primary_color || '#B88636',
        ...settings
    };

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (!context) {
        // Return defaults if outside provider (or throw error, but defaults are safer for SSR/prerender)
        return {
            site_name: 'Trésor Moomel',
            site_description: '',
            primary_color: '#B88636',
        };
    }
    return context;
}
