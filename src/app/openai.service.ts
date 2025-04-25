import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {
  constructor(private http: HttpClient) {}

  getPromptFromBackend(data: { thema: string; stil: string; typ: string }): Observable<any> {
    return this.http.post('/api/generate-prompt/', data); // API-Route deines Django-Backends
  }
}
