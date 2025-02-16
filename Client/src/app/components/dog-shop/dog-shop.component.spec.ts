import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogShopComponent } from './dog-shop.component';

describe('DogShopComponent', () => {
  let component: DogShopComponent;
  let fixture: ComponentFixture<DogShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DogShopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DogShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
