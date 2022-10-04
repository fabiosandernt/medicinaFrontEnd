import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.css']
})
export class  ComponenteModalConfirm implements OnInit {

    @Output() saveConfirm: boolean = false;

    constructor(public modalRef: MdbModalRef<ComponenteModalConfirm>, private _router: Router) {}

    ngOnInit(): void {}

    close(): void {
        this.changeSaveConfirm(true)
        this.modalRef.close(this.saveConfirm)
    }

    changeSaveConfirm(value: boolean){
        if(!value == null) return;
        return this.saveConfirm = value;
    }
}
