import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Usuario } from '../../../shared/models/usuario';
import { UsuarioService } from '../../../shared/services/usuario.service';

import { ComponenteModalCancel, ComponenteModalConfirm } from '../../../components/components.module';

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
        private modalMdbService: MdbModalService
    ) {}

    ngOnInit(): void {
        this.usuario = this._activatedRouter.snapshot.data.usuario != undefined ? this._activatedRouter.snapshot.data.usuario : {};

        this.initForm()
    }

    initForm(): void {
        this.form = this._formBuilder.group({
            nome: [this.usuario?.name, [Validators.required, Validators.maxLength(30)]],
            tipo: [this.usuario?.tipoUsuario, [Validators.required]],
            senha: [this.usuario?.password.valor, [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
            email: [this.usuario?.email.valor, [
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
                console.log(saveConfirm);
                if(saveConfirm === true) this.salvarCadastro()
            });
        }
    }

    salvarCadastro() {
        if(!this.form.invalid) return;

        const formData = {...this.form.value};

        const usuarioData: Usuario = {
            id: this.usuario?.id,
            name: formData.nome,
            tipoUsuario: formData.tipo,
            password: {
                valor: formData.senha
            },
            email: {
                valor: formData.email
            },
        }

        return this._usuarioService.Salvar(usuarioData).subscribe({
            next: () => this._router.navigate(["/usuario/listar"]),
            error: (err: any) => console.log(err)
        })
    }
}
