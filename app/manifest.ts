import type { Metadata, Viewport } from 'next'

export const viewport: Viewport = {
    themeColor: '#FFFFFF',
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
}

export default function Manifest() {
    return {
        name: 'Trésor Moomel',
        short_name: 'Moomel',
        description: 'Cosmétique Gamifiée et Beauté Naturelle',
        start_url: '/',
        display: 'standalone',
        background_color: '#FFFFFF',
        theme_color: '#FFFFFF',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    }
}
