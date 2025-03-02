import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopDogComponent } from './shop-dog.component';

describe('ShopDogComponent', () => {
  let component: ShopDogComponent;
  let fixture: ComponentFixture<ShopDogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopDogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopDogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
