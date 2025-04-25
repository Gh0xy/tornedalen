import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { FormsModule } from '@angular/forms';

interface Question {
  question: string;
  options: string[];
  answer: number; // index of the correct answer
  selected?: number;
}

@Component({
  selector: 'quiz-exhibits',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['../../../styles.css']
})
export class QuizComponent {
  questions: Question[] = [
    {
      question: 'What is the capital of France?',
      options: ['Berlin', 'Madrid', 'Paris', 'Lisbon'],
      answer: 2
    },
    {
      question: 'Which planet is known as the Red Planet?',
      options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
      answer: 1
    },
    {
      question: 'What is 5 + 3?',
      options: ['5', '8', '10', '6'],
      answer: 1
    }
  ];

  score: number | null = null;

  selectOption(qIndex: number, optionIndex: number) {
    this.questions[qIndex].selected = optionIndex;
  }

  submitQuiz() {
    this.score = this.questions.filter(q => q.selected === q.answer).length;
  }

  resetQuiz() {
    this.questions.forEach(q => q.selected = undefined);
    this.score = null;
  }
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