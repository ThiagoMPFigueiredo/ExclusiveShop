import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:3000'; // Ou use /api com proxy
  constructor(private http: HttpClient) {}

  // Cadastro de novo usuário
  cadastrar(dados: { nome: string; email: string; senha: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuarios`, dados);
  }

  // Autenticação (login) por e-mail e senha
  autenticar(email: string, senha: string): Observable<boolean> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios?email=${email}&senha=${senha}`).pipe(
      map(usuarios => {
        if (usuarios.length > 0) {
          localStorage.setItem('authToken', 'fake-token'); // Aqui pode gerar um token real se quiser
          return true;
        }
        return false;
      })
    );
  }

  // Logout (simples)
  logout(): void {
    localStorage.removeItem('authToken');
  }

  // Verifica se está logado
  isAutenticado(): boolean {
    return !!localStorage.getItem('authToken');
  }
}
