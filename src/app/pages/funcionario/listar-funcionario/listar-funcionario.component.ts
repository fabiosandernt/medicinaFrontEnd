import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FuncionarioService } from '../../../shared/services/funcionario.service';

@Component({
  selector: 'app-listar-funcionario',
  templateUrl: './listar-funcionario.component.html',
  styleUrls: ['./listar-funcionario.component.css']
})
export class ComponenteListarFuncionario implements OnInit {

    funcionarios: any

    // PAGINACAO
    tamanhoPagina: number = 6;
    paginaAtual: number = 1;
    totalPagina: number = 0;
    paginas: number[] = [];
    tamanhoColecao: number = 0;
    pagina: number = 1;

    constructor(private _router: Router, private _funcionarioService: FuncionarioService) { }

    ngOnInit(): void {
        this.listar()
    }

    atualizarFuncionario(id: number) {
        this._router.navigate(['/funcionario/atualizar', id]);
    }

    deletarFuncionario(id: number) {
        if(!id) return;

        return this._funcionarioService.Deletar(id).subscribe({
            next: () => this._router.navigate(["/funcionario/atualizar"]),
            error: (err: any) => console.log(err)
        })
    }

    listar(){
        this._funcionarioService.Listar().subscribe((data: any) => {
            this.funcionarios = data.funcionarios;

            this.totalPagina = this.tamanhoColecao;
            this.tamanhoColecao = this.funcionarios.length;

            this.funcionarios.map((funcionario: any) => funcionario).slice(
                (this.pagina - 1) * this.tamanhoPagina,
                (this.pagina - 1) * this.tamanhoPagina + this.tamanhoPagina
            );
        });
    }
}
