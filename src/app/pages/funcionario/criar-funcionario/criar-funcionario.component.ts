import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-criar-funcionario',
  templateUrl: './criar-funcionario.component.html',
  styleUrls: ['./criar-funcionario.component.css']
})
export class ComponenteCriarFuncionario implements OnInit {
    closeResult: string;
    tipoExame: any

    form: FormGroup;
    funcionario: any;

    modelDataNascimento: NgbDateStruct;
    modelDataExame: NgbDateStruct;

    constructor(private modalService: NgbModal, private formBuilder: FormBuilder) { }
    ngOnInit(): void {
        this.initForm()
    }

    initForm() {
        this.form = this.formBuilder.group({
            nome: [this.funcionario?.nome, [Validators.required, Validators.maxLength(50)]],
            cpf: [this.funcionario?.cpf, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
            dataNascimento: [this.funcionario?.dataNascimento, [Validators.required]],
            funcao: [this.funcionario?.funcao],
            cnpj: [this.funcionario?.cnpj, [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
            razaoSocial: [this.funcionario?.razaoSocial],
            setor: [this.funcionario?.setor, [Validators.maxLength(30)]],
            esocial: [this.funcionario?.esocial, [Validators.maxLength(20)]],
            risco: [this.funcionario?.risco],
            pis: [this.funcionario?.pis, [Validators.minLength(11), Validators.maxLength(11)]],
            exame: [this.funcionario?.exame, [Validators.required]],
            dataExame: [this.funcionario?.dataExame, [Validators.required]],
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
