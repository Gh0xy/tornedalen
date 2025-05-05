import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  postToReply: Post | undefined;
  replyContent: string = '';
  posts: Post[] = [];

  // Form fields
  subject: string = '';
  author: string = '';
  email: string = '';
  content: string = '';

  // Pagination
  currentPage: number = 1;
  repliesPerPage: number = 5;
  totalReplies: number = 0;

  // Translations
  translations: Record<string, string> = {};

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    public languageService: LanguageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id');

    if (this.postId) {
      this.postService.getPostById(this.postId).subscribe(
        post => {
          if (post) {
            this.postToReply = post;
            this.totalReplies = post.replies ? post.replies.length : 0;
            this.loadReplies();
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

    // Update translations and subscribe to language changes
    this.updateTranslations();
    this.languageService.currentLanguage$.subscribe(() => {
      this.updateTranslations();
      this.cdr.detectChanges();
    });
  }

  loadReplies() {
    if (this.postToReply) {
      const startIndex = (this.currentPage - 1) * this.repliesPerPage;
      const endIndex = startIndex + this.repliesPerPage;
      this.postToReply.replies = this.postToReply.replies || [];
      this.postToReply.replies = this.postToReply.replies
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .slice(startIndex, endIndex);
    }
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadReplies();
  }

  onRepliesPerPageChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.repliesPerPage = Number(target.value);
    this.currentPage = 1;
    this.loadReplies();
  }

  submitReply() {
    if (this.postToReply && this.replyContent && this.postId) {
      const replyPost: Post = {
        id: new Date().toISOString(),
        subject: `Svar på: ${this.postToReply.subject}`,
        email: 'Anonym',
        content: this.replyContent,
        author: 'Författare',
        date: new Date(),
        replies: []
      };

      this.postToReply.replies = this.postToReply.replies || [];
      this.postToReply.replies.unshift(replyPost);

      this.totalReplies = this.postToReply.replies.length;
      this.loadReplies();

      this.postService.addReplyToPost(this.postId, replyPost).subscribe(post => {
        this.replyContent = '';
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

  updateTranslations() {
    const currentLanguage = this.languageService.getLanguage();
    const translations: Record<string, Record<string, string>> = {
      REPLY_TO_POST: {
        sv: 'Svara på inlägg',
        en: 'Reply to Post',
        fi: 'Vastaa viestiin',
        me: 'Vastaa viestiin',
        sa: 'Vástidit čállosa'
      },
      LEAVE_COMMENT: {
        sv: 'Lämna en kommentar',
        en: 'Leave a Comment',
        fi: 'Jätä kommentti',
        me: 'Jätä kommentti',
        sa: 'Čájeha kommentár'
      },
      SUBMIT_REPLY: {
        sv: 'Skicka svar',
        en: 'Submit Reply',
        fi: 'Lähetä vastaus',
        me: 'Lähetä vastaus',
        sa: 'Lähetä vastaus'
      },
      COMMENTS_SECTION: {
        sv: 'Kommentarer',
        en: 'Comments',
        fi: 'Kommentit',
        me: 'Kommentit',
        sa: 'Kommentárat'
      },
      SHOW: {
        sv: 'Visa',
        en: 'Show',
        fi: 'Näytä',
        me: 'Näytä',
        sa: 'Čájeha'
      },
      PREVIOUS: {
        sv: 'Föregående',
        en: 'Previous',
        fi: 'Edellinen',
        me: 'Edellinen',
        sa: 'Ovddit'
      },
      NEXT: {
        sv: 'Nästa',
        en: 'Next',
        fi: 'Seuraava',
        me: 'Seuraava',
        sa: 'Vástádus'
      },
      PAGE: {
        sv: 'Sida',
        en: 'Page',
        fi: 'Sivu',
        me: 'Sivu',
        sa: 'Siidu'
      },
      POST_NOT_FOUND: {
        sv: 'Inlägget hittades inte',
        en: 'Post not found',
        fi: 'Viestiä ei löytynyt',
        me: 'Viestiä ei löytynyt',
        sa: 'Čállosa ii gávdnan'
      },
      AUTHOR: {
        sv: 'Författare',
        en: 'Author',
        fi: 'Kirjoittaja',
        me: 'Kirjoittaja',
        sa: 'Čállit'
      },
      EMAIL: {
        sv: 'E-post',
        en: 'Email',
        fi: 'Sähköposti',
        me: 'Sähköposti',
        sa: 'E-poasta'
      },
      WRITE_REPLY: {
        sv: 'Skriv ett svar',
        en: 'Write a reply',
        fi: 'Kirjoita vastaus',
        me: 'Kirjoita vastaus',
        sa: 'Čállit vástádusa'
      }
    };

    // Update translations for the current language
    for (const key in translations) {
      this.translations[key] = translations[key][currentLanguage] || key;
    }
  }

  getTranslation(key: string): string {
    return this.translations[key] || key;
  }
}