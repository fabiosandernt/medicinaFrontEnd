import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/shared/models/usuario';
import { UsuarioService } from '../../../shared/services/usuario.service';

@Component({
  selector: 'app-criar-usuario',
  templateUrl: './criar-usuario.component.html',
  styleUrls: ['./criar-usuario.component.css']
})
export class ComponenteCriarUsuario implements OnInit {
    form: FormGroup;
    usuario: Usuario;

    constructor(
        private _formBuilder: FormBuilder,
        private _activatedRouter: ActivatedRoute,
        private _usuarioService: UsuarioService,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this.usuario = this._activatedRouter.snapshot.data.usuario != undefined ? this._activatedRouter.snapshot.data.usuario : {};

        this.initForm()
    }

    initForm() {
        this.form = this._formBuilder.group({
            nome: [this.usuario?.nome, [Validators.required, Validators.maxLength(30)]],
            tipo: [this.usuario?.tipo, [Validators.required]],
            senha: [this.usuario?.tipo, [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
            email: [this.usuario?.email, [Validators.required, Validators.pattern("^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+).(\.[a-z]{2,3})$"), Validators.maxLength(50)]],
        });
    }

    salvarCadastro() {
        if(!this.form.invalid) return;

        const formData = {...this.form.value};

        const usuarioData: Usuario = {
            id: this.usuario?.id,
            nome: formData.nome,
            tipo: formData.tipo,
            senha: formData.senha,
            email: formData.email
        }

        return this._usuarioService.Salvar(usuarioData).subscribe({
            next: () => this._router.navigate(["/usuario/listar"]),
            error: (err: any) => console.log(err)
        })
    }
}
