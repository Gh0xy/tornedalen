import { Component, OnInit } from '@angular/core';
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
  // paginering
  currentPage: number = 1;
  postsPerPage: number = 10;
  totalPosts: number = 0;
  //initiering av popup som false
  isModalOpen = false;

  constructor(
    private router: Router,
    private postService: PostService,
    private languageService: LanguageService // Inject LanguageService
  ) {}

  ngOnInit() {
    // Hämta inlägg när komponenten laddas
    this.postService.getPosts().subscribe(posts => {
      // Sortera inläggen i kronologisk ordning (nyaste först)
      this.posts = posts.sort((a, b) => b.date.getTime() - a.date.getTime());
    });
    this.loadPosts();
  }

  loadPosts() {
    // Hämta alla inlägg och sortera dem i kronologisk ordning
    this.postService.getPosts().subscribe(posts => {
      this.totalPosts = posts.length; // Sätt totalt antal inlägg
      this.posts = posts
        .sort((a, b) => b.date.getTime() - a.date.getTime()) // Sortera nyaste först
        .slice((this.currentPage - 1) * this.postsPerPage, this.currentPage * this.postsPerPage); // Paginate posts
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadPosts();
  }

  onPostsPerPageChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.postsPerPage = Number(target.value);  // Konvertera till ett tal
    this.currentPage = 1;  // Återställ till första sidan
    this.loadPosts(); // Ladda om inläggen med det nya antalet per sida
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  createPost() {
    if (!this.subject || !this.author || !this.email || !this.content) {
      alert(this.getTranslation('FILL_ALL_FIELDS'));
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

  // Function to get translated text
  getTranslation(key: string): string {
    const currentLanguage = this.languageService.getLanguage();
    const translations: { [key: string]: { [key: string]: string } } = {
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
      }
    };

    return translations[key]?.[currentLanguage] || key;
  }
}