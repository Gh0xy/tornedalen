import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface DiskussionInlägg {
  id?: number;
  ämne: string;
  författare: string;
  epost?: string;
  inlägg: string;
}

@Injectable({ providedIn: 'root' })
export class DiscussionService {
  private apiUrl = 'http://localhost:8080/api/discussion';

  constructor(private http: HttpClient) {}

  skicka(inlägg: DiskussionInlägg): Observable<any> {
    return this.http.post(this.apiUrl, inlägg);
  }

  skickaReply(parentId: string, reply: DiskussionInlägg): Observable<any> {
    return this.http.post(`${this.apiUrl}/${parentId}/reply`, reply);
  }

  hämtaAlla(): Observable<DiskussionInlägg[]> {
    return this.http.get<DiskussionInlägg[]>(this.apiUrl);
  }

  hämtaMedId(id: string): Observable<DiskussionInlägg> {
    return this.http.get<DiskussionInlägg>(`${this.apiUrl}/${id}`);
  }
}
