// src/app/models/post.model.ts
export interface Post {
  id: string;  // Change id to string
  subject: string;
  content: string;
  email: string;
  author: string;
  date: Date;
  replies?: Post[];
}