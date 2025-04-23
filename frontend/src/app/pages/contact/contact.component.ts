import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  constructor(private router: Router, private languageService: LanguageService) {}

  // Function to get translated text
  getTranslation(key: string): string {
    const currentLanguage = this.languageService.getLanguage();
    const translations: { [key: string]: { [key: string]: string } } = {
      CONTACT_TITLE: {
        sv: 'Kontakt',
        en: 'Contact',
        fi: 'Yhteystiedot',
        me: 'Yhteystiedot',
        sa: 'Oktavuohta'
      },
      CONTACT_INTRO: {
        sv: 'Ställ en fråga till oss!',
        en: 'Ask us a question!',
        fi: 'Esitä meille kysymys!',
        me: 'Esitä meille kysymys!',
        sa: 'Geahča muhtin jearaldaga munnje!'
      },
      CONTACT_FORM_TITLE: {
        sv: 'Kontaktformulär',
        en: 'Contact Form',
        fi: 'Yhteydenottolomake',
        me: 'Yhteydenottolomake',
        sa: 'Oktavuođa lomma'
      },
      FIRST_NAME: {
        sv: 'Förnamn',
        en: 'First Name',
        fi: 'Etunimi',
        me: 'Etunimi',
        sa: 'Vuosttaš namma'
      },
      LAST_NAME: {
        sv: 'Efternamn',
        en: 'Last Name',
        fi: 'Sukunimi',
        me: 'Sukunimi',
        sa: 'Maŋŋá namma'
      },
      PHONE: {
        sv: 'Telefon',
        en: 'Phone',
        fi: 'Puhelin',
        me: 'Puhelin',
        sa: 'Telefovdna'
      },
      EMAIL: {
        sv: 'E-postadress',
        en: 'Email Address',
        fi: 'Sähköpostiosoite',
        me: 'Sähköpostiosoite',
        sa: 'E-poasta čujuhus'
      },
      MESSAGE: {
        sv: 'Meddelande',
        en: 'Message',
        fi: 'Viesti',
        me: 'Viesti',
        sa: 'Muitalus'
      },
      SUBMIT: {
        sv: 'Skicka',
        en: 'Submit',
        fi: 'Lähetä',
        me: 'Lähetä',
        sa: 'Sádde'
      }
    };

    return translations[key]?.[currentLanguage] || key;
  }
}