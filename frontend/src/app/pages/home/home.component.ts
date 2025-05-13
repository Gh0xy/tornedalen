import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private languageService: LanguageService) {}

  // Function to get translated text
  getTranslation(key: string): string {
    const currentLanguage = this.languageService.getLanguage();
    const translations: { [key: string]: { [key: string]: string } } = {
      WELCOME_TITLE: {
        sv: 'Välkommen till Tornedalens Museum',
        en: 'Welcome to Tornedalens Museum',
        fi: 'Tervetuloa Tornedalens Museoon',
        me: 'Tervetuloa Tornedalens Museoon',
        sa: 'Bures boahtin Duortnosleagi museai'
      },
      WELCOME_TEXT: {
        sv: 'Tornedalens Museum är ett kulturhistoriskt museum beläget i hjärtat av Tornedalen. Här belyser vi regionens historia och kultur.',
        en: 'Tornedalens Museum is a cultural history museum located in the heart of Tornedalen. Here we highlight the region\'s history and culture.',
        fi: 'Tornedalens Museo on kulttuurihistoriallinen museo Tornedalenin sydämessä. Täällä valotamme alueen historiaa ja kulttuuria.',
        me: 'Tornedalens Museo on kulttuurihistoriallinen museo Tornedalenin sydämessä. Täällä valotamme alueen historiaa ja kulttuuria.',
        sa: 'Duortnosleagi musea lea kultuvrahistorjjálaš musea Duortnosleagi váimmus. Dáppe čájehit guovllu historjjá ja kultuvrra.'
      },
      OPENING_HOURS: {
  sv: 'Öppettider',
  en: 'Opening hours',
  fi: 'Aukioloajat',
  me: 'Aukioloajat',
  sa: 'Aukioloajat'
},
HOURS_WEEKDAYS: {
  sv: 'Tisdag - Fredag: 08:00 - 15:00',
  en: 'Tuesday - Friday: 08:00 - 15:00',
  fi: 'Tiistai - Perjantai: 08:00 - 15:00',
  me: 'Tiistai - Perjantai: 08:00 - 15:00',
  sa: 'Duvvon - Friggodat: 08:00 - 15:00'
},
HOURS_WEEKEND: {
  sv: 'Lördag - Söndag: 11:00 - 15:00',
  en: 'Saturday - Sunday: 11:00 - 15:00',
  fi: 'Lauantai - Sunnuntai: 11:00 - 15:00',
  me: 'Lauantai - Sunnuntai: 11:00 - 15:00',
  sa: 'Lávvardat - Sondagat: 11:00 - 15:00'
},
HOURS_MONDAY: {
  sv: 'Måndag: Stängt',
  en: 'Monday: Closed',
  fi: 'Maanantai: Suljettu',
  me: 'Maanantai: Suljettu',
  sa: 'Mánnodaga: Čáhkká'
},
      EXPLORE_RESOURCES: {
        sv: 'Utforska våra digitala resurser',
        en: 'Explore our digital resources',
        fi: 'Tutustu digitaalisiin resursseihimme',
        me: 'Tutustu digitaalisiin resursseihimme',
        sa: 'Ohcangilvvut digitála resurssaid'
      },
      EXHIBITS: {
        sv: 'Se aktuella utställningar',
        en: 'See current exhibits',
        fi: 'Katso ajankohtaiset näyttelyt',
        me: 'Katso ajankohtaiset näyttelyt',
        sa: 'Geahča dálá bihttá'
      },
      QUIZ: {
        sv: 'Testa dina kunskaper i vårt quiz',
        en: 'Test your knowledge in our quiz',
        fi: 'Testaa tietosi tietovisassamme',
        me: 'Testaa tietosi tietovisassamme',
        sa: 'Geahča dieđuid min jearahallamis'
      },
      DISCUSSION: {
        sv: 'Delta i diskussioner',
        en: 'Participate in discussions',
        fi: 'Osallistu keskusteluihin',
        me: 'Osallistu keskusteluihin',
        sa: 'Oktavuohta digaštallamiin'
      },
      CONTACT: {
        sv: 'Kontakta oss!',
        en: 'Contact us!',
        fi: 'Ota yhteyttä!',
        me: 'Ota yhteyttä!',
        sa: 'Váldde oktavuođa!'
      },
      IMAGE_ALT: {
        sv: 'Tornedalens Museum utsida',
        en: 'Tornedalens Museum exterior',
        fi: 'Tornedalens Museon ulkopuoli',
        me: 'Tornedalens Museon ulkopuoli',
        sa: 'Duortnosleagi musea olggobealde'
      }
    };

    return translations[key]?.[currentLanguage] || key;
  }
}