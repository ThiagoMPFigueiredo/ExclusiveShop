import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-inicial',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.css']
})
export class PaginaInicialComponent implements OnInit {
  produtos = [
    { id: 1, imagem: '../../../assets/produtos/Samsung_Galax_S25 base_azul.jpg' },
    { id: 2, imagem: '../../../assets/produtos/Smart TV 4K LG UHD 70.jpg' },
    { id: 3, imagem: '../../../assets/produtos/Geladeira Electrolux Frost Free 490L.jpg' },
    { id: 4, imagem: '../../../assets/produtos/WAP Parafusadeira e Furadeira à Bateria com  Kit de 13 Acessórios e Maleta Empunhadura Emborrachada Bivolt.jpg' },
    { id: 5, imagem: '../../../assets/produtos/MAGE MALE Jaqueta masculina.jpg' },
    { id: 6, imagem: '../../../assets/produtos/Mochila Bolsa Notebook Reforçada Anti Furto Semi Impermeável.jpg' }
  ];

  visiveis: any[] = [];
  startIndex = 0;
  intervaloId: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.atualizarVisiveis();
    this.iniciarCarrossel();
  }

  atualizarVisiveis() {
    this.visiveis = this.produtos.slice(this.startIndex, this.startIndex + 3);
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
