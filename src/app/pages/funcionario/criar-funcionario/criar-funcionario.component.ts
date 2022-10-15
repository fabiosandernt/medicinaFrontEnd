import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Funcionario } from '../../../shared/models/funcionario';
import { FuncionarioService } from '../../../shared/services/funcionario.service';

import { ComponenteModalCancel, ComponenteModalConfirm } from '../../../components/components.module';
import { ToastrNotificationService } from 'src/app/shared/services/toastr-notification.service';

@Component({
    selector: 'app-criar-funcionario',
    templateUrl: './criar-funcionario.component.html',
    styleUrls: ['./criar-funcionario.component.css']
})
export class ComponenteCriarFuncionario implements OnInit {
    closeResult: string;
    tipoExame: any

    form: FormGroup;
    funcionario: Funcionario;

    modelDataNascimento: NgbDateStruct;
    modelDataExame: NgbDateStruct;

    modalRef: MdbModalRef<ComponenteModalCancel | ComponenteModalConfirm> | null = null;

    constructor(
        private _formBuilder: FormBuilder,
        private funcionarioService: FuncionarioService,
        private router: Router,
        private activatedRouter: ActivatedRoute,
        private modalMdbService: MdbModalService,
        private toastr: ToastrNotificationService
    ) {}

    ngOnInit(): void {
        this.funcionario = this.activatedRouter.snapshot.data.funcionario != undefined ? this.activatedRouter.snapshot.data.funcionario : {};

        this.initForm()
    }

    initForm(): void {
        this.form = this._formBuilder.group({
            nome: [this.funcionario?.name, [
                Validators.required,
                Validators.maxLength(50)
            ]],
            cpf: [this.funcionario?.cpf, [
                Validators.required,
                Validators.minLength(11),
                Validators.maxLength(11),
                Validators.pattern("^[0-9]*$")
            ]],
            cnpj: [this.funcionario?.cnpj, [
                Validators.required,
                Validators.minLength(14),
                Validators.maxLength(14),
                Validators.pattern("^[0-9]*$")
            ]],
            dataNascimento: [this.funcionario?.dataNascimento, [Validators.required]],
            funcao: [this.funcionario?.funcao, [Validators.required, Validators.maxLength(20)]],
            setor: [this.funcionario?.setor, [Validators.required, Validators.maxLength(30)]],
            esocial: [this.funcionario?.matriculaEsocial, [
                Validators.required,
                Validators.maxLength(20),
                Validators.pattern("^[0-9]*$")
            ]],
            pis: [this.funcionario?.pis, [
                Validators.required,
                Validators.minLength(11),
                Validators.maxLength(11),
                Validators.pattern("^[0-9]*$")
            ]],
        });
    }

    openModal(modalType: string): void {
        if(!modalType) return;

        if(modalType === 'modalCancel'){
            this.modalRef = this.modalMdbService.open(ComponenteModalCancel, { data: { routeReturn: "/funcionario/listar" } })
        }
        else if(modalType === 'modalConfirm'){
            this.modalRef = this.modalMdbService.open(ComponenteModalConfirm)
            this.modalRef.onClose.subscribe((saveConfirm: any) => {
                if(saveConfirm === true) this.salvarCadastro()
            });
        }
    }

    public alterarTipo(e: any) {
        this.tipoExame = e.target.value;
        console.log(this.tipoExame);
    }

    salvarCadastro() {
        // if(!this.form.invalid) return;

        const formData = {...this.form.value};

        const funcionarioData: Funcionario = {
            id: this.funcionario?.id,
            name: formData.nome,
            cpf: formData.cpf,
            dataNascimento: formData.dataNascimento,
            funcao: formData.funcao,
            cnpj: formData.cnpj,
            setor: formData.setor,
            matriculaEsocial: formData.esocial,
            pis: formData.pis,
        }

        return this.funcionarioService.Salvar(funcionarioData).subscribe({
            next: () => {
                this.toastr.success()
                this.router.navigate(["/empresa/listar"])
            },
            error: (err: any) => {
                this.toastr.errorMessageBackEnd(err.error.errorMessage)
            }
        })
    }
}
