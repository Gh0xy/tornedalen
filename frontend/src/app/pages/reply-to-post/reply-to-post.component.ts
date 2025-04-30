import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router, RouterModule } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-reply-to-post',
  standalone: true,
  templateUrl: './reply-to-post.component.html',
  imports: [RouterModule, FormsModule, CommonModule],
  styleUrls: ['./reply-to-post.component.css']
})
export class ReplyToPostComponent implements OnInit {
  postId: string | null = null;
  postToReply: Post | undefined;  // Det inlägg som vi ska svara på
  replyContent: string = '';  // Innehållet för svaret
  posts: Post[] = [];  // Alla inlägg, för att hämta rätt inlägg

  // Form fields
  subject: string = '';
  author: string = '';
  email: string = '';
  content: string = '';

  // Paginering
  currentPage: number = 1;
  repliesPerPage: number = 5;
  totalReplies: number = 0;

  constructor(
    private route: ActivatedRoute, 
    private postService: PostService,  // PostService för att hantera data
    languageService: LanguageService
  ) {} // Changed to public
  

  ngOnInit(): void {
    // Access the 'id' parameter from the URL (which will now be a string)
    this.postId = this.route.snapshot.paramMap.get('id');
    
    if (this.postId) {
      // Fetch the post with the given id from your service or local storage
      this.postService.getPostById(this.postId).subscribe(
        post => {
          if (post) {  // Kontrollera att post inte är undefined
            this.postToReply = post;
            this.totalReplies = post.replies ? post.replies.length : 0;
            this.loadReplies(); // Ladda kommentarer vid initialisering
          } else {
            console.error('Post not found');
          }
        },
        error => {
          console.error('Error fetching post:', error);
        }
      );
    } else {
      console.error('No post ID found');
    }
  }

  // Ladda om svaren (kommentarerna) för den aktuella sidan
  loadReplies() {
    if (this.postToReply) {
      const startIndex = (this.currentPage - 1) * this.repliesPerPage;
      const endIndex = startIndex + this.repliesPerPage;
      this.postToReply.replies = this.postToReply.replies || [];
      this.postToReply.replies = this.postToReply.replies
        .sort((a, b) => b.date.getTime() - a.date.getTime()) // Sortera kommentarer nyaste först
        .slice(startIndex, endIndex); // Visa endast kommentarer för den aktuella sidan
    }
  }

  // Hantera sidbyte
  onPageChange(page: number) {
    this.currentPage = page;
    this.loadReplies();
  }

  onRepliesPerPageChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.repliesPerPage = Number(target.value);  // Konvertera till ett tal
    this.currentPage = 1;  // Återställ till första sidan
    this.loadReplies(); // Ladda om inläggen med det nya antalet per sida
  }

  submitReply() {
    if (this.postToReply && this.replyContent && this.postId) {
      const replyPost: Post = {
        id: new Date().toISOString(), // Unique ID based on the timestamp
        subject: `Svar på: ${this.postToReply.subject}`,
        email: 'Anonym',
        content: this.replyContent,
        author: 'Författare',
        date: new Date(),
        replies: []  // Each reply doesn't need replies; we only add them to the main post
      };
  
      // Add the reply to the current post's replies array
      this.postToReply.replies = this.postToReply.replies || [];
      this.postToReply.replies.unshift(replyPost); // Add new reply at the beginning

      this.totalReplies = this.postToReply.replies.length;
      this.loadReplies(); // Uppdatera kommentarerna efter nytt svar
  
      // Save the updated post to the service (or localStorage)
      this.postService.addReplyToPost(this.postId, replyPost).subscribe(post => {
        this.replyContent = ''; // Clear the reply content after submission
        this.resetForm();
      });
      }
  }

resetForm() {
        this.subject = '';
        this.author = '';
        this.email = '';
        this.content = '';
      }  
}