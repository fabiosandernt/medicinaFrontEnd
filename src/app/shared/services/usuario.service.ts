import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpError } from '../pipes/httpError.pipe';

@Injectable({
    providedIn: 'root'
})

export class UsuarioService {
    constructor(private _httpClient: HttpClient, private _httpError: HttpError) {}

    Salvar(values: any): Observable<any> {

        if (values.id) {
            return this._httpClient.put<any>(
                `user/update-user/${values.id}`, values
            ).pipe(catchError(this._httpError.handleError));
        }

        return this._httpClient.post<any>(
            "user/create-user", values
        ).pipe(catchError(this._httpError.handleError));
    }

    Listar(): Observable<any> {
        return this._httpClient.get<any>(
            `user/list-user`
        ).pipe(catchError(this._httpError.handleError));
    }

    ListarPorId(id: any): Observable<any>{
        if(id !== null) {
            return this._httpClient.get<any> (
                `user/list-user/${id}`
            ).pipe(catchError(this._httpError.handleError));
        }
    }

    Deletar(id: any): Observable<any>{
        if(id !== null) {
            return this._httpClient.delete<any> (
                `user/delete-user/${id}`
            ).pipe(catchError(this._httpError.handleError));
        }
    }
}
