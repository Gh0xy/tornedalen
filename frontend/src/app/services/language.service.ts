import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private languageSubject: BehaviorSubject<string>;
  currentLanguage$;

  constructor() {
    // Load the language from localStorage or default to 'sv' (Swedish)
    const savedLanguage = localStorage.getItem('language') || 'sv';
    this.languageSubject = new BehaviorSubject<string>(savedLanguage);
    this.currentLanguage$ = this.languageSubject.asObservable();
  }
  // No additional code added here
  setLanguage(lang: string) {
    this.languageSubject.next(lang);
    localStorage.setItem('language', lang); // Save the language to localStorage
  }

  getLanguage(): string {
    return this.languageSubject.getValue();
  }
}