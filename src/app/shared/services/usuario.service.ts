import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class UsuarioService {
    constructor(private _httpClient: HttpClient) {}

    Salvar(values: any): Observable<any> {

        if (values.id) {
            return this._httpClient.put<any>(
                `user/update-user/${values.id}`, values
            );
        }

        return this._httpClient.post<any>(
            "user/create-user", values
        );
    }

    Listar(): Observable<any> {
        return this._httpClient.get<any>(
            `user/list-user`
        );
    }

    ListarPorId(id: any): Observable<any>{
        if(id !== null) {
            return this._httpClient.get<any> (
                `user/list-user/${id}`
            )
        }
    }

    Deletar(id: any): Observable<any>{
        if(id !== null) {
            return this._httpClient.delete<any> (
                `user/delete-user/${id}`
            )
        }
    }
}
