import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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
      this.posts = JSON.parse(storedPosts).map((p: any) => ({
        ...p,
        date: new Date(p.date)   // sträng → Date‑objekt
      }));
    }
  }

  // Hämtar alla inlägg
  getPosts(): Observable<Post[]> {
    return of(this.posts); // Returnera som Observable
  }

  // Lägger till ett nytt inlägg
  addPost(post: Post): Observable<Post> {
    return new Observable(observer => {
      try {
        this.posts.unshift(post); // Lägg till nyaste inlägget först
        localStorage.setItem('posts', JSON.stringify(this.posts)); // Spara i localStorage
        observer.next(post);
        observer.complete();
      } catch (error) {
        observer.error('Något gick fel vid sparandet!');
      }
    });
  }

  // Tar bort ett inlägg
  deletePost(postId: number): Observable<Post[]> {
    return new Observable(observer => {
      try {
        this.posts = this.posts.filter(post => post.id !== postId); // Ta bort inlägg med matchande ID
        localStorage.setItem('posts', JSON.stringify(this.posts)); // Spara i localStorage
        observer.next(this.posts);
        observer.complete();
      } catch (error) {
        observer.error('Något gick fel vid radering!');
      }
    });
  }
}