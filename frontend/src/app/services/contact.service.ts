import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface KontaktMeddelande {
  förnamn: string;
  efternamn: string;
  telefon?: string;
  epost: string;
  meddelande: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private apiUrl = 'http://localhost:8080/api/contact';

  constructor(private http: HttpClient) {}

  skicka(meddelande: KontaktMeddelande): Observable<any> {
    return this.http.post(this.apiUrl, meddelande);
  }

  hämtaAlla(): Observable<KontaktMeddelande[]> {
    return this.http.get<KontaktMeddelande[]>(this.apiUrl);
  }
}
