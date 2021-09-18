import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPerrosComponent } from './list-perros.component';

describe('ListPerrosComponent', () => {
  let component: ListPerrosComponent;
  let fixture: ComponentFixture<ListPerrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPerrosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPerrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
