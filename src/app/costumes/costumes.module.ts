import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {NativeScriptCommonModule} from "nativescript-angular/common";
import {NativeScriptFormsModule} from "nativescript-angular/forms";
import {NativeScriptUIListViewModule} from "nativescript-ui-listview/angular";
import {MyImageAddRemoveComponent} from "../cars/car-detail-edit/my-image-add-remove/my-image-add-remove.component";
import {MyListSelectorModalViewComponent} from "../cars/car-detail-edit/my-list-selector/my-list-selector-modal-view.component"; // tslint:disable-line:max-line-length
import {MyListSelectorComponent} from "../cars/car-detail-edit/my-list-selector/my-list-selector.component";

@NgModule({
    imports: [
//        CarsRoutingModule,
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptUIListViewModule
    ],
    declarations: [
        // CarListComponent,
        // CarDetailComponent,
        // CarDetailEditComponent,
        MyListSelectorComponent,
        MyListSelectorModalViewComponent,
        MyImageAddRemoveComponent
    ],
    entryComponents: [
        MyListSelectorModalViewComponent
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CostumesModule { }
