import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-criar-empresa',
    templateUrl: './criar-empresa.component.html',
    styleUrls: ['./criar-empresa.component.css']
})
export class ComponenteCriarEmpresa implements OnInit {
    //closeResult: string;
    form: FormGroup;
    empresa: any;

    constructor(private modalService: NgbModal, private formBuilder: FormBuilder) {}

    ngOnInit(): void {}

    initForm() {
        this.form = this.formBuilder.group({
            cnpj: [this.empresa?.cnpj],
            razaoSocial: [this.empresa?.razaoSocial],
            celular: [this.empresa?.celular],
            telefone: [this.empresa?.telefone],
            endereco: [this.empresa?.endereco],
            email: [this.empresa?.email],
        });
    }

    open(content: any) {
        this.modalService.open(content, {
            windowClass: 'modal-mini modal-primary', size: 'sm'
        })
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
}
