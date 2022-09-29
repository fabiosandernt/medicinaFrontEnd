import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ASOService } from '../../../shared/services/aso.service';
import { Aso } from '../../../shared/models/aso';
import { Router } from '@angular/router';

import { ComponenteModalCancel, ComponenteModalConfirm } from '../../../components/components.module';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { NumberFormatStyle } from '@angular/common';

@Component({
  selector: 'app-criar-aso',
  templateUrl: './criar-aso.component.html',
  styleUrls: ['./criar-aso.component.css']
})
export class ComponenteCriarASO implements OnInit {
    closeResult: string;
    tipoExame: any

    form: FormGroup;
    aso: Aso;

    modelDataNascimento: NgbDateStruct;
    modelDataExame: NgbDateStruct;

    modalRef: MdbModalRef<ComponenteModalCancel | ComponenteModalConfirm> | null = null;

    constructor(
        private _formBuilder: FormBuilder,
        private _asoService: ASOService,
        private _router: Router,
        private _modalMdbService: MdbModalService
    ) {}

    ngOnInit(): void {
        this.initForm()
    }

    initForm(): void {
        this.form = this._formBuilder.group({
            nome: [this.aso?.nome, [Validators.required, Validators.maxLength(50)]],
            cpf: [this.aso?.cpf, [
                Validators.required,
                Validators.minLength(11),
                Validators.maxLength(11),
                Validators.pattern("^[0-9]*$")
            ]],
            dataNascimento: [this.aso?.dataNascimento, [Validators.required]],
            funcao: [this.aso?.funcao],
            cnpj: [this.aso?.cnpj, [
                Validators.required,
                Validators.minLength(14),
                Validators.maxLength(14),
                Validators.pattern("^[0-9]*$")
            ]],
            razaoSocial: [this.aso?.razaoSocial],
            setor: [this.aso?.setor, [Validators.maxLength(30)]],
            esocial: [this.aso?.esocial, [
                Validators.maxLength(20),
                Validators.pattern("^[0-9]*$")
            ]],
            pis: [this.aso?.pis, [
                Validators.minLength(11),
                Validators.maxLength(11),
                Validators.pattern("^[0-9]*$")
            ]],
            exame: [this.aso?.exame, [Validators.required]],
            dataExame: [this.aso?.dataExame, [Validators.required]],
        });
    }

    public alterarTipo(e: any): void {
        this.tipoExame = e.target.value;
        console.log(this.tipoExame);
    }

    openModal(modalType: string): void {
        if(!modalType) return;

        if(modalType === 'modalCancel'){
            this.modalRef = this._modalMdbService.open(ComponenteModalCancel, { data: { routeReturn: "/empresa/listar" } })
        }
        else if(modalType === 'modalConfirm'){
            this.modalRef = this._modalMdbService.open(ComponenteModalConfirm)
            this.modalRef.onClose.subscribe((saveConfirm: any) => {
                console.log(saveConfirm);
                if(saveConfirm === true) this.salvarCadastro()
            });
        }
    }

    salvarCadastro() {
        if(!this.form.invalid) return;

        const formData = {...this.form.value};

        const asoData: Aso = {
            id: this.aso?.id,
            nome: formData.nome,
            cpf: formData.cpf,
            dataNascimento: formData.dataNascimento,
            funcao: formData.funcao,
            cnpj: formData.cnpj,
            razaoSocial: formData.razaoSocial,
            setor: formData.setor,
            esocial: formData.esocial,
            pis: formData.pis,
            exame: formData.exame,
            dataExame: formData.dataExame
        }

        return this._asoService.Salvar(asoData).subscribe({
            next: () => this._router.navigate(["/aso/listar"]),
            error: (err: any) => console.log(err)
        })
    }
}
