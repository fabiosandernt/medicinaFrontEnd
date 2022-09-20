import {Component} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

/**
 * @title Dialog Animations
 */
@Component({
  selector: 'app-modal',
  styleUrls: ['modal-mat.component.css'],
  templateUrl: 'modal-mat.component.html',
})
export class ComponenteModalMat {

    constructor(
        public dialogRef: MatDialogRef<ComponenteModalMat>
    ) {}
}
