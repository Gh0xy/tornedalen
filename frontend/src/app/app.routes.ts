import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'quiz',
    loadComponent: () =>
      import('./quiz/quiz.component').then((m) => m.QuizComponent),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./contact/contact.component').then((m) => m.ContactComponent),
  },
  {
    path: 'discussion',
    loadComponent: () =>
      import('./discussion/discussion.component').then((m) => m.DiscussionComponent),
  },
  {
    path: 'exhibits',
    loadComponent: () =>
      import('./exhibits/exhibits.component').then((m) => m.ExhibitsComponent),
  },
];
