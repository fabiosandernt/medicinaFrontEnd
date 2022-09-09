import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteCriarEmpresa } from './criar-empresa.component';

describe('ComponenteCriarEmpresa', () => {
    let component: ComponenteCriarEmpresa;
    let fixture: ComponentFixture<ComponenteCriarEmpresa>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
        declarations: [ ComponenteCriarEmpresa ]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ComponenteCriarEmpresa);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
