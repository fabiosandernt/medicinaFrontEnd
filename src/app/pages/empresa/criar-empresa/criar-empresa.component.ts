import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-criar-empresa',
    templateUrl: './criar-empresa.component.html',
    styleUrls: ['./criar-empresa.component.css']
})
export class ComponenteCriarEmpresa implements OnInit {
    closeResult: string;

    constructor(private modalService: NgbModal) {}

    ngOnInit(): void {}

    open(content: any) {
        this.modalService.open(content, {
            windowClass: 'modal-mini modal-primary', size: 'sm' }).result.then((result: any) => {
            this.closeResult = `Closed with: ${result}`;
        },
        (reason: any) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }
}
