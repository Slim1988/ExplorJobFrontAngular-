import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoteAdCarouselComponent } from './promote-ad-carousel.component';

describe('PromoteAdCarouselComponent', () => {
  let component: PromoteAdCarouselComponent;
  let fixture: ComponentFixture<PromoteAdCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromoteAdCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoteAdCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
