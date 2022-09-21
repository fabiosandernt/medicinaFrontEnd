import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Aso } from '../../../shared/models/aso';

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

    constructor(private modalService: NgbModal, private formBuilder: FormBuilder) { }
    ngOnInit(): void {
        this.initForm()
    }

    initForm() {
        this.form = this.formBuilder.group({
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
        this.modalService.open(content, {
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
}
