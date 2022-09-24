import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ToastrModule } from "ngx-toastr";
import { ComponenteLogin } from "../../pages/login/login.component";
import { AuthRoutes } from "./auth.routing";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AuthRoutes),
        FormsModule,
        NgbModule,
        ToastrModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
        ComponenteLogin,
    ]
})

export class AuthModule {}
