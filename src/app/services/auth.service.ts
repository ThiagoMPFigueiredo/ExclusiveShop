import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = '/api';
  constructor(private http: HttpClient) {}

  // Cadastro de novo usuário
  cadastrar(dados: { nome: string; email: string; senha: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuarios`, dados);
  }

  // Autenticação (login) por e-mail e senha
 autenticar(email: string, senha: string): Observable<boolean> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios?email=${email}&senha=${senha}`).pipe(
      map(usuarios => {
        const usuario = usuarios[0];
        if (usuario) {
          localStorage.setItem('authToken', 'fake-token');
          localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
          return true;
        }
        return false;
      }),
      catchError(() => of(false))
    );
  }

  // Logout (simples)
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('usuarioLogado');
  }

  // Verifica se está logado
  isAutenticado(): boolean {
    return !!localStorage.getItem('authToken');
  }
}