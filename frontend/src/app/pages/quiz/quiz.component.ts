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
      question: 'QUIZ_QUESTION_1',
      options: ['QUIZ_OPTION_1_1', 'QUIZ_OPTION_1_2', 'QUIZ_OPTION_1_3', 'QUIZ_OPTION_1_4'],
      answer: 2
    },
    {
      question: 'QUIZ_QUESTION_2',
      options: ['QUIZ_OPTION_2_1', 'QUIZ_OPTION_2_2', 'QUIZ_OPTION_2_3', 'QUIZ_OPTION_2_4'],
      answer: 1
    },
    {
      question: 'QUIZ_QUESTION_3',
      options: ['QUIZ_OPTION_3_1', 'QUIZ_OPTION_3_2', 'QUIZ_OPTION_3_3', 'QUIZ_OPTION_3_4'],
      answer: 1
    }
  ];

  score: number | null = null;

  constructor(private languageService: LanguageService) {}

  selectOption(qIndex: number, optionIndex: number) {
    this.questions[qIndex].selected = optionIndex;
  }

  submitQuiz() {
    this.score = this.questions.filter(q => q.selected === q.answer).length;
  }

  resetQuiz() {
    this.questions.forEach(q => (q.selected = undefined));
    this.score = null;
  }

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
      },
      QUIZ_QUESTION_1: {
        sv: 'Vad är huvudstaden i Frankrike?',
        en: 'What is the capital of France?',
        fi: 'Mikä on Ranskan pääkaupunki?',
        me: 'Mikä on Ranskan pääkaupunki?',
        sa: 'Mii lea Frankriikka gávpot?'
      },
      QUIZ_OPTION_1_1: { sv: 'Berlin', en: 'Berlin', fi: 'Berliini', me: 'Berliini', sa: 'Berlin' },
      QUIZ_OPTION_1_2: { sv: 'Madrid', en: 'Madrid', fi: 'Madrid', me: 'Madrid', sa: 'Madrid' },
      QUIZ_OPTION_1_3: { sv: 'Paris', en: 'Paris', fi: 'Pariisi', me: 'Pariisi', sa: 'Paris' },
      QUIZ_OPTION_1_4: { sv: 'Lissabon', en: 'Lisbon', fi: 'Lissabon', me: 'Lissabon', sa: 'Lisboa' },
      QUIZ_QUESTION_2: {
        sv: 'Vilken planet kallas för den röda planeten?',
        en: 'Which planet is known as the Red Planet?',
        fi: 'Mikä planeetta tunnetaan punaisena planeettana?',
        me: 'Mikä planeetta tunnetaan punaisena planeettana?',
        sa: 'Mii lea rukses plánet?'
      },
      QUIZ_OPTION_2_1: { sv: 'Jorden', en: 'Earth', fi: 'Maa', me: 'Maa', sa: 'Eanan' },
      QUIZ_OPTION_2_2: { sv: 'Mars', en: 'Mars', fi: 'Mars', me: 'Mars', sa: 'Mars' },
      QUIZ_OPTION_2_3: { sv: 'Jupiter', en: 'Jupiter', fi: 'Jupiter', me: 'Jupiter', sa: 'Jupiter' },
      QUIZ_OPTION_2_4: { sv: 'Venus', en: 'Venus', fi: 'Venus', me: 'Venus', sa: 'Venus' },
      QUIZ_QUESTION_3: {
        sv: 'Vad är 5 + 3?',
        en: 'What is 5 + 3?',
        fi: 'Mikä on 5 + 3?',
        me: 'Mikä on 5 + 3?',
        sa: 'Mii lea 5 + 3?'
      },
      QUIZ_OPTION_3_1: { sv: '5', en: '5', fi: '5', me: '5', sa: '5' },
      QUIZ_OPTION_3_2: { sv: '8', en: '8', fi: '8', me: '8', sa: '8' },
      QUIZ_OPTION_3_3: { sv: '10', en: '10', fi: '10', me: '10', sa: '10' },
      QUIZ_OPTION_3_4: { sv: '6', en: '6', fi: '6', me: '6', sa: '6' },
      YOUR_SCORE: {
        sv: 'Din poäng',
        en: 'Your score',
        fi: 'Pisteesi',
        me: 'Pisteesi',
        sa: 'Du poavttat'
      },
      SUBMIT: {
        sv: 'Skicka in',
        en: 'Submit',
        fi: 'Lähetä',
        me: 'Lähetä',
        sa: 'Geahča'
      },
      TRY_AGAIN: {
        sv: 'Försök igen',
        en: 'Try again',
        fi: 'Yritä uudelleen',
        me: 'Yritä uudelleen',
        sa: 'Geahča fas'
      }
    };

    return translations[key]?.[currentLanguage] || key;
  }
}
