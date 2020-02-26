import { Component, NgModule, NO_ERRORS_SCHEMA, OnInit } from "@angular/core";
import { NativeScriptCommonModule, ModalDialogParams } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { CarDetailComponent } from "./car-detail/car-detail.component";
import { CarListComponent } from "./car-list.component";
import { CarsRoutingModule } from "./cars-routing.module";
import { TNSCheckBoxModule } from "@nstudio/nativescript-checkbox/angular";
import { ModalViewActionBarComponent } from "~/app/cars/shared/modal-view-action-bar.component";
import { EventsPickerComponent } from "~/app/cars/shared/event-picker.component";

@NgModule({
    imports: [
        CarsRoutingModule,
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptUIListViewModule,
        TNSCheckBoxModule
    ],
    declarations: [
        CarListComponent,
        CarDetailComponent,
        ModalViewActionBarComponent,
        EventsPickerComponent
    ],
    entryComponents: [
        ModalViewActionBarComponent,
        EventsPickerComponent
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CarsModule { }
