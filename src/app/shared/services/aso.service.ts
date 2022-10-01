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
                `Aso/${values.id}`, values
            );
        }

        return this._httpClient.post<any>(
            "Aso/", values
        );
    }

    Listar(): Observable<any> {
        return this._httpClient.get<any>(
            `Aso`
        );
    }

    ListarPorId(id: any): Observable<any>{
        if(id !== null) {
            return this._httpClient.get<any> (
                `Aso/${id}`
            )
        }
    }

    Deletar(id: any): Observable<any>{
        if(id !== null) {
            return this._httpClient.delete<any> (
                `Aso/${id}`
            )
        }
    }
}
