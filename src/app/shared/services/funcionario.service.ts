import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class FuncionarioService {
    constructor(private _httpClient: HttpClient) {}

    Salvar(values: any): Observable<any> {

        if (values.id) {
            return this._httpClient.put<any>(
                `Funcionario/${values.id}`, values
            );
        }

        return this._httpClient.post<any>(
            "Funcionario/", values
        );
    }

    Listar(): Observable<any> {
        return this._httpClient.get<any>(
            `Funcionario/`
        );
    }

    ListarPorId(id: any): Observable<any>{
        if(id !== null) {
            return this._httpClient.get<any> (
                `Funcionario/${id}`
            )
        }
    }

    Deletar(id: any): Observable<any>{
        if(id !== null) {
            return this._httpClient.delete<any> (
                `Funcionario/${id}`
            )
        }
    }
}
