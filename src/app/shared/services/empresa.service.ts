import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class EmpresaService {
    constructor(private httpClient: HttpClient) {}

    Salvar(values: any): Observable<any> {

        if (values.id) {
            return this.httpClient.put<any>(
                `company/update-company/${values.id}`, values
            );
        }

        return this.httpClient.post<any>(
            "company/create-company", values
        );
    }

    Listar(): Observable<any> {
        return this.httpClient.get<any>(
            `company/list-companies`
        );
    }

    ListarPorId(id: any): Observable<any>{
        if(id !== null) {
            return this.httpClient.get<any> (
                `company/list-company/${id}`
            )
        }
    }

    Deletar(id: any): Observable<any>{
        if(id !== null) {
            return this.httpClient.delete<any> (
                `company/delete-company/${id}`
            )
        }
    }
}
