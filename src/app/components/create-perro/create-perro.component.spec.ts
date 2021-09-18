import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePerroComponent } from './create-perro.component';

describe('CreatePerroComponent', () => {
  let component: CreatePerroComponent;
  let fixture: ComponentFixture<CreatePerroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePerroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePerroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
