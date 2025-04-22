// src/app/models/post.model.ts
export interface Post {
    id: number;
    subject: string;
    author: string;
    email: string;
    content: string;
    date: Date;
  }