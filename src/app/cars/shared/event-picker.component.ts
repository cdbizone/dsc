import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/common";

@Component({
    moduleId: module.id,
    template: `<GridLayout class="picker">
    <RadListView [items]="events">
        <ng-template tkListItemTemplate let-event="item">
            <StackLayout verticalAlignment="center">
                <Button [text]="event.name" (tap)="onSelect(event)"></Button>
            </StackLayout>
        </ng-template>
    </RadListView>
</GridLayout>`,
    styles: [
        `
.picker {
    background-color: white;
    color: black;
    width: 300;
    height: 400;
}

`
    ]
})
export class EventsPickerComponent implements OnInit {
    events: Array<any>;
    constructor(public _params: ModalDialogParams) {

    }

    ngOnInit(): void {
        this.events = this._params.context.events;
    }

    onSelect(event) {
        this._params.closeCallback(event);
    }
}
