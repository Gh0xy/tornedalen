import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'quiz-exhibits',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['../../../styles.css']
})
export class QuizComponent {
  constructor(private languageService: LanguageService) {}

  // Function to get translated text
  getTranslation(key: string): string {
    const currentLanguage = this.languageService.getLanguage();
    const translations: { [key: string]: { [key: string]: string } } = {
      QUIZ_TITLE: {
        sv: 'Quiz',
        en: 'Quiz',
        fi: 'Tietovisa',
        me: 'Tietovisa',
        sa: 'Jearahallat'
      },
      QUIZ_INTRO: {
        sv: 'Testa din kunskap i vårt quiz!',
        en: 'Test your knowledge in our quiz!',
        fi: 'Testaa tietosi tietovisassamme!',
        me: 'Testaa tietosi tietovisassamme!',
        sa: 'Geahča dieđuid min jearahallamis!'
      }
    };

    return translations[key]?.[currentLanguage] || key;
  }
}