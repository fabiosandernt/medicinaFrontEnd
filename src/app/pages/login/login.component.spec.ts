import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteLogin } from './login.component';

describe('ComponenteLogin', () => {
    let component: ComponenteLogin;
    let fixture: ComponentFixture<ComponenteLogin>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        declarations: [ ComponenteLogin ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ComponenteLogin);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
