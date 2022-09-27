import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ASOService } from '../../../shared/services/aso.service';

@Component({
  selector: 'app-listar-aso',
  templateUrl: './listar-aso.component.html',
  styleUrls: ['./listar-aso.component.css']
})
export class ComponenteListarASO implements OnInit {

    asos: any;

    // PAGINACAO
    tamanhoPagina: number = 6;
    paginaAtual: number = 1;
    totalPagina: number = 0;
    paginas: number[] = [];
    tamanhoColecao: number = 0;
    pagina: number = 1;

    constructor(private _router: Router, private _asoService: ASOService) { }

    ngOnInit(): void {
        this.listar()
    }

    atualizarEmpresa(id: number) {
        this._router.navigate(['/aso/atualizar', id]);
    }

    deletarEmpresa(id: number) {
        if(!id) return;

        return this._asoService.Deletar(id).subscribe({
            next: () => this._router.navigate(["/aso/listar"]),
            error: (err: any) => console.log(err)
        })
    }

    listar(){
        this._asoService.Listar().subscribe((data: any) => {
            this.asos = data;

            this.totalPagina = data.totalPagina;
            this.tamanhoColecao = this.asos.length;

            this.asos = data.map(
                (aso: any, i: any) => ({ id: i + 1, ...aso })
            ).slice(
                (this.pagina - 1) * this.tamanhoPagina,
                (this.pagina - 1) * this.tamanhoPagina + this.tamanhoPagina
            );
        });
    }
}
