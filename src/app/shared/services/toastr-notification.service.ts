import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({
    providedIn: 'root',
})
export class ToastrNotificationService {
    public from = 'top'
    public align = 'right'

    constructor(private toastrService: ToastrService) {}

    success() {
        this.toastrService.success('<span class="now-ui-icons ui-1_check"></span> Cadastro realizado com sucesso </b> - Veja as informações cadastradas abaixo!', '', {
            timeOut: 6000,
            enableHtml: true,
            closeButton: true,
            toastClass: "alert alert-success alert-with-icon",
            positionClass: 'toast-' + this.from + '-' +  this.align
        });
    }

    error() {
        this.toastrService.error('<span class="now-ui-icons tim-icons icon-alert-circle-exc"></span> Não foi possível fazer o cadastro </b> - Por favor tente novamente mais tarde!', '', {
            timeOut: 6000,
            enableHtml: true,
            closeButton: true,
            toastClass: "alert alert-danger alert-with-icon",
            positionClass: 'toast-' + this.from + '-' +  this.align
        });
    }

    successLogin() {
        this.toastrService.success('<span class="now-ui-icons ui-1_check"></span> Login bem sucedido </b> - Bem vindo(a)!', '', {
            timeOut: 6000,
            enableHtml: true,
            closeButton: true,
            toastClass: "alert alert-success alert-with-icon",
            positionClass: 'toast-' + this.from + '-' +  this.align
        });
    }

    errorLogin() {
        this.toastrService.error('<span class="now-ui-icons tim-icons icon-alert-circle-exc"></span> Login inválido </b> - Verifique o email e a senha, e tente novamente!', '', {
            timeOut: 6000,
            enableHtml: true,
            closeButton: true,
            toastClass: "alert alert-danger alert-with-icon",
            positionClass: 'toast-' + this.from + '-' +  this.align
        });
    }
}
