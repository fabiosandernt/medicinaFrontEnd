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
        this._router.navigate(['/funcionario/atualizar', id]);
    }

    deletar(id: number) {
        if(!id) return;

        return this._usuarioService.Deletar(id).subscribe({
            next: () => this._router.navigate(["/usuario/listar"]),
            error: (err: any) => console.log(err)
        })
    }

    listar(){
        this._usuarioService.Listar().subscribe((data: any) => {
            this.usuarios = data;

            this.totalPagina = data.totalPagina;
            this.tamanhoColecao = this.usuarios.length;

            this.usuarios = data.map(
                (usuario: any, i: any) => ({ id: i + 1, ...usuario })
            ).slice(
                (this.pagina - 1) * this.tamanhoPagina,
                (this.pagina - 1) * this.tamanhoPagina + this.tamanhoPagina
            );
        });
    }
}
