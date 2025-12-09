import React from "react";

interface Comment {
  id: string;
  content: string;
  author: { name: string };
  createdAt: string;
}

interface CommentListProps {
  comments: Comment[];
}

export default function CommentList({ comments }: CommentListProps) {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="bg-gray-50 rounded p-3">
          <div className="text-sm text-gray-700 mb-1">{comment.author?.name || "Anonyme"}</div>
          <div className="text-gray-900 mb-1">{comment.content}</div>
          <div className="text-xs text-gray-400">{new Date(comment.createdAt).toLocaleString()}</div>
        </div>
      ))}
    </div>
  );
}
