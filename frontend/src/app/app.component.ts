import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showLanguageBar = false; // State to toggle the language bar

  constructor(public languageService: LanguageService) {} // Changed to public

  // Function to toggle the visibility of the language bar
  toggleLanguageBar() {
    this.showLanguageBar = !this.showLanguageBar;
  }

  // Function to change the language
  changeLanguage(lang: string) {
    console.log(`Language changed to: ${lang}`);
    this.languageService.setLanguage(lang); // Update the language in the service
    this.showLanguageBar = false; // Close the language bar after selection
  }

  // Function to get translated text
  getTranslation(key: string): string {
    const currentLanguage = this.languageService.getLanguage(); // Get the current language from the service
    const translations: { [key: string]: { [key: string]: string } } = {
      HOME: {
        sv: 'Hem',
        en: 'Home',
        fi: 'Koti',
        me: 'Koti',
        sa: 'Báiki'
      },
      EXHIBITS: {
        sv: 'Utställningar',
        en: 'Exhibits',
        fi: 'Näyttelyt',
        me: 'Näyttelyt',
        sa: 'Bihttá'
      },
      QUIZ: {
        sv: 'Quiz',
        en: 'Quiz',
        fi: 'Tietovisa',
        me: 'Tietovisa',
        sa: 'Jearahallat'
      },
      CONTACT: {
        sv: 'Kontakt',
        en: 'Contact',
        fi: 'Yhteystiedot',
        me: 'Yhteystiedot',
        sa: 'Oktavuohta'
      },
      DISCUSSION: {
        sv: 'Diskussion',
        en: 'Discussion',
        fi: 'Keskustelu',
        me: 'Keskustelu',
        sa: 'Digaštallan'
      },
      WELCOME: {
        sv: 'Välkommen till Tornedalens Museum',
        en: 'Welcome to Tornedalens Museum',
        fi: 'Tervetuloa Tornedalens Museoon',
        me: 'Tervetuloa Tornedalens Museoon',
        sa: 'Bures boahtin Duortnosleagi museai'
      },
      MORE: {
        sv: 'Mer',
        en: 'More',
        fi: 'Lisää',
        me: 'Enämbi',
        sa: 'Mearra'
      },
      LOGIN: {
        sv: 'Logga in',
        en: 'Login',
        fi: 'Kirjaudu sisään',
        me: 'Kirjaudu sissään',
        sa: 'Logge sisa'
      },
      SUBSCRIBE: {
        sv: 'Bli medlem',
        en: 'Subscribe',
        fi: 'Liity jäseneksi',
        me: 'Liity jäsenheksi',
        sa: 'Diŋgo'
      },
      ABOUT: {
        sv: 'Om museet',
        en: 'About the museum',
        fi: 'Tietoa museosta',
        me: 'Tietoa museosta',
        sa: 'Musea birra'
      },
      MUSEUM_NAME: {
        sv: 'Tornedalens Museum',
        en: 'Tornedalens Museum',
        fi: 'Tornedalens Museo',
        me: 'Tornedalens Museo',
        sa: 'Meänmuseo'
      },
      LANGUAGE_SWEDISH: {
        sv: 'Svenska',
        en: 'Swedish',
        fi: 'Ruotsi',
        me: 'Ruotsi',
        sa: 'Ruoŧagiella'
      },
      LANGUAGE_MEANKIELI: {
        sv: 'Meänkieli',
        en: 'Meänkieli',
        fi: 'Meänkieli',
        me: 'Meänkieli',
        sa: 'Meänkieli'
      },
      LANGUAGE_FINNISH: {
        sv: 'Finska',
        en: 'Finnish',
        fi: 'Suomi',
        me: 'Suomi',
        sa: 'Suopmagiella'
      },
      LANGUAGE_SAMI: {
        sv: 'Nordsamiska',
        en: 'Northern Sami',
        fi: 'Pohjoissaame',
        me: 'Ruijansaame',
        sa: 'Davvisámegiella'
      },
      LANGUAGE_ENGLISH: {
        sv: 'Engelska',
        en: 'English',
        fi: 'Englanti',
        me: 'Englanti',
        sa: 'Eaŋgalsgiella'
      },
    };

    return translations[key]?.[currentLanguage] || key;
  }

  getFlagImage(): string {
    const currentLanguage = this.languageService.getLanguage(); // Get the current language from the service
    const flags: { [key: string]: string } = {
      sv: 'assets/bilder/sweden.png',
      me: 'assets/bilder/meankieli.png',
      fi: 'assets/bilder/finland.png',
      sa: 'assets/bilder/sami.png',
      en: 'assets/bilder/uk.png',
    };
    return flags[currentLanguage] || 'assets/bilder/sweden.png';
  }
}