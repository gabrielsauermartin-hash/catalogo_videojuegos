import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VideogameFormPage } from './videogame-form.page';

describe('VideogameFormPage', () => {
  let component: VideogameFormPage;
  let fixture: ComponentFixture<VideogameFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VideogameFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
