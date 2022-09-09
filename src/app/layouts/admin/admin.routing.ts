import { Routes } from '@angular/router';

import { ComponenteListarEmpresa } from '../../pages/empresa/listar-empresa/listar-empresa.component';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { ComponenteCriarEmpresa } from '../../pages/empresa/criar-empresa/criar-empresa.component';

export const AdminRoutes: Routes = [
    { path: 'dashboard',            component: DashboardComponent },
    { path: 'empresa/listar',       component: ComponenteListarEmpresa },
    { path: 'empresa/criar',        component: ComponenteCriarEmpresa },
    //{ path: 'user-profile',   component: UserProfileComponent },
    //{ path: 'table-list',     component: TableListComponent },
    //{ path: 'typography',     component: TypographyComponent },
    //{ path: 'icons',          component: IconsComponent },
    //{ path: 'maps',           component: MapsComponent },
    //{ path: 'notifications',  component: NotificationsComponent },
    //{ path: 'upgrade',        component: UpgradeComponent }
];
