import { Component } from '@angular/core';

@Component({
  selector: 'app-pagina-inicial',
  imports: [],
  standalone: true,
  templateUrl: './pagina-inicial.component.html',
  styleUrl: './pagina-inicial.component.css'
})
export class PaginaInicialComponent implements OnInit, OnDestroy {
  images: string[] = [
    'assets/img1.jpg',
    'assets/img2.jpg',
    'assets/img3.jpg',
    'assets/img4.jpg',
    'assets/img5.jpg',
    'assets/img6.jpg'
  ];
  visibleImages: string[] = [];
  currentIndex = 0;
  interval: any;
  paused = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.updateVisibleImages();
    this.startCarousel();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  updateVisibleImages() {
    this.visibleImages = [];
    for (let i = 0; i < 3; i++) {
      const index = (this.currentIndex + i) % this.images.length;
      this.visibleImages.push(this.images[index]);
    }
  }

  startCarousel() {
    this.interval = setInterval(() => {
      if (!this.paused) {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateVisibleImages();
      }
    }, 10000);
  }

  onMouseEnter() {
    this.paused = true;
  }

  onMouseLeave() {
    this.paused = false;
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  openProduct(image: string) {
    const productId = this.images.indexOf(image); // Substitua por ID real
    this.router.navigate(['/produto', productId]);
  }

}
