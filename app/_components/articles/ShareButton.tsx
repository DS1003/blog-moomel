'use client';

import React, { useState } from 'react';
import Button from '@/app/_components/ui/Button';

interface ShareButtonProps {
    title: string;
    text: string;
    url?: string;
}

export default function ShareButton({ title, text, url }: ShareButtonProps) {
    const [isCopied, setIsCopied] = useState(false);

    const handleShare = async () => {
        const shareData = {
            title: title,
            text: text,
            url: url || window.location.href,
        };

        // Try Native Share API first (Mobile & supported browsers)
        if (navigator.share) {
            try {
                await navigator.share(shareData);
                return;
            } catch (err) {
                console.log('Error sharing:', err);
                // Fallback if user cancelled or error, continue to clipboard
            }
        }

        // Fallback: Copy to Clipboard (Modern)
        try {
            await navigator.clipboard.writeText(shareData.url);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
            return;
        } catch (err) {
            console.warn('Clipboard API failed:', err);
        }

        // Fallback: Legacy Copy (execCommand) for older browsers or non-secure contexts
        try {
            const textArea = document.createElement("textarea");
            textArea.value = shareData.url;

            // Avoid scrolling to bottom
            textArea.style.top = "0";
            textArea.style.left = "0";
            textArea.style.position = "fixed";
            textArea.style.opacity = "0";

            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);

            if (successful) {
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
                return;
            }
        } catch (legacyErr) {
            console.error('Legacy copy failed:', legacyErr);
        }

        // Final Fallback: Alert
        alert("Impossible de copier automatiquement. Voici le lien à copier : " + shareData.url);
    };

    return (
        <Button variant="secondary" size="sm" onClick={handleShare} className="min-w-[100px]">
            {isCopied ? 'Lien copié !' : 'Partager'}
        </Button>
    );
}
