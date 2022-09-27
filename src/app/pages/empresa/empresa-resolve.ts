import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { EmpresaService } from "../../shared/services/empresa.service";

@Injectable({
    providedIn: "root"
})
export class EmpresaResolve implements Resolve<Observable<any>> {

    constructor(private empresaService: EmpresaService){}

    resolve(route: ActivatedRouteSnapshot): Observable<any> | Observable<Observable<any>> {
        const id = route.params.id;

        if (!id) throw new Error('Id não encontrado.');

        return this.empresaService.ListarPorId(parseInt(id));
    }
}
