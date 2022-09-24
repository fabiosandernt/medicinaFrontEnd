import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

    constructor(
        private modalService: NgbModal,
        private formBuilder: FormBuilder,
        private router: Router,
        private activatedRouter: ActivatedRoute,
        private empresaService: EmpresaService,
        public dialog: MatDialog,
    ) {}

    // openModal(): void {
    //     this.dialog.open(ComponenteModalMat, { width: '250px' });
    // }

    ngOnInit(): void {
        this.empresa = this.activatedRouter.snapshot.data.empresa != undefined ? this.activatedRouter.snapshot.data.empresa : {};

        this.initForm()
    }

    initForm() {
        this.form = this.formBuilder.group({
            cnpj: [this.empresa?.cnpj, [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
            razaoSocial: [this.empresa?.razaoSocial, [Validators.required]],
            celular: [this.empresa?.celular, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
            telefone: [this.empresa?.telefone, [Validators.maxLength(9)]],
            risco: [this.empresa?.risco],
            endereco: [this.empresa?.endereco, [Validators.maxLength(50)]],
            email: [this.empresa?.email, [Validators.required, Validators.pattern("^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+).(\.[a-z]{2,3})$"), Validators.maxLength(50)]],
        });
    }

    open(content: any) {
        //this.modalService.open(content, { windowClass: 'modal-mini modal-primary', size: 'sm' })
        this.modalService.open(content,
        {
            windowClass: 'modal-mini modal-primary', size: 'sm'
        })
        .result.then((result: any) =>
        {
            this.closeResult = `Closed with: ${result}`;
        },
        (reason: any) =>
        {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`
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

    salvarCadastro() {
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
