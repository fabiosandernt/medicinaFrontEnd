import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteCriarASO } from './criar-aso.component';

describe('CriarFuncionarioComponent', () => {
  let component: ComponenteCriarASO;
  let fixture: ComponentFixture<ComponenteCriarASO>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponenteCriarASO ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponenteCriarASO);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
