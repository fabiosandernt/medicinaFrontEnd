export declare interface Usuario {
    id?: string;
    name: string;
    tipoUsuario: number;
    password: {
        valor: string;
    }
    email: {
        valor: string;
    }
    token?: string;
}
