import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsuarioService } from '../../../shared/services/usuario.service';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ComponenteListarUsuario implements OnInit {

    usuarios: any

    // PAGINACAO
    tamanhoPagina: number = 6;
    paginaAtual: number = 1;
    totalPagina: number = 0;
    paginas: number[] = [];
    tamanhoColecao: number = 0;
    pagina: number = 1;

    constructor(private _router: Router, private _usuarioService: UsuarioService) { }

    ngOnInit(): void {
        this.listar()
    }

    atualizar(id: number) {
        this._router.navigate(['/usuario/atualizar', id]);
    }

    deletar(id: number) {
        if(!id) return;

        return this._usuarioService.Deletar(id).subscribe({
            next: () => this._router.navigate(["/usuario/listar"]),
            error: (err: any) => console.log(err)
        })
    }

    enumFuncao(value: any) {
        enum Funcao {
            "Administrador" = 1,
            "Clínica",
            "Cliente"
        }

        return Funcao[value]
    }

    listar(){
        this._usuarioService.Listar().subscribe((data: any) => {
            this.usuarios = data.usuarios;

            this.usuarios.forEach((usuario: any) => {
                usuario.tipoUsuario = this.enumFuncao(usuario.tipoUsuario)
            });

            this.tamanhoColecao = this.usuarios.length;
            this.totalPagina = data.tamanhoColecao;

            this.usuarios.map(
                (usuario: any) => usuario
            ).slice(
                (this.pagina - 1) * this.tamanhoPagina,
                (this.pagina - 1) * this.tamanhoPagina + this.tamanhoPagina
            );
        });
    }
}
