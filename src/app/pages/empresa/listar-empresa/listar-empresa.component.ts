import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EmpresaService } from '../../../shared/services/empresa.service';

@Component({
  selector: 'app-listar-empresa',
  templateUrl: './listar-empresa.component.html',
  styleUrls: ['./listar-empresa.component.css']
})
export class ComponenteListarEmpresa implements OnInit {

    empresas: any;

    // PAGINACAO
    tamanhoPagina: number = 6;
    paginaAtual: number = 1;
    totalPagina: number = 0;
    paginas: number[] = [];
    tamanhoColecao: number = 0;
    pagina: number = 1;

    constructor(private _router: Router, private empresaService: EmpresaService) { }

    ngOnInit(): void {
        this.listar()
    }

    atualizarEmpresa(id: number) {
        this._router.navigate(['/empresa/atualizar', id]);
    }

    deletarEmpresa(id: number) {
        if(!id) return;

        return this.empresaService.Deletar(id).subscribe({
            next: () => this._router.navigate(["company/list"]),
            error: (err: any) => console.log(err)
        })
    }

    listar(){
        this.empresaService.Listar().subscribe((data: any) => {
            this.empresas = data;

            this.totalPagina = data.totalPagina;
            this.tamanhoColecao = this.empresas.length;

            this.empresas = data.map(
                (empresa: any, i: any) => ({ id: i + 1, ...empresa })
            ).slice(
                (this.pagina - 1) * this.tamanhoPagina,
                (this.pagina - 1) * this.tamanhoPagina + this.tamanhoPagina
            );
        });
    }
}
