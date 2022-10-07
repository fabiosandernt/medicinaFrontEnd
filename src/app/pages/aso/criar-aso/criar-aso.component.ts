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

    imagemSrc: string = '';
    imagemSelecionada: string = '';

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
            exame: [this.aso?.tipoExame, [Validators.required]],
            dataExame: [this.aso?.dataExame, [Validators.required]],
            anexoImagem: ({
                imagem: [''],
                imagemSource: ['']
            }),
            cpf: [this.aso?.cpf, [
                Validators.required,
                Validators.minLength(11),
                Validators.maxLength(11),
                Validators.pattern("^[0-9]*$")
            ]],
        });
    }

    public alterarTipo(e: any): void {
        this.tipoExame = e.target.value;
    }

    onImageChange(event: any) {
        const reader = new FileReader();

        if(event.target.files && event.target.files.length) {
            const [file] = event.target.files;
            this.imagemSelecionada = file.name;

            reader.readAsDataURL(file);

            reader.onload = () => {
                this.imagemSrc = reader.result as string;
                console.log(this.imagemSrc)

                this.form.patchValue({
                    imagemSource: reader.result
                });
            };
        }
    }

    removerImagem(): void {
        this.imagemSelecionada = '';
        this.imagemSrc = '';

        this.form.patchValue({
            imagemSource: ''
        });
    }

    openModal(modalType: string): void {
        if(!modalType) return;

        if(modalType === 'modalCancel'){
            this.modalRef = this._modalMdbService.open(ComponenteModalCancel, { data: { routeReturn: "/empresa/listar" } })
        }
        else if(modalType === 'modalConfirm'){
            this.modalRef = this._modalMdbService.open(ComponenteModalConfirm)
            this.modalRef.onClose.subscribe((saveConfirm: any) => {
                if(saveConfirm)
                {
                    this.salvarCadastro()
                }
            });
        }
    }

    salvarCadastro() {
        // if(!this.form.invalid) return;

        const formData = {...this.form.value};

        const asoData: Aso = {
            id: this.aso?.id,
            tipoExame: formData.exame,
            dataExame: formData.dataExame,
            cpf: formData.cpf,
            anexoImagem: this.imagemSrc,
        }

        console.log(asoData)

        return this._asoService.Salvar(asoData).subscribe({
            next: () => this._router.navigate(["/aso/listar"]),
            error: (err: any) => console.log(err)
        })
    }
}
