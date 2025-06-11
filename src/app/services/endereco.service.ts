import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Endereco {
  id?: number;
  userId: number;
  descricao: string;
}

@Injectable({ providedIn: 'root' })
export class EnderecoService {
  private readonly apiUrl = '/api/enderecos';

  constructor(private http: HttpClient) {}

  listarPorUsuario(userId: number): Observable<Endereco[]> {
    return this.http.get<Endereco[]>(`${this.apiUrl}?userId=${userId}`);
  }

  adicionar(endereco: Endereco): Observable<Endereco> {
    return this.http.post<Endereco>(this.apiUrl, endereco);
  }
}
