import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes: Routes = [
    { path: "", redirectTo: "/cars", pathMatch: "full" },
    { path: "cars", loadChildren: () => import("~/app/cars/cars.module").then((m) => m.CarsModule) }
    //{ path: "costumes", loadChildren: () => import("~/app/costumes/costumes.module").then((m) => m.CostumesModule) }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
