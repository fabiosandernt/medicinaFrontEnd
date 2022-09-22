import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteListarAso } from './listar-aso.component';

describe('ComponenteListarEmpresa', () => {
    let component: ComponenteListarAso;
    let fixture: ComponentFixture<ComponenteListarAso>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
        declarations: [ ComponenteListarAso ]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ComponenteListarAso);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
