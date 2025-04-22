// src/app/services/post.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = []; // Lokalt minne för inlägg

  constructor() {
    // Försök att hämta tidigare sparade inlägg från localStorage vid laddning
    const storedPosts = localStorage.getItem('posts');
    if (storedPosts) {
      this.posts = JSON.parse(storedPosts);
    }
  }

  // Hämtar alla inlägg
  getPosts(): Observable<Post[]> {
    return of(this.posts); // Returnera som Observable
  }

  // Lägger till ett nytt inlägg
  addPost(post: Post): Observable<Post> {
    this.posts.unshift(post); // Lägg till nyaste inlägget först
    localStorage.setItem('posts', JSON.stringify(this.posts)); // Spara i localStorage
    return of(post); // Returnera det nya inlägget
  }
}