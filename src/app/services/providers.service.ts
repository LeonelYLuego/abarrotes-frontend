import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponse } from '../interfaces/http-response.interface';
import { Provider } from '../interfaces/provider.interface';

@Injectable({
    providedIn: 'root',
})

export class ProvidersService {
    baseUrl: string = 'http://localhost:3000';

    constructor(private http: HttpClient) { }

    async getProviders(): Promise<Provider[]> {
        const data = await new Promise<Provider[]>((resolve, reject) => {
          this.http
            .get<HttpResponse<Provider[]>>(`${this.baseUrl}/api/providers`)
            .subscribe({
              next: (value) => {
                if (value.error) reject(value.error);
                else if (value.data) resolve(value.data);
              },
              error: (err) => reject(err),
            });
        });
        return data ?? [];
      }
}