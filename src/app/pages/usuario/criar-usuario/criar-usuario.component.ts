import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Usuario } from '../../../shared/models/usuario';
import { UsuarioService } from '../../../shared/services/usuario.service';

import { ComponenteModalCancel, ComponenteModalConfirm } from '../../../components/components.module';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-criar-usuario',
  templateUrl: './criar-usuario.component.html',
  styleUrls: ['./criar-usuario.component.css']
})
export class ComponenteCriarUsuario implements OnInit {
    form: FormGroup;
    usuario: Usuario;

    modalRef: MdbModalRef<ComponenteModalCancel | ComponenteModalConfirm> | null = null;

    constructor(
        private _formBuilder: FormBuilder,
        private _activatedRouter: ActivatedRoute,
        private _usuarioService: UsuarioService,
        private _router: Router,
        private modalMdbService: MdbModalService,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.usuario = this._activatedRouter.snapshot.data.usuario != undefined ? this._activatedRouter.snapshot.data.usuario : {};

        this.initForm()
    }

    initForm(): void {
        this.form = this._formBuilder.group({
            nome: [this.usuario?.name, [
                Validators.required,
                Validators.maxLength(30)
            ]],
            tipo: [this.usuario?.tipoUsuario, [Validators.required]],
            senha: [this.usuario?.password, [
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(15)
            ]],
            email: [this.usuario?.email, [
                Validators.required,
                Validators.pattern("^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+).(\.[a-z]{2,3})$"),
                Validators.maxLength(50)
            ]],
        });
    }

    openModal(modalType: string): void {
        if(!modalType) return;

        if(modalType === 'modalCancel'){
            this.modalRef = this.modalMdbService.open(ComponenteModalCancel, { data: { routeReturn: "/usuario/listar" } })
        }
        else if(modalType === 'modalConfirm'){
            this.modalRef = this.modalMdbService.open(ComponenteModalConfirm)
            this.modalRef.onClose.subscribe((saveConfirm: any) => {
                if(saveConfirm) this.salvarCadastro()
            });
        }
    }

    showAlert(type: string) {
        const from = 'top'
        const align = 'right'

        if(type == 'error') {
            this.toastr.error('<span class="now-ui-icons tim-icons icon-alert-circle-exc"></span> Não foi possível fazer o cadastro </b> - Por favor tente novamente mais tarde!', '', {
                timeOut: 8000,
                enableHtml: true,
                closeButton: true,
                toastClass: "alert alert-danger alert-with-icon",
                positionClass: 'toast-' + from + '-' +  align
            });
        }

        if(type == 'success') {
            this.toastr.success('<span class="now-ui-icons ui-1_check"></span> Cadastro realizado com sucesso </b> - Veja as informações cadastradas abaixo!', '', {
                timeOut: 8000,
                enableHtml: true,
                closeButton: true,
                toastClass: "alert alert-success alert-with-icon",
                positionClass: 'toast-' + from + '-' +  align
            });
        }
    }

    salvarCadastro() {
        //if(!this.form.invalid) return;

        const formData = {...this.form.value};

        const usuarioData: Usuario = {
            id: this.usuario?.id,
            name: formData.nome,
            tipoUsuario: Number(formData.tipo),
            password: { valor: formData.senha },
            email: { valor: formData.email },
        }

        return this._usuarioService.Salvar(usuarioData).subscribe({
            next: () => {
                this.showAlert('success')
                this._router.navigate(["/usuario/listar"])
            },
            error: (err: any) => {
                console.log(err)
                this.showAlert('error')
            }
        })
    }
}
