import {Component, NgModule, NO_ERRORS_SCHEMA, OnInit} from "@angular/core";
import { NativeScriptCommonModule, ModalDialogParams } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";

import { CarDetailEditComponent } from "./car-detail-edit/car-detail-edit.component";
import { MyImageAddRemoveComponent } from "./car-detail-edit/my-image-add-remove/my-image-add-remove.component";
import { MyListSelectorModalViewComponent } from "./car-detail-edit/my-list-selector/my-list-selector-modal-view.component"; // tslint:disable-line:max-line-length
import { MyListSelectorComponent } from "./car-detail-edit/my-list-selector/my-list-selector.component";
import { CarDetailComponent } from "./car-detail/car-detail.component";
import { CarListComponent } from "./car-list.component";
import { CarsRoutingModule } from "./cars-routing.module";
import { TNSCheckBoxModule } from '@nstudio/nativescript-checkbox/angular';

@Component({
    moduleId: module.id,
    template: "<FlexboxLayout flexDirection=\"column\" width=\"300\" height=\"auto\" backgroundColor=\"white\">\n    <Label [text]=\"\'Costume Types\'\" class=\"modal-input__header\"></Label>\n    \n    <CheckBox #el *ngFor=\"let type of _params.context.filter.types\" text=\"{{type.name | titlecase }}\" class=\'modal-input__list-item\' checked=\"{{!!type.val}}\" (checkedChange)=\"onTypeFilterCheckedChange(el, _params.context.filter.types)\"></CheckBox>\n    <Label [text]=\"\'Costume Colors\'\" class=\"modal-input__header\"></Label>\n    <CheckBox #el *ngFor=\"let color of _params.context.filter.colors\" fillColor=\"{{color.name}}\" text=\"{{color.name | titlecase }}\" class=\'modal-input__list-item\' checked=\"{{!!color.val}}\" (checkedChange)=\"onTypeFilterCheckedChange(el, _params.context.filter.colors)\"></CheckBox>\n    <Button alignSelf=\'flex-end\' class=\"-outline\" row=\"3\" text=\"Apply filters\" ios:visibility=\"collapsed\" horizontalAlignment=\"right\" (tap)=\"applyFilters()\"></Button>\n</FlexboxLayout>",
    styleUrls: ["./car-detail-edit/my-list-selector/my-list-selector-modal-view.component.scss"]
})
export class ModalViewActionBarComponent implements OnInit {
    constructor(public _params: ModalDialogParams ) {
        console.log(_params.context.filter);
    }

    ngOnInit(): void {}
    applyFilters(): void {
        this._params.closeCallback(this._params.context.filter);
    }

    onTypeFilterCheckedChange(el, arr) {
        const type = el.text.toLowerCase();
        arr.find(({name})=>name===type).val = el.checked;
    }
}

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
        CarDetailEditComponent,
        MyListSelectorComponent,
        MyListSelectorModalViewComponent,
        MyImageAddRemoveComponent,
        ModalViewActionBarComponent
    ],
    entryComponents: [
        MyListSelectorModalViewComponent,
        ModalViewActionBarComponent
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CarsModule { }
