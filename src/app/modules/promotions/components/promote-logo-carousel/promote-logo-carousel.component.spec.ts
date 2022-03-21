import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PromoteLogoCarouselComponent } from './promote-logo-carousel.component';

describe('PromoteLogoCarouselComponent', () => {
  let component: PromoteLogoCarouselComponent;
  let fixture: ComponentFixture<PromoteLogoCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromoteLogoCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoteLogoCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
