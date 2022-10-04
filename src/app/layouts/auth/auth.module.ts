import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ToastrModule } from "ngx-toastr";
import { ComponentsModule } from "src/app/components/components.module";
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
        ComponentsModule
    ],
    declarations: [
        ComponenteLogin,
    ]
})

export class AuthModule {}
