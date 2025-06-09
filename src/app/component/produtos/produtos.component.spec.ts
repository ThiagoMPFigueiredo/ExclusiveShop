import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProdutoComponent } from '../estrutura/produto/produto.component';
import { ProdutoService, Produto } from '../../services/produto.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule, FormsModule, ProdutoComponent],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css'
})
export class ProdutosComponent implements OnInit {
  produtos: Produto[] = [];
  produtosFiltrados: Produto[] = [];
  categorias: string[] = [];
  categoriaSelecionada: string = '';

  constructor(
    private router: Router,
    private produtoService: ProdutoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.produtoService.listarTodos().subscribe(produtos => {
      // Se não autenticado, filtrar os produtos exclusivos
      if (!this.authService.isAutenticado()) {
        produtos = produtos.filter(p => !p.exclusivo);
      }

      this.produtos = produtos;
      this.produtosFiltrados = produtos;

      // Extração dinâmica das categorias
      this.categorias = Array.from(new Set(produtos.map(p => p.categoria)));
    });
  }

  filtrarPorCategoria(): void {
    if (this.categoriaSelecionada === '') {
      this.produtosFiltrados = this.produtos;
    } else {
      this.produtosFiltrados = this.produtos.filter(
        p => p.categoria === this.categoriaSelecionada
      );
    }
  }

  irParaProduto(id: number): void {
    this.router.navigate(['/produto', id]);
  }

  navegarPara(caminho: string): void {
    this.router.navigate([caminho]);
  }
}
