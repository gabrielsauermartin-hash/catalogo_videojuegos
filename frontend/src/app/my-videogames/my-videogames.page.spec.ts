import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyVideogamesPage } from './my-videogames.page';

describe('MyVideogamesPage', () => {
  let component: MyVideogamesPage;
  let fixture: ComponentFixture<MyVideogamesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyVideogamesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
