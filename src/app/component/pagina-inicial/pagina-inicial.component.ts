import { Component, OnInit } from '@angular/core';
import { NgFor, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProdutoComponent } from '../estrutura/produto/produto.component';
import { AuthService } from '../../services/auth.service'; // importe

@Component({
  selector: 'app-pagina-inicial',
  standalone: true,
  imports: [NgFor, CommonModule, ProdutoComponent],
  templateUrl: './pagina-inicial.component.html',
  styleUrl: './pagina-inicial.component.css'
})

export class PaginaInicialComponent implements OnInit {
  produtos = [
    {
      id: 1,
      imagem: '/assets/produtos/Samsung_Galax_S25_base_azul.jpg',
      descricao: 'Samsung Galaxy S25 - Tela infinita e alto desempenho',
      preco: 5669.10,
      link: "https://shop.samsung.com/br/galaxy-s25-256gb/p"
    },
    {
      id: 2,
      imagem: '/assets/produtos/Smart_TV_4K_LG_UHD_70.jpg',
      descricao: 'Smart TV 4K LG 70" com Inteligência Artificial',
      preco: 6174.05,
      link: "https://www.lg.com/br/tvs-e-soundbars/tv-uhd-4k/70ur8750psa/"
    },
    {
      id: 3,
      imagem: '/assets/produtos/Geladeira_Electrolux_Frost_Free_490L.jpg',
      descricao: 'Geladeira Electrolux 490L Frost Free com Inox',
      preco: 4559.90,
      link: "https://www.gazin.com.br/produto/geladeira-electrolux-frost-free-490l-efficient-autosense-inverse-ib7s/7497/inox/220-volts"
    },
    {
      id: 4,
      imagem: '/assets/produtos/WAP_Parafusadeira_e_Furadeira_a_Bateria_com_Kit_de_13_Acessorios_e_Maleta_Empunhadura_Emborrachada_Bivolt.jpg',
      descricao: 'Furadeira WAP com 13 acessórios e maleta',
      preco: 161.41,
      link: "https://www.amazon.com.br/Parafusadeira-Furadeira-WAP-Carregador-Acess%C3%B3rios/dp/B09V1SM8QB"
    },
    {
      id: 5,
      imagem: '/assets/produtos/MAGE_MALE_Jaqueta_masculina.jpg',
      descricao: 'Jaqueta masculina MAGE MALE - Estilo urbano',
      preco: 259.22,
      link: "https://www.amazon.com.br/MAGE-MALE-masculina-elegante-esportiva/dp/B0DPS5SR6V"
    },
    {
      id: 6,
      imagem: '/assets/produtos/Mochila_Bolsa_Notebook_Reforcada_Anti_Furto_Semi_Impermeavel.jpg',
      descricao: 'Mochila anti-furto reforçada e semi impermeável',
      preco: 169.90,
      link: "https://www.amazon.com.br/Mochila-Anti-Furto-Unissex-Notebook/dp/B0DJB8Y6LR"
    }
  ];

  visiveis: any[] = [];
  startIndex = 0;
  intervaloId: any;
  usuarioLogado: any = null;

  constructor(
    private router: Router,
    private authService: AuthService // injete o serviço
  ) {}

  ngOnInit(): void {
    this.usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado') || 'null');
    this.atualizarVisiveis();
    this.iniciarCarrossel();
  }

  irParaPerfil(): void {
    if (this.usuarioLogado?.id) {
      this.router.navigate(['/perfil', this.usuarioLogado.id]);
    }
  }

  offset = 0;
  
  atualizarVisiveis() {
    const totalCards = this.produtos.length;
    const visibleCount = 3;
    if (this.startIndex + visibleCount > totalCards) {
      this.startIndex = 0;
    }
    this.offset = this.startIndex * 300; // 275 + gap estimado
  }

  iniciarCarrossel() {
    this.intervaloId = setInterval(() => {
      this.startIndex = (this.startIndex + 1) % this.produtos.length;
      if (this.startIndex + 3 > this.produtos.length) {
        this.startIndex = 0;
      }
      this.atualizarVisiveis();
    }, 10000);
  }

  pausarCarrossel() {
    clearInterval(this.intervaloId);
  }

  retomarCarrossel() {
    this.iniciarCarrossel();
  }

  irParaProduto(id: number) {
    this.router.navigate(['/produto', id]);
  }

  navegarPara(caminho: string) {
    this.router.navigate([caminho]);
  }
  
}
