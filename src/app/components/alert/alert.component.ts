import { Input, Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})

export class ComponenteAlert {
    @Input()
    tipo: 'success' | 'info' | 'warning' | 'danger' = null;
    titulo: string = '';
    mensagem: string = '';
    icone?: string = ''; //'ui-2_like' | 'travel_info' | 'ui-1_bell-53' | 'objects_support-17'
    change: boolean = false;

    constructor(private toastr: ToastrService) {}

    ngOnInit() {
        if(this.change == true) this.showAlert(this.tipo)
    }

    showAlert(tipo: string){
        const from = 'top'
        const align = 'right'
        // const color = Math.floor((Math.random() * 5) + 1);

        const tiposAlert = [
            'success',
            'info',
            'warning',
            'danger'
        ]

        const tipoAlertSelecionado = tiposAlert.indexOf(tipo);

        switch(tipoAlertSelecionado){
            case 1:
                this.toastr.info('<span class="now-ui-icons ui-1_bell-53"></span> {{ titulo }} </b> - {{ mensagem }}', '', {
                    timeOut: 8000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-info alert-with-icon",
                    positionClass: 'toast-' + from + '-' +  align
                });
            break;
            case 2:
            this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> Welcome to <b>Now Ui Dashboard</b> - a beautiful freebie for every web developer.', '', {
                timeOut: 8000,
                closeButton: true,
                enableHtml: true,
                toastClass: "alert alert-success alert-with-icon",
                positionClass: 'toast-' + from + '-' +  align
            });
            break;
            case 3:
            this.toastr.warning('<span class="now-ui-icons ui-1_bell-53"></span> Welcome to <b>Now Ui Dashboard</b> - a beautiful freebie for every web developer.', '', {
                timeOut: 8000,
                closeButton: true,
                enableHtml: true,
                toastClass: "alert alert-warning alert-with-icon",
                positionClass: 'toast-' + from + '-' +  align
            });
            break;
            case 4:
            this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span> {{ titulo }} </b> - {{ mensagem }}', '', {
                timeOut: 8000,
                enableHtml: true,
                closeButton: true,
                toastClass: "alert alert-danger alert-with-icon",
                positionClass: 'toast-' + from + '-' +  align
            });
            break;
            case 5:
            this.toastr.show('<span class="now-ui-icons ui-1_bell-53"></span> Welcome to <b>Now Ui Dashboard</b> - a beautiful freebie for every web developer.', '', {
                timeOut: 8000,
                closeButton: true,
                enableHtml: true,
                toastClass: "alert alert-primary alert-with-icon",
                positionClass: 'toast-' + from + '-' +  align
                });
            break;

            default:
            break;
        }
    }
}
