import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-cadastro-usuario',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './cadastro-usuario.component.html',
  styleUrl: './cadastro-usuario.component.css'
})
export class CadastroUsuarioComponent {
  cadastroForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.cadastroForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.cadastroForm.valid) {
      this.authService.cadastrar(this.cadastroForm.value).subscribe(() => {
      const { email, senha } = this.cadastroForm.value;
      this.authService.autenticar(email, senha).subscribe(success => {
        const usuario = JSON.parse(localStorage.getItem('usuarioLogado')!);
        this.router.navigate(['/perfil', usuario.id]);
      });
      }, error => {
        alert('Erro ao cadastrar: ' + error.message);
      });
    }
  }
  voltarParaHome() {
    this.router.navigate(['/']);
  }
}
