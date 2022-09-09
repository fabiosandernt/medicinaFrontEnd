import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutes } from './admin.routing';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { ComponenteListarEmpresa } from '../../pages/empresa/listar-empresa/listar-empresa.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminRoutes),
        FormsModule,
        ChartsModule,
        NgbModule,
        ToastrModule.forRoot()
    ],
    declarations: [
        DashboardComponent,
        ComponenteListarEmpresa,
    ]
})

export class AdminModule {}
