'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/app/_components/ui/Button';

export default function NewArticlePage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        imageUrl: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch('/api/articles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: formData.title,
                    excerpt: formData.excerpt,
                    content: formData.content,
                    authorId: 'admin-id-placeholder', // TODO: Get from session
                    images: formData.imageUrl ? [formData.imageUrl] : [],
                }),
            });

            if (!res.ok) throw new Error('Erreur lors de la création');

            router.push('/admin');
        } catch (error) {
            console.error(error);
            alert('Erreur lors de la création de l\'article');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-neutral-50">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-neutral-800 mb-8">Nouvel Article</h1>

                <div className="card p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-neutral-700">
                                Titre
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 px-4 py-2 border"
                            />
                        </div>

                        <div>
                            <label htmlFor="imageUrl" className="block text-sm font-medium text-neutral-700">
                                URL de l'image principale
                            </label>
                            <input
                                type="url"
                                id="imageUrl"
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 px-4 py-2 border"
                                placeholder="https://..."
                            />
                        </div>

                        <div>
                            <label htmlFor="excerpt" className="block text-sm font-medium text-neutral-700">
                                Extrait
                            </label>
                            <textarea
                                id="excerpt"
                                name="excerpt"
                                rows={3}
                                required
                                value={formData.excerpt}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 px-4 py-2 border"
                            />
                        </div>

                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-neutral-700">
                                Contenu
                            </label>
                            <textarea
                                id="content"
                                name="content"
                                rows={10}
                                required
                                value={formData.content}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 px-4 py-2 border"
                            />
                        </div>

                        <div className="flex justify-end space-x-4">
                            <Button
                                variant="secondary"
                                onClick={() => router.back()}
                                type="button"
                            >
                                Annuler
                            </Button>
                            <Button
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Création...' : 'Créer l\'article'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
