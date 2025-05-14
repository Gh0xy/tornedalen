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
      answer: 1
    },
    {
      question: 'QUIZ_QUESTION_2',
      options: ['QUIZ_OPTION_2_1', 'QUIZ_OPTION_2_2', 'QUIZ_OPTION_2_3', 'QUIZ_OPTION_2_4'],
      answer: 0
    },
    {
      question: 'QUIZ_QUESTION_3',
      options: ['QUIZ_OPTION_3_1', 'QUIZ_OPTION_3_2', 'QUIZ_OPTION_3_3', 'QUIZ_OPTION_3_4'],
      answer: 0
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
        me: 'Kokeile tietosi meän tietovisassa!',
        sa: 'Geahča dieđuid min jearahallamis!'
      },
      QUIZ_QUESTION_1: {
        sv: 'Vart ligger konsthall tornedalen?',
        en: 'Where is Konsthall Tornedalen located?',
        fi: 'Missä Konsthall Tornedalen sijaitsee?',
        me: 'Missä Konsthall Tornedalen on?',
        sa: 'Gosa lea Konsthall Tornedalen?'
      },
      QUIZ_OPTION_1_1: { sv: 'Övertorneå', en: 'Övertorneå', fi: 'Ylitornio', me: 'Ylitornio', sa: 'Duortnus' },
      QUIZ_OPTION_1_2: { sv: 'Vitsaniemi', en: 'Vitsaniemi', fi: 'Vitsanemia', me: 'Vitsanemia', sa: 'Vitsaniemi' },
      QUIZ_OPTION_1_3: { sv: 'Haparanda', en: 'Haparanda', fi: 'Haaparanta', me: 'Haaparanta', sa: 'Háhpáránnda' },
      QUIZ_OPTION_1_4: { sv: 'Kalix', en: 'Kalix', fi: 'Verhiö', me: 'Kainuu ', sa: 'Gáláhis' },
      QUIZ_QUESTION_2: {
        sv: 'Vilken känd konstnär skapade en skulptur som är tänkt att stå i Kiruna?',
        en: 'Which famous artist created a sculpture that is intended to stand in Kiruna?',
        fi: 'Kuka kuuluisa taiteilija loi veistoksen, joka on tarkoitettu seisomaan Kiirunassa?',
        me: 'Kuka tunnettu taiteilija teki veistoksen, joka on tarkoitettu seisomaan Kiirunassa?',
        sa: 'Gos lei mii geavahe goahti, moai lea dat veistta, mii leaba deavdit Kiirunás?'
      },
      QUIZ_OPTION_2_1: { sv: 'Pablo Picasso', en: 'Pablo Picasso', fi: 'Pablo Picasso', me: 'Pablo Picasso', sa: 'Pablo Picasso' },
      QUIZ_OPTION_2_2: { sv: 'Leonardo Da Vinci', en: 'Leonardo Da Vinci', fi: 'Leonardo Da Vinci', me: 'Leonardo Da Vinci', sa: 'Leonardo Da Vinci' },
      QUIZ_OPTION_2_3: { sv: 'Michelangelo', en: 'Michelangelo', fi: 'Michelangelo', me: 'Michelangelo', sa: 'Michelangelo' },
      QUIZ_OPTION_2_4: { sv: 'Claude Monet', en: 'Claude Monet', fi: 'Claude Monet', me: 'Claude Monet', sa: 'Claude Monet' },
      QUIZ_QUESTION_3: {
        sv: 'Vad är väderstationen i Vitsaniemi för någonting?',
        en: 'What is the weather station in Vitsaniemi?',
        fi: 'Mikä on Vitsaniemen sääasema?',
        me: 'Mikä on sääasema Vitsaniemissä?',
        sa: 'Maid lea vejraasastuvdna Vitsaniemis?'
      },
      QUIZ_OPTION_3_1: { sv: 'En plats där konstnärer bjuds in för att bo och fördjupa sig i det lokala vädret.', en: 'A place where artists are invited to live and immerse themselves in the local weather.', fi: 'Paikka, jossa taiteilijat kutsutaan elämään ja uppoutumaan paikalliseen säähän.', me: 'Paikka, missä taiteilijat kutsutaan elämään ja uppoutumaan paikalliseen säähän.', sa: 'Golbma, gos goahtiide vuollán álgguheapmi ja dálkkátit lokála vejras.' },
      QUIZ_OPTION_3_2: { sv: 'En plats där man kan mäta aktuella temperaturen.', en: 'A place where you can measure the current temperature.', fi: 'Paikka, jossa voit mitata nykyisen lämpötilan.', me: 'Paikka, missä voit mitta sitä nykyistä lämpötilaa.', sa: 'Golbma, gos de sáhttá mii dáhpáhus dállu mátkamuorra.' },
      QUIZ_OPTION_3_3: { sv: 'En plats där man kan mäta vindhastighet.', en: 'A place where you can measure wind speed.', fi: 'Paikka, jossa voit mitata tuulen nopeutta.', me: 'Paikka, missä voit mitta tuulen nopeutta.', sa: 'Golbma, gos de sáhttá mii miihttá tuulá duvvan.' },
      QUIZ_OPTION_3_4: { sv: 'En plats där man kan mäta vindstyrkan.', en: 'A place where you can measure wind strength.', fi: 'Paikka, jossa voit mitata tuulen voimakkuutta.', me: 'Paikka, missä voit mitta tuulen voimakkuutta.', sa: 'Golbma, gos de sáhttá mii miihttá tuulá veahkki.' },
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
