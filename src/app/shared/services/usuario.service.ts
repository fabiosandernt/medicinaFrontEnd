import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpError } from '../pipes/httpError.pipe';

import { environment } from 'src/environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    constructor(private _httpClient: HttpClient, private _httpError: HttpError) {}

    Salvar(values: any): Observable<any> {

        if (values.id) {
            return this._httpClient.put<any>(
                `Usuario/${values.id}`, values
            ).pipe(catchError(this._httpError.handleError));
        }

        return this._httpClient.post<any>(
            "Usuario", values
        ).pipe(catchError(this._httpError.handleError));
    }

    Listar(): Observable<any> {
        return this._httpClient.get<any>(
            `Usuario`
        ).pipe(catchError(this._httpError.handleError));
    }

    ListarPorId(id: any): Observable<any>{
        if(id !== null) {
            return this._httpClient.get<any> (
                `Usuario/${id}/ObterPorId`
            ).pipe(catchError(this._httpError.handleError));
        }
    }

    Deletar(id: any): Observable<any>{
        if(id !== null) {
            return this._httpClient.delete<any> (
                `Usuario/${id}`
            ).pipe(catchError(this._httpError.handleError));
        }
    }

    // LoginMethod(data: any): Observable<any> {
    //     return this._httpClient.post<any>(
    //         `${environment.apiUrl}/Authentication`, data
    //     ).pipe(catchError(this._httpError.handleError));
    // }
}
