import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosExclusivosComponent } from './produtos-exclusivos.component';

describe('ProdutosExclusivosComponent', () => {
  let component: ProdutosExclusivosComponent;
  let fixture: ComponentFixture<ProdutosExclusivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutosExclusivosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutosExclusivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
