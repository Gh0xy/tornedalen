import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService, KontaktMeddelande } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  form: FormGroup;

  constructor(private router: Router, private languageService: LanguageService, private fb: FormBuilder, private contactService: ContactService) {
    this.form = this.fb.group({
      förnamn: ['', Validators.required],
      efternamn: ['', Validators.required],
      telefon: [''],
      epost: ['', [Validators.required, Validators.email]],
      meddelande: ['', [Validators.required, Validators.minLength(5)]]
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

  submit(): void {
    if (this.form.invalid) return;

    const data: KontaktMeddelande = this.form.value;

    this.contactService.skicka(data).subscribe({
      next: () => {
        alert('Meddelandet skickades!');
        this.form.reset();
      },
      error: err => {
        console.error('Fel vid skickande:', err);
        alert('Något gick fel.');
      }
    });
  }
}
