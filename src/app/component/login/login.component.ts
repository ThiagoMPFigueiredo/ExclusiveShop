import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  onSubmit() {
    const { email, senha } = this.loginForm.value;

    this.authService.autenticar(email, senha).subscribe(success => {
      if (success) {
        this.router.navigate(['/area-exclusiva']);
      } else {
        this.error = 'Credenciais inválidas';
      }
    }, () => {
      this.error = 'Erro ao conectar com o servidor';
    });
  }
  voltarParaHome() {
  this.router.navigate(['/']);
}
}
