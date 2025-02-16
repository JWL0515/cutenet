import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatShopComponent } from './cat-shop.component';

describe('CatShopComponent', () => {
  let component: CatShopComponent;
  let fixture: ComponentFixture<CatShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatShopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
