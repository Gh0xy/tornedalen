// src/app/pages/discussion/discussion.component.ts
import { Component, OnInit } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';  // Importera PostService
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Importera CommonModule


@Component({
  selector: 'app-discussion',
  standalone: true,
  imports: [RouterModule,FormsModule],  // Kontrollera att FormsModule är importerat
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css']
})

export class DiscussionComponent implements OnInit {
  posts: Post[] = [];

  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
  
  // Formulärfält
  subject: string = '';
  author: string = '';
  email: string = '';
  content: string = '';

  constructor(
    private router: Router,
    private postService: PostService  // Injicera PostService
  ) {}

  ngOnInit() {
    // Hämta inlägg när komponenten laddas
    this.postService.getPosts().subscribe(posts => {
      // Sortera inläggen i kronologisk ordning (nyaste först)
      this.posts = posts.sort((a, b) => b.date.getTime() - a.date.getTime());
    });
  }

  createPost() {
    if (!this.subject || !this.author || !this.email || !this.content) {
      alert('Var vänlig fyll i alla obligatoriska fält!');
      return;
    }

    const newPost: Post = {
      id: Date.now(),
      subject: this.subject,
      author: this.author,
      email: this.email,
      content: this.content,
      date: new Date(),
    };
    
    this.closeModal(); // Stänger popup efter inlämning om du vill

    // Lägg till det nya inlägget via PostService
    this.postService.addPost(newPost).subscribe(post => {
      // Lägg till det nya inlägget i arrayen och visa det direkt
      this.posts.unshift(post); // Lägg till det nyaste inlägget först
      this.resetForm();
    });
  }

  resetForm() {
    this.subject = '';
    this.author = '';
    this.email = '';
    this.content = '';
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}