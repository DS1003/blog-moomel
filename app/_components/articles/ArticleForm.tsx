import React, { useState } from "react";
import { z } from "zod";

const articleSchema = z.object({
  title: z.string().min(3),
  excerpt: z.string().min(10),
  content: z.string().min(20),
  images: z.array(z.string().url()).optional(),
});

interface ArticleFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
}

export default function ArticleForm({ onSubmit, initialData }: ArticleFormProps) {
  const [form, setForm] = useState({
    title: initialData?.title || "",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "",
    images: initialData?.images?.map((img: any) => img.url) || [""],
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, idx?: number) => {
    if (e.target.name === "images" && typeof idx === "number") {
      const imgs = [...form.images];
      imgs[idx] = e.target.value;
      setForm({ ...form, images: imgs });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleAddImage = () => setForm({ ...form, images: [...form.images, ""] });
  const handleRemoveImage = (idx: number) => setForm({ ...form, images: form.images.filter((_: string, i: number) => i !== idx) });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parse = articleSchema.safeParse(form);
    if (!parse.success) {
      setError("Veuillez remplir tous les champs correctement.");
      return;
    }
    setError(null);
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow mb-6">
      <div>
        <label className="block font-semibold mb-1">Titre</label>
        <input name="title" value={form.title} onChange={handleChange} className="w-full border rounded px-3 py-2" />
      </div>
      <div>
        <label className="block font-semibold mb-1">Extrait</label>
        <input name="excerpt" value={form.excerpt} onChange={handleChange} className="w-full border rounded px-3 py-2" />
      </div>
      <div>
        <label className="block font-semibold mb-1">Contenu</label>
        <textarea name="content" value={form.content} onChange={handleChange} className="w-full border rounded px-3 py-2 min-h-[100px]" />
      </div>
      <div>
        <label className="block font-semibold mb-1">Images (URL)</label>
        {form.images.map((img: string, i: number) => (
          <div key={i} className="flex gap-2 mb-2">
            <input name="images" value={img} onChange={e => handleChange(e, i)} className="flex-1 border rounded px-3 py-2" />
            {form.images.length > 1 && (
              <button type="button" onClick={() => handleRemoveImage(i)} className="text-red-500">Supprimer</button>
            )}
          </div>
        ))}
        <button type="button" onClick={handleAddImage} className="text-blue-500">Ajouter une image</button>
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button type="submit" className="bg-primary text-white px-4 py-2 rounded">{initialData ? "Mettre à jour" : "Créer"} l'article</button>
    </form>
  );
}
