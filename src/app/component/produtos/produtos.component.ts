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
  categoriaSelecionada: string = 'Todos os produtos';

  categorias = [
    'Todos os produtos',
    'eletronicos',
    'roupas',
    'utensilios',
    'moveis',
    'livros'
  ];

  constructor(
    private router: Router,
    private produtoService: ProdutoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.produtoService.listarTodos().subscribe(produtos => {
      if (!this.authService.isAutenticado()) {
        produtos = produtos.filter(p => !p.exclusivo);
      }
      this.produtos = produtos;
      this.filtrarPorCategoria(this.categoriaSelecionada);
    });
  }

  filtrarPorCategoria(categoria: string): void {
  this.categoriaSelecionada = categoria;
  if (categoria === 'Todos os produtos') {
    this.produtosFiltrados = this.produtos;
  } else {
    this.produtosFiltrados = this.produtos.filter(
      p => p.categoria === categoria
    );
  }
}
  navegarPara(caminho: string): void {
    this.router.navigate([caminho]);
  }
}
