import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import Bootstrap from 'bootstrap';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    pathSubItem?: string;
    idMenu?: boolean;
}
export const ROUTES: RouteInfo[] = [
    //{ path: '/dashboard', title: 'Dashboard',  icon: 'design_app', class: '', idMenu: true },
    {
        path: '/empresa/listar',
        title: 'Empresa',
        icon: 'business_chart-bar-32',
        class: '',
        pathSubItem: '/empresa/criar',
        idMenu: true
    },
    {
        path: '/funcionario/listar',
        title: 'Funcionário',
        icon: 'business_badge',
        class: '',
        pathSubItem: '/funcionario/criar',
        idMenu: true
    },
    {
        path: '/aso/criar',
        title: 'ASO',
        icon: 'files_paper',
        class: '',
        idMenu: true
    },
    /*{ path: '/icons', title: 'Icons',  icon:'education_atom', class: '' },
    { path: '/maps', title: 'Maps',  icon:'location_map-big', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'ui-1_bell-53', class: '' },
    { path: '/user-profile', title: 'User Profile',  icon:'users_single-02', class: '' },
    { path: '/table-list', title: 'Table List',  icon:'design_bullet-list-67', class: '' },
    { path: '/typography', title: 'Typography',  icon:'text_caps-small', class: '' },
    { path: '/upgrade', title: 'Upgrade to PRO',  icon:'objects_spaceship', class: 'active active-pro' }*/
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    menuItems: any[];

    public isCollapsed = true;

    constructor(private _el: ElementRef) { }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

    isMobileMenu() {
        if ( window.innerWidth > 991) {
            return false;
        }
        return true;
    };
}
