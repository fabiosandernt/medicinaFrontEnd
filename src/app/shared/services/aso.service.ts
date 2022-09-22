import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ASOService {
    constructor(private _httpClient: HttpClient) {}

    Salvar(values: any): Observable<any> {

        if (values.id) {
            return this._httpClient.put<any>(
                `aso/update-aso/${values.id}`, values
            );
        }

        return this._httpClient.post<any>(
            "aso/create-aso", values
        );
    }

    Listar(): Observable<any> {
        return this._httpClient.get<any>(
            `aso/list-aso`
        );
    }

    ListarPorId(id: any): Observable<any>{
        if(id !== null) {
            return this._httpClient.get<any> (
                `aso/list-aso/${id}`
            )
        }
    }

    Deletar(id: any): Observable<any>{
        if(id !== null) {
            return this._httpClient.delete<any> (
                `aso/delete-aso/${id}`
            )
        }
    }
}
