import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-modal-cancel',
  templateUrl: './modal-cancel.component.html',
  styleUrls: ['./modal-cancel.component.css']
})
export class  ComponenteModalCancel implements OnInit {

    @Input()
    routeReturn: string;

    // constructor(public activeModal: NgbActiveModal) {}
    constructor(public modalRef: MdbModalRef<ComponenteModalCancel>, private _router: Router) {}

    ngOnInit(): void {}

    routing(){
        return this._router.navigate([this.routeReturn]);
    }
}
