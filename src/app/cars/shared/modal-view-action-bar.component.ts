import { Component } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/common";

@Component({
    moduleId: module.id,
    template: "<FlexboxLayout flexDirection=\"column\" width=\"300\" height=\"auto\" backgroundColor=\"white\">\n    <Label [text]=\"\'Costume Types\'\" class=\"modal-input__header\"></Label>    \n    <CheckBox #el *ngFor=\"let type of params.context.filter.types\" text=\"{{type.name | titlecase }}\" class=\'modal-input__list-item\' checked=\"{{!!type.val}}\" (checkedChange)=\"onTypeFilterCheckedChange(el, params.context.filter.types)\"></CheckBox>\n    <Label [text]=\"\'Costume Colors\'\" class=\"modal-input__header\"></Label>\n    <CheckBox #el *ngFor=\"let color of params.context.filter.colors\" fillColor=\"{{color.name}}\" text=\"{{color.name | titlecase }}\" class=\'modal-input__list-item\' checked=\"{{!!color.val}}\" (checkedChange)=\"onTypeFilterCheckedChange(el, params.context.filter.colors)\"></CheckBox>\n    <Button alignSelf=\'flex-end\' class=\"-outline\" row=\"3\" text=\"Apply filters\" horizontalAlignment=\"right\" (tap)=\"applyFilters()\"></Button>\n</FlexboxLayout>",
    styleUrls: ["../car-detail-edit/my-list-selector/my-list-selector-modal-view.component.scss"]
})
export class ModalViewActionBarComponent {
    constructor(public params: ModalDialogParams) {
        console.log(params.context.filter);
    }

    applyFilters(): void {
        this.params.closeCallback(this.params.context.filter);
    }

    onTypeFilterCheckedChange(el, arr) {
        const type = el.text.toLowerCase();
        arr.find(({name}) => name === type).val = el.checked;
    }
}
