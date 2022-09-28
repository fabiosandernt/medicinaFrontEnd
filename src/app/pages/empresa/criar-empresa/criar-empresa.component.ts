import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

import { ComponenteModalCancel, ComponenteModalConfirm } from '../../../components/components.module';

import { Empresa } from '../../../shared/models/empresa';
import { EmpresaService } from '../../../shared/services/empresa.service';

@Component({
    selector: 'app-criar-empresa',
    templateUrl: './criar-empresa.component.html',
    styleUrls: ['./criar-empresa.component.css']
})
export class ComponenteCriarEmpresa implements OnInit {
    closeResult: string;
    form: FormGroup;
    empresa: Empresa;

    modalRef: MdbModalRef<ComponenteModalCancel | ComponenteModalConfirm> | null = null;
    //modalConfirmRef: MdbModalRef<ComponenteModalConfirm> | null = null;

    _salvarCadastro: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private activatedRouter: ActivatedRoute,
        private empresaService: EmpresaService,
        public dialog: MatDialog,
        private modalMdbService: MdbModalService
    ) {}

    ngOnInit(): void {
        this.empresa = this.activatedRouter.snapshot.data.empresa != undefined ? this.activatedRouter.snapshot.data.empresa : {};

        this.initForm()
    }

    initForm(): void {
        this.form = this.formBuilder.group({
            cnpj: [this.empresa?.cnpj, [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
            razaoSocial: [this.empresa?.razaoSocial, [Validators.required]],
            celular: [this.empresa?.celular, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
            telefone: [this.empresa?.telefone, [Validators.maxLength(9)]],
            risco: [this.empresa?.risco],
            endereco: [this.empresa?.endereco, [Validators.maxLength(50)]],
            email: [this.empresa?.email,
            [
                Validators.required,
                Validators.pattern("^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+).(\.[a-z]{2,3})$"),
                Validators.maxLength(50)
            ]],
        });
    }

    openModal(modalType: string): void {
        if(!modalType) return;

        if(modalType === 'modalCancel'){
            this.modalRef = this.modalMdbService.open(ComponenteModalCancel, { data: { routeReturn: "/empresa/listar" } })
        }
        else if(modalType === 'modalConfirm'){
            this.modalRef = this.modalMdbService.open(ComponenteModalConfirm)
            this.modalRef.onClose.subscribe((saveConfirm: any) => {
                console.log(saveConfirm);
                if(saveConfirm === true) this.salvarCadastro()
            });
        }
    }

    salvarCadastro(): any {
        if(!this.form.invalid) return;

        const formData = {...this.form.value};

        const empresaData: Empresa = {
            id: this.empresa?.id,
            cnpj: formData.cnpj,
            razaoSocial: formData.razaoSocial,
            celular: formData.celular,
            telefone: formData.telefone,
            risco: formData.risco,
            endereco: formData.endereco,
            email: formData.email
        }

        return this.empresaService.Salvar(empresaData).subscribe({
            next: () => this.router.navigate(["/empresa/listar"]),
            error: (err: any) => console.log(err)
        })
    }
}
