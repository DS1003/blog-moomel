import React, { useState } from "react";

interface CommentFormProps {
  onSubmit: (content: string) => void;
}

export default function CommentForm({ onSubmit }: CommentFormProps) {
  const [content, setContent] = useState("");
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (content.trim()) {
          onSubmit(content);
          setContent("");
        }
      }}
      className="flex gap-2 mt-2"
    >
      <input
        type="text"
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Ajouter un commentaire..."
        className="flex-1 border rounded px-3 py-2"
      />
      <button type="submit" className="bg-primary text-white px-4 py-2 rounded">Envoyer</button>
    </form>
  );
}
