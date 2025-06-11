import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Endereco, EnderecoService } from '../../services/endereco.service';
import { Pagamento, PagamentoService } from '../../services/pagamento.service';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit{
  usuario: any;
  usuarioForm!: FormGroup;
  usuarioId!: number;
  enderecos: Endereco[] = [];
  pagamentos: Pagamento[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private enderecoService: EnderecoService,
    private pagamentoService: PagamentoService
  ) {}

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['']
    });

    const routeId = this.route.snapshot.paramMap.get('id');
    this.usuarioId = routeId ? Number(routeId) : JSON.parse(localStorage.getItem('usuarioLogado') || '{}')?.id;

    if (!this.usuarioId) {
      alert('Usuário não identificado.');
      this.router.navigate(['/login']);
      return;
    }

    fetch(`/api/usuarios/${this.usuarioId}`)
      .then(res => res.json())
      .then(usuario => {
        this.usuario = usuario;
        this.usuarioForm.patchValue({ nome: usuario.nome, email: usuario.email });
        localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
      });

    this.carregarEnderecos();
    this.carregarPagamentos();
}

  carregarEnderecos() {
  this.enderecoService.listarPorUsuario(this.usuarioId).subscribe(data => {
    this.enderecos = data;
  });
}

carregarPagamentos() {
  this.pagamentoService.listarPorUsuario(this.usuarioId).subscribe(data => {
    this.pagamentos = data;
  });
}

adicionarEndereco() {
  const descricao = prompt('Digite o endereço:');
  if (descricao) {
    this.enderecoService.adicionar({ userId: this.usuarioId, descricao }).subscribe(() => {
      this.carregarEnderecos();
    });
  }
}

adicionarPagamento() {
  const descricao = prompt('Digite o meio de pagamento:');
  if (descricao) {
    this.pagamentoService.adicionar({ userId: this.usuarioId, descricao }).subscribe(() => {
      this.carregarPagamentos();
    });
  }
}
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('usuarioLogado');
    this.router.navigate(['/']);
  }
  irParaProdutos(): void {
  this.router.navigate(['/produtos']);
}
irParaHome(): void {
  this.router.navigate(['/']);
}

}
