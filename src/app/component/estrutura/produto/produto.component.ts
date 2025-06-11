import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-produto',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './produto.component.html',
  styleUrl: './produto.component.css'
})
export class ProdutoComponent {
  @Input() imageUrl!: string;
  @Input() description!: string;
  @Input() price!: number;

}
