import { Routes } from '@angular/router';

import { ComponenteListarEmpresa } from '../../pages/empresa/listar-empresa/listar-empresa.component';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { ComponenteCriarEmpresa } from '../../pages/empresa/criar-empresa/criar-empresa.component';
import { ComponenteListarUsuario } from '../../pages/usuario/listar-usuario/listar-usuario.component';
import { ComponenteListarFuncionario } from '../../pages/funcionario/listar-funcionario/listar-funcionario.component';
import { ComponenteCriarFuncionario } from '../../pages/funcionario/criar-funcionario/criar-funcionario.component';
import { ComponenteCriarUsuario } from '../../pages/usuario/criar-usuario/criar-usuario.component';
import { ComponenteCriarASO } from '../../pages/aso/criar-aso/criar-aso.component';
import { EmpresaResolve } from '../../pages/empresa/empresa-resolve';
import { ComponenteListarASO } from '../../pages/aso/listar-aso/listar-aso.component';

export const AdminRoutes: Routes = [
    { path: '',                             redirectTo: 'empresa/listar' },
    { path: 'dashboard',                    component: DashboardComponent },
    { path: 'empresa/listar',               component: ComponenteListarEmpresa },
    { path: 'empresa/criar',                component: ComponenteCriarEmpresa },
    { path: 'empresa/atualizar/:id',        component: ComponenteCriarEmpresa, resolve: { empresa: EmpresaResolve } },
    { path: 'usuario/listar',               component: ComponenteListarUsuario },
    { path: 'usuario/criar',                component: ComponenteCriarUsuario },
    { path: 'funcionario/listar',           component: ComponenteListarFuncionario },
    { path: 'funcionario/criar',            component: ComponenteCriarFuncionario },
    { path: 'aso/criar',                    component: ComponenteCriarASO },
    { path: 'aso/listar',                   component: ComponenteListarASO },
];
