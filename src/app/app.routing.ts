import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './layouts/admin/admin.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { AuthorizeGuard } from './shared/guards/authorize.guard';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children:
        [
            {
                path: '',
                loadChildren: () => import('./layouts/admin/admin.module').then(x => x.AdminModule)
            }
        ],
        canActivate: [AuthorizeGuard]
    },
    {
        path: 'auth',
        component: AuthComponent,
        children:
        [
            {
                path: '',
                loadChildren: () => import('./layouts/auth/auth.module').then(x => x.AuthModule)
            }
        ]
    },
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [],
})
export class AppRoutingModule { }
