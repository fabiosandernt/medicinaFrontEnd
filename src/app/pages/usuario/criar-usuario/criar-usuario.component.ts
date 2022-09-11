import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-criar-usuario',
  templateUrl: './criar-usuario.component.html',
  styleUrls: ['./criar-usuario.component.css']
})
export class ComponenteCriarUsuario implements OnInit {
    form: FormGroup;
    usuario: any;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.initForm()
    }

    initForm() {
        this.form = this.formBuilder.group({
            nome: [this.usuario?.nome, [Validators.required, Validators.maxLength(30)]],
            tipo: [this.usuario?.tipo, [Validators.required]],
            senha: [this.usuario?.tipo, [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
            email: [this.usuario?.email, [Validators.required, Validators.pattern("^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+).(\.[a-z]{2,3})$"), Validators.maxLength(50)]],
        });
    }
}
