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
import { ComponenteListarUsuario } from '../../pages/usuario/listar-usuario/listar-usuario.component';
import { ComponenteCriarUsuario } from '../../pages/usuario/criar-usuario/criar-usuario.component';
import { ComponenteCriarFuncionario } from '../../pages/funcionario/criar-funcionario/criar-funcionario.component';
import { ComponenteListarFuncionario } from '../../pages/funcionario/listar-funcionario/listar-funcionario.component';
import { ComponenteCriarEmpresa } from '../../pages/empresa/criar-empresa/criar-empresa.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminRoutes),
        FormsModule,
        ReactiveFormsModule,
        ChartsModule,
        NgbModule,
        ToastrModule.forRoot()
    ],
    declarations: [
        DashboardComponent,
        ComponenteListarEmpresa,
        ComponenteCriarEmpresa,
        ComponenteListarUsuario,
        ComponenteCriarFuncionario,
        ComponenteListarFuncionario,
        ComponenteCriarUsuario
    ]
})

export class AdminModule {}
