import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';

import { AdminComponent } from './layouts/admin/admin.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';

import { httpInterceptorProviders } from './shared/modules/auth.interceptors';

import { MdbModalModule } from 'mdb-angular-ui-kit/modal'

import { MatDialogModule } from "@angular/material/dialog";
import { AuthService } from './shared/services/auth.service';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

export function jwtOptionFactor(authService: AuthService){
    return {
        tokenGetter:() => {
            return authService.isTokenValid();
        },
        allowedDomains:["localhost:4000"],
        disallowedRoutes:[
            "http://localhost:4000/auth/login"
        ]
    }
}

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        ComponentsModule,
        RouterModule,
        AppRoutingModule,
        NgbModule,
        ToastrModule.forRoot(),
        CommonModule,
        MdbModalModule,
        MatDialogModule,
        JwtModule.forRoot
        ({
            jwtOptionsProvider:{
                provide: JWT_OPTIONS,
                useFactory: jwtOptionFactor,
                deps:[AuthService]
            }
        })
    ],
    declarations: [
        AppComponent,
        AdminComponent,
        AuthComponent
    ],
    providers:
    [
        { provide: LOCALE_ID,       useValue: 'pt-BR' },
        { provide: APP_BASE_HREF,   useValue: '/' },
        httpInterceptorProviders
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
