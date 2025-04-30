import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SafeUrlPipe } from './safe-url.pipe';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-exhibits',
  standalone: true,
  imports: [CommonModule, RouterModule, SafeUrlPipe],
  templateUrl: './exhibits.component.html',
  styleUrls: ['./exhibits.component.css']
})
export class ExhibitsComponent {
  videos: { url: string; rating: number; descriptions: { [key: string]: string } }[] = [
    {
      url: 'https://www.youtube.com/embed/bbf0-ge4MzY',
      rating: 0,
      descriptions: {
        sv: 'En introduktion till Konsthall Tornedalen och platsens historia.',
        en: 'An introduction to Konsthall Tornedalen and the history of the place.',
        fi: 'Johdanto Konsthall Tornedalenin ja paikan historiaan.',
        me: 'Johdanto Konsthall Tornedalenin ja paikan historiaan.',
        sa: 'Álggoálmmuhus Konsthall Tornedalenii ja báikki historjjii.'
      }
    },
    {
      url: 'https://www.youtube.com/embed/TwuVIb4lAj4',
      rating: 0,
      descriptions: {
        sv: 'En intervju med en lokal konstnär om det kreativa arbetet i regionen.',
        en: 'An interview with a local artist about the creative work in the region.',
        fi: 'Haastattelu paikallisen taiteilijan kanssa alueen luovasta työstä.',
        me: 'Haastattelu paikallisen taiteilijan kanssa alueen luovasta työstä.',
        sa: 'Intervjuvva báikkálaš dáiddárain guovllu háhkavuohta barggu birra.'
      }
    },
    {
      url: 'https://www.youtube.com/embed/Jab97M0bmvc',
      rating: 0,
      descriptions: {
        sv: 'Dokumentär om Tornedalens natur och hur den inspirerat konsten.',
        en: 'A documentary about Tornedalen\'s nature and how it has inspired art.',
        fi: 'Dokumentti Tornedalenin luonnosta ja sen vaikutuksesta taiteeseen.',
        me: 'Dokumentti Tornedalenin luonnosta ja sen vaikutuksesta taiteeseen.',
        sa: 'Dokumeantta Duortnosleagi luonddu birra ja movt dat lea háhkan dáidda.'
      }
    }
  ];

  constructor(private languageService: LanguageService) {}

  // Function to get translated text
  getTranslation(key: string): string {
    const currentLanguage = this.languageService.getLanguage();
    const translations: { [key: string]: { [key: string]: string } } = {
      EXHIBITS_TITLE: {
        sv: 'Utställningar',
        en: 'Exhibits',
        fi: 'Näyttelyt',
        me: 'Näyttelyt',
        sa: 'Bihttá'
      },
      EXHIBITS_INTRO: {
        sv: 'Här kan du utforska våra aktuella och tidigare utställningar.',
        en: 'Here you can explore our current and past exhibits.',
        fi: 'Täällä voit tutustua nykyisiin ja aiempiin näyttelyihimme.',
        me: 'Täällä voit tutustua nykyisiin ja aiempiin näyttelyihimme.',
        sa: 'Dáppe sáhtát ohcangilvvut dálá ja ovdal bihttáid.'
      },
      EXHIBITS_NO_CURRENT: {
        sv: 'Det finns inga aktuella utställningar just nu.',
        en: 'There are no current exhibits at the moment.',
        fi: 'Tällä hetkellä ei ole käynnissä olevia näyttelyitä.',
        me: 'Tällä hetkellä ei ole käynnissä olevia näyttelyitä.',
        sa: 'Dál eai leat dálá bihttá.'
      },
      RATING: {
        sv: 'Betyg',
        en: 'Rating',
        fi: 'Arvosana',
        me: 'Arvosana',
        sa: 'Arvvo'
      }
    };

    return translations[key]?.[currentLanguage] || key;
  }

  // Function to get the translated description for a video
  getVideoDescription(video: { descriptions: { [key: string]: string } }): string {
    const currentLanguage = this.languageService.getLanguage();
    return video.descriptions[currentLanguage] || video.descriptions['sv'];
  }

  setRating(videoIndex: number, rating: number): void {
    this.videos[videoIndex].rating = rating;
  }
}