import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { CarDetailComponent } from "./car-detail/car-detail.component";
import { CarListComponent } from "./car-list.component";

const routes: Routes = [
    { path: "", component: CarListComponent },
    { path: "car-detail/:id", component: CarDetailComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class CarsRoutingModule { }
