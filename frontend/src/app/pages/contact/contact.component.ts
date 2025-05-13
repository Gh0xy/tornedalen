import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true, 
  imports: [RouterModule,FormsModule,HttpClientModule,CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  constructor(private router: Router, private http: HttpClient, private languageService: LanguageService) {}
  form = {
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    message: ''
  };

  successMessage = '';
  errorMessage = '';

  submitForm() {
    this.http.post('/api/contact', this.form).subscribe({
      next: (response: any) => {
        this.successMessage = 'Tack! Ditt meddelande har skickats.';
        this.errorMessage = '';
        this.form = {
          first_name: '',
          last_name: '',
          phone: '',
          email: '',
          message: ''
        };
      },
      error: (error) => {
        console.error('Fel vid skickande:', error);
        this.successMessage = '';
        this.errorMessage = error?.error?.error || 'Något gick fel. Försök igen.';
      }
    }); 
  }
  
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
        sv: 'Kontakta oss',
        en: 'Contact us',
        fi: 'Ota meihin yhteyttä',
        me: 'Ota meihin yhteyttä',
        sa: 'Geahča muhtin jearaldaga munnje!'
      },
      FIND_US: {
        sv: 'Hitta hit',
        en: 'Find us',
        fi: 'Löydä meidät',
        me: 'Löydä meidät',
        sa: 'Gávnnat deike'
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
      ADRESS: {
        sv: 'Adress',
        en: 'Address',
        fi: 'Osoite',
        me: 'Osoite',
        sa: 'Čujuhus'
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