import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-discussion',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css']
})
export class DiscussionComponent implements OnInit {
  posts: Post[] = [];

  // Form fields
  subject: string = '';
  author: string = '';
  email: string = '';
  content: string = '';

  // Pagination
  currentPage: number = 1;
  postsPerPage: number = 10;
  totalPosts: number = 0;

  // Modal state
  isModalOpen = false;

  // Translations
  translations: { [key in keyof typeof this.translationKeys]: string } = {} as any;

  // Translation keys
  private translationKeys = {
    DISCUSSION_TITLE: '',
    CREATE_POST: '',
    SUBJECT: '',
    AUTHOR: '',
    EMAIL: '',
    CONTENT: '',
    SUBMIT_POST: '',
    FILL_ALL_FIELDS: '',
    SHOW: '',
    PREVIOUS: '',
    NEXT: '',
    PAGE: '',
    EMPTY_MSG: ''
  };

  constructor(
    private router: Router,
    private postService: PostService,
    private languageService: LanguageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Fetch posts when the component loads
    this.loadPosts();

    // Update translations and subscribe to language changes
    this.updateTranslations();
    this.languageService.currentLanguage$.subscribe(() => {
      this.updateTranslations();
      this.cdr.detectChanges();
    });
  }

  loadPosts() {
    this.postService.getPosts().subscribe(posts => {
      this.totalPosts = posts.length; // Set total number of posts
      this.posts = posts
        .sort((a, b) => b.date.getTime() - a.date.getTime()) // Sort newest first
        .slice((this.currentPage - 1) * this.postsPerPage, this.currentPage * this.postsPerPage); // Paginate posts
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadPosts();
  }

  onPostsPerPageChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.postsPerPage = Number(target.value); // Convert to number
    this.currentPage = 1; // Reset to the first page
    this.loadPosts(); // Reload posts with the new posts per page
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  createPost() {
    if (!this.subject || !this.author || !this.email || !this.content) {
      alert(this.translations['FILL_ALL_FIELDS']); // Use bracket notation
      return;
    }

    const newPost: Post = {
      id: new Date().toISOString(), // Use ISO string for a unique, string-based ID
      subject: this.subject,
      author: this.author,
      email: this.email,
      content: this.content,
      date: new Date(),
    };

    this.closeModal();

    this.postService.addPost(newPost).subscribe(post => {
      this.posts.unshift(post);
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

  updateTranslations() {
    const currentLanguage = this.languageService.getLanguage();
    const translations: Record<keyof typeof this.translationKeys, Record<string, string>> = {
      DISCUSSION_TITLE: {
        sv: 'Inlägg',
        en: 'Posts',
        fi: 'Viestit',
        me: 'Viestit',
        sa: 'Čállosat'
      },
      CREATE_POST: {
        sv: 'Skapa nytt inlägg',
        en: 'Create a new post',
        fi: 'Luo uusi viesti',
        me: 'Luo uusi viesti',
        sa: 'Čájeha ođđa čállosa'
      },
      SUBJECT: {
        sv: 'Ämne',
        en: 'Subject',
        fi: 'Aihe',
        me: 'Aihe',
        sa: 'Ášši'
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
      CONTENT: {
        sv: 'Inlägg',
        en: 'Content',
        fi: 'Sisältö',
        me: 'Sisältö',
        sa: 'Sisdoallu'
      },
      SUBMIT_POST: {
        sv: 'Skicka Inlägg',
        en: 'Submit Post',
        fi: 'Lähetä viesti',
        me: 'Lähetä viesti',
        sa: 'Sádde čállosa'
      },
      FILL_ALL_FIELDS: {
        sv: 'Var vänlig fyll i alla obligatoriska fält!',
        en: 'Please fill in all required fields!',
        fi: 'Täytä kaikki pakolliset kentät!',
        me: 'Täytä kaikki pakolliset kentät!',
        sa: 'Fylli buot dárbbašlaš gávppit!'
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
      EMPTY_MSG: {
        sv: 'Inga inlägg ännu – bli den första att posta!',
        en: 'No posts yet – be the first to post!',
        fi: 'Ei viestejä vielä – ole ensimmäinen!',
        me: 'Ei viestejä vielä – ole ensimmäinen!',
        sa: 'Ii leat čállosat – leat vuosttaš čállit!'
      }
    };

    // Update translations for the current language
    for (const key in translations) {
      this.translations[key as keyof typeof this.translationKeys] =
        translations[key as keyof typeof this.translationKeys][currentLanguage] || key;
    }
  }
}