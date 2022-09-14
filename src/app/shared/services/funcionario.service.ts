import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class FuncionarioService {
    constructor(private httpClient: HttpClient) {}

    Salvar(values: any): Observable<any> {

        if (values.id) {
            return this.httpClient.put<any>(
                `employee/update-employee/${values.id}`, values
            );
        }

        return this.httpClient.post<any>(
            "employee/create-employee", values
        );
    }

    Listar(): Observable<any> {
        return this.httpClient.get<any>(
            `employee/list-employees`
        );
    }

    ListarPorId(id: any): Observable<any>{
        if(id !== null) {
            return this.httpClient.get<any> (
                `employee/list-employee/${id}`
            )
        }
    }

    Deletar(id: any): Observable<any>{
        if(id !== null) {
            return this.httpClient.delete<any> (
                `employee/delete-employee/${id}`
            )
        }
    }
}
