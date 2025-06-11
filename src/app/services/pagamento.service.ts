import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pagamento {
  id?: number;
  userId: number;
  descricao: string;
}

@Injectable({ providedIn: 'root' })
export class PagamentoService {
  private readonly apiUrl = '/api/pagamentos';

  constructor(private http: HttpClient) {}

  listarPorUsuario(userId: number): Observable<Pagamento[]> {
    return this.http.get<Pagamento[]>(`${this.apiUrl}?userId=${userId}`);
  }

  adicionar(pagamento: Pagamento): Observable<Pagamento> {
    return this.http.post<Pagamento>(this.apiUrl, pagamento);
  }
}
