import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ASOService } from '../../../shared/services/aso.service';
import { Aso } from '../../../shared/models/aso';
import { Router } from '@angular/router';

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

    constructor(
        private _modalService: NgbModal,
        private _formBuilder: FormBuilder,
        private _asoService: ASOService,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this.initForm()
    }

    initForm() {
        this.form = this._formBuilder.group({
            nome: [this.aso?.nome, [Validators.required, Validators.maxLength(50)]],
            cpf: [this.aso?.cpf, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
            dataNascimento: [this.aso?.dataNascimento, [Validators.required]],
            funcao: [this.aso?.funcao],
            cnpj: [this.aso?.cnpj, [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
            razaoSocial: [this.aso?.razaoSocial],
            setor: [this.aso?.setor, [Validators.maxLength(30)]],
            esocial: [this.aso?.esocial, [Validators.maxLength(20)]],
            pis: [this.aso?.pis, [Validators.minLength(11), Validators.maxLength(11)]],
            exame: [this.aso?.exame, [Validators.required]],
            dataExame: [this.aso?.dataExame, [Validators.required]],
        });
    }

    open(content: any) {
        this._modalService.open(content, {
            windowClass: 'modal-mini modal-primary', size: 'sm' }).result.then((result: any) => {
            this.closeResult = `Closed with: ${result}`;
        },
        (reason: any) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }

    public alterarTipo(e: any) {
        this.tipoExame = e.target.value;
        console.log(this.tipoExame);
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
