import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { IconsComponent } from './template/icons/icons.component';
import { UserProfileComponent } from './template/user-profile/user-profile.component';
import { TableListComponent } from './template/table-list/table-list.component';
import { TypographyComponent } from './template/typography/typography.component';
import { MapsComponent } from './template/maps/maps.component';
import { NotificationsComponent } from './template/notifications/notifications.component';
import { ComponenteModalCancel } from './modals/modal-cancel/modal-cancel.component';
import { ComponenteModalConfirm } from './modals/modal-confirm/modal-confirm.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgbModule
    ],
    declarations: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        UserProfileComponent,
        TableListComponent,
        TypographyComponent,
        IconsComponent,
        MapsComponent,
        NotificationsComponent,
        IconsComponent,
        ComponenteModalCancel,
        ComponenteModalConfirm
    ],
    exports: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        UserProfileComponent,
        TableListComponent,
        TypographyComponent,
        IconsComponent,
        MapsComponent,
        NotificationsComponent,
        IconsComponent,
        ComponenteModalCancel,
        ComponenteModalConfirm
    ]
})
export class ComponentsModule { }
