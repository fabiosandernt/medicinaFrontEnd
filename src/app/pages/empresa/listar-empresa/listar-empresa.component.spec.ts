import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteListarEmpresa } from './listar-empresa.component';

describe('ComponenteListarEmpresa', () => {
    let component: ComponenteListarEmpresa;
    let fixture: ComponentFixture<ComponenteListarEmpresa>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
        declarations: [ ComponenteListarEmpresa ]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ComponenteListarEmpresa);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
