import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'quiz',
    loadComponent: () =>
      import('./pages/quiz/quiz.component').then((m) => m.QuizComponent),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact.component').then((m) => m.ContactComponent),
  },
  {
    path: 'discussion',
    loadComponent: () =>
      import('./pages/discussion/discussion.component').then((m) => m.DiscussionComponent),
  },
  {
    path: 'reply-to-post',
    loadComponent: () =>
      import('./pages/reply-to-post/reply-to-post.component').then((m) => m.ReplyToPostComponent),
  },
  {
    path: 'exhibits',
    loadComponent: () =>
      import('./pages/exhibits/exhibits.component').then((m) => m.ExhibitsComponent),
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];