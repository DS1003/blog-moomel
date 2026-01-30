'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2 } from 'lucide-react';

interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
    loading?: boolean;
}

export default function DeleteModal({
    isOpen,
    onClose,
    onConfirm,
    title = "Confirmer la suppression",
    description = "Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.",
    loading = false
}: DeleteModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-neutral-900/40 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-sm bg-white rounded-[2rem] p-6 shadow-2xl border border-neutral-100 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                        <div className="flex flex-col items-center text-center gap-4 relative z-10">
                            <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mb-2 shadow-inner ring-4 ring-white">
                                <Trash2 size={32} strokeWidth={1.5} />
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-xl font-serif font-bold text-neutral-900">{title}</h3>
                                <p className="text-sm text-neutral-500 font-medium leading-relaxed text-balance">
                                    {description}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-3 w-full mt-6">
                                <button
                                    onClick={onClose}
                                    disabled={loading}
                                    className="w-full py-3.5 rounded-xl border border-neutral-200 text-neutral-600 font-bold text-xs uppercase tracking-widest hover:bg-neutral-50 transition-colors"
                                >
                                    Annuler
                                </button>
                                <button
                                    onClick={onConfirm}
                                    disabled={loading}
                                    className="w-full py-3.5 rounded-xl bg-red-500 text-white font-bold text-xs uppercase tracking-widest hover:bg-red-600 shadow-lg shadow-red-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            <span>Supprimer</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
