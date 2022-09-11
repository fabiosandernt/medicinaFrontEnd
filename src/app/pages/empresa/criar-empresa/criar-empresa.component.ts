import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

    constructor(
        private modalService: NgbModal,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this.initForm()
    }

    initForm() {
        this.form = this.formBuilder.group({
            cnpj: [this.empresa?.cnpj, [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
            razaoSocial: [this.empresa?.razaoSocial, [Validators.required]],
            celular: [this.empresa?.celular, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
            telefone: [this.empresa?.telefone, [Validators.maxLength(9)]],
            endereco: [this.empresa?.endereco, [Validators.maxLength(50)]],
            email: [this.empresa?.email, [Validators.required, Validators.pattern("^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+).(\.[a-z]{2,3})$"), Validators.maxLength(50)]],
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
