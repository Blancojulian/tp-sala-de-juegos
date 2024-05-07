import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalabraComponent } from './palabra.component';

describe('PalabraComponent', () => {
  let component: PalabraComponent;
  let fixture: ComponentFixture<PalabraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PalabraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PalabraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
