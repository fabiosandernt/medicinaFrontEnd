import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './layouts/admin/admin.component';
import { AuthComponent } from './layouts/auth/auth.component';

const routes: Routes =[
    {
        path: '',
        redirectTo: 'empresa/listar',
        pathMatch: 'full',
    },
    {
        path: '',
        component: AdminComponent,
        children: [
        {
            path: '',
            loadChildren: () => import('./layouts/admin/admin.module').then(x => x.AdminModule)
        }]
    },
    {
        path: 'auth',
        component: AuthComponent,
        children: [
        {
            path: '',
            loadChildren: () => import('./layouts/auth/auth.module').then(x => x.AuthModule)
        }]
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }
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