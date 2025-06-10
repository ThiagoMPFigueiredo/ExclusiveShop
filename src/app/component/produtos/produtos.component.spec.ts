import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProdutosComponent } from './produtos.component';
import { ProdutoService } from '../../services/produto.service';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

// Mock de produtos
const MOCK_PRODUTOS = [
  {
    id: 1,
    imagem: '/assets/produtos/produto1.jpg',
    descricao: 'Celular Samsung',
    preco: 1999.99,
    categoria: 'eletronicos',
    exclusivo: false,
    link: 'https://example.com/produto1'
  },
  {
    id: 2,
    imagem: '/assets/produtos/produto2.jpg',
    descricao: 'Livro de Filosofia',
    preco: 49.90,
    categoria: 'livros',
    exclusivo: false,
    link: 'https://example.com/produto2'
  },
  {
    id: 3,
    imagem: '/assets/produtos/produto3.jpg',
    descricao: 'Mesa de Escritório',
    preco: 399.99,
    categoria: 'moveis',
    exclusivo: true,
    link: 'https://example.com/produto3'
  }
];

describe('ProdutosComponent', () => {
  let component: ProdutosComponent;
  let fixture: ComponentFixture<ProdutosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutosComponent, RouterTestingModule],
      providers: [
        {
          provide: ProdutoService,
          useValue: {
            listarTodos: () => of(MOCK_PRODUTOS)
          }
        },
        {
          provide: AuthService,
          useValue: {
            isAutenticado: () => true
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve carregar os produtos ao iniciar', () => {
    expect(component.produtos.length).toBe(3);
    expect(component.produtosFiltrados.length).toBe(3);
  });

  it('deve filtrar produtos pela categoria "livros"', () => {
    component.filtrarPorCategoria('livros');
    expect(component.produtosFiltrados.length).toBe(1);
    expect(component.produtosFiltrados[0].categoria).toBe('livros');
  });

  it('deve exibir todos os produtos quando filtro for "Todos os produtos"', () => {
    component.filtrarPorCategoria('Todos os produtos');
    expect(component.produtosFiltrados.length).toBe(3);
  });

  it('deve navegar para rota ao chamar navegarPara()', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');
    component.navegarPara('login');
    expect(spy).toHaveBeenCalledWith(['login']);
  });
});
