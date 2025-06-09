import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit{
  usuarioForm: FormGroup;
  usuarioId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.usuarioForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['']
    });
  }

  ngOnInit(): void {
    this.usuarioId = Number(this.route.snapshot.paramMap.get('id'));
    fetch(`/api/usuarios/${this.usuarioId}`)
      .then(res => res.json())
      .then(usuario => {
        this.usuarioForm.patchValue({
          nome: usuario.nome,
          email: usuario.email
        });
        localStorage.setItem('usuarioLogado', JSON.stringify(usuario)); // atualiza localStorage
      });
  }

  salvarAlteracoes(): void {
    const dados = this.usuarioForm.value;
    fetch(`/api/usuarios/${this.usuarioId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: dados.nome,
        email: dados.email,
        ...(dados.senha ? { senha: dados.senha } : {})
      })
    }).then(() => {
      alert('Dados atualizados com sucesso!');
    });
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('usuarioLogado');
    this.router.navigate(['/']);
  }

}
