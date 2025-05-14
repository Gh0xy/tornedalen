// src/app/models/post.model.ts
export interface Post {
  id: string;  // ta fram för original
  subject: string;
  content: string;
  email: string;
  author: string;
  date: Date;
  replies?: Post[];
}

/* // kommmentera bort för original
export interface Post {
  // ID nu genereras automatiskt via auto increment. 
  subject: string;
  content: string;
  email: string;
  author: string;
  date: Date;
  replies?: Post[];
}*/