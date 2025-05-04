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

   // Hämtar ett specifikt inlägg genom id (id är nu en sträng)
   getPostById(id: string): Observable<Post | undefined> {
    const post = this.posts.find(p => p.id === id); // Hitta inlägget baserat på id
    return of(post); // Returnera det hittade inlägget eller undefined
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

   // Lägg till ett svar på ett inlägg
   addReplyToPost(postId: string, reply: Post): Observable<Post> {
    return new Observable(observer => {
      try {
        const post = this.posts.find(p => p.id === postId); // Hitta posten baserat på id
        if (post) {
          // Lägg till svaret till postens replies-array
          post.replies = post.replies || [];
          post.replies.unshift(reply); // Lägg till svaret i början av listan
          localStorage.setItem('posts', JSON.stringify(this.posts)); // Spara i localStorage
          observer.next(post);
          observer.complete();
        } else {
          observer.error('Inlägget finns inte!');
        }
      } catch (error) {
        observer.error('Något gick fel vid sparandet av svaret!');
      }
    });
  }

  // Tar bort ett inlägg
  deletePost(postId: string): Observable<Post[]> {
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
