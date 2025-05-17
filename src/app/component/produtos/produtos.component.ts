import { Component, OnInit } from '@angular/core';
import { NgFor, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProdutoComponent } from '../estrutura/produto/produto.component';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [NgFor, CommonModule, ProdutoComponent],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css'
})

export class ProdutosComponent {
  produtos = [
    {
      id: 1,
      imagem: '../../../assets/produtos/Samsung_Galax_S25_base_azul.jpg',
      descricao: 'Samsung Galaxy S25 - Tela infinita e alto desempenho',
      preco: 3999.90
    },
    {
      id: 2,
      imagem: '../../../assets/produtos/Smart_TV_4K_LG_UHD_70.jpg',
      descricao: 'Smart TV 4K LG 70" com Inteligência Artificial',
      preco: 4599.00
    },
    {
      id: 3,
      imagem: '../../../assets/produtos/Geladeira_Electrolux_Frost_Free_490L.jpg',
      descricao: 'Geladeira Electrolux 490L Frost Free com Inox',
      preco: 3199.99
    },
    {
      id: 4,
      imagem: '../../../assets/produtos/WAP_Parafusadeira_e_Furadeira_a_Bateria_com_Kit_de_13_Acessorios_e_Maleta_Empunhadura_Emborrachada_Bivolt.jpg',
      descricao: 'Furadeira WAP com 13 acessórios e maleta',
      preco: 499.90
    },
    {
      id: 5,
      imagem: '../../../assets/produtos/MAGE_MALE_Jaqueta_masculina.jpg',
      descricao: 'Jaqueta masculina MAGE MALE - Estilo urbano',
      preco: 249.90
    },
    {
      id: 6,
      imagem: '../../../assets/produtos/Mochila_Bolsa_Notebook_Reforcada_Anti_Furto_Semi_Impermeavel.jpg',
      descricao: 'Mochila anti-furto reforçada e semi impermeável',
      preco: 179.00
    }
  ];
  
  constructor(private router: Router) {}

  irParaProduto(id: number) {
    this.router.navigate(['/produto', id]);
  }

  navegarPara(caminho: string) {
    this.router.navigate([caminho]);
  }
}
