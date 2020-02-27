import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { switchMap } from "rxjs/operators";

import { Costume } from "../shared/car.model";
import { CarService } from "../shared/car.service";
import { ModalDialogOptions, ModalDialogService } from "nativescript-angular/modal-dialog";
import { EventsPickerComponent } from "~/app/cars/shared/event-picker.component";

/* ***********************************************************
* This is the item details component in the master-detail structure.
* This component retrieves the passed parameter from the master list component,
* finds the data item by this parameter and displays the detailed data item information.
*************************************************************/
@Component({
    selector: "CarDetail",
    templateUrl: "./car-detail.component.html",
    providers: [ModalDialogService]
})
export class CarDetailComponent implements OnInit {
    notAssignedEvents = [];
    assignedEvents = [];
    private _car: Costume;

    constructor(
        private _carService: CarService,
        private _pageRoute: PageRoute,
        private _routerExtensions: RouterExtensions,
        private _modalService: ModalDialogService,
        private viewContainerRef: ViewContainerRef
    ) { }

    /* ***********************************************************
    * Use the "ngOnInit" handler to get the data item id parameter passed through navigation.
    * Get the data item details from the data service using this id and assign it to the
    * private property that holds it inside the component.
    *************************************************************/
    ngOnInit(): void {
        /* ***********************************************************
        * Learn more about how to get navigation parameters in this documentation article:
        * http://docs.nativescript.org/angular/core-concepts/angular-navigation.html#passing-parameter
        *************************************************************/
        this._pageRoute.activatedRoute
            .pipe(switchMap((activatedRoute) => activatedRoute.params))
            .forEach((params) => {
                const carId = params.id;

                this._car = this._carService.getCarById(carId);
                this._carService.events.forEach((event) => {
                    if (event.costumeIDs.indexOf(carId) === -1) {
                        this.notAssignedEvents.push(event);
                    } else {
                        this.assignedEvents.push(event);
                    }
                });
            });
    }

    get car(): Costume {
        return this._car;
    }

    /* ***********************************************************
    * The back button is essential for a master-detail feature.
    *************************************************************/
    onBackButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }

    /* ***********************************************************
    * The master-detail template comes with an example of an item edit page.
    * Check out the edit page in the /cars/car-detail-edit folder.
    *************************************************************/
    addToEvent(): void {
        if (!this.notAssignedEvents.length) {
            alert({
                title: "Warning",
                message: "You have no event to add",
                okButtonText: "Close"
            });

            return;
        }
        const opts: ModalDialogOptions = {
            context: { events: this.notAssignedEvents },
            fullscreen: false,
            viewContainerRef: this.viewContainerRef
        };
        this._modalService.showModal(EventsPickerComponent, opts).then((event) => {
            if (!event) {
                return;
            }
            this._carService.assignCostumeFromEvent(this._car.id, event.id).then((ref) => {
                event.costumesIDs.push(this._car.id);
                this.assignedEvents.push(
                    ...this.notAssignedEvents.splice(this.notAssignedEvents.findIndex((i) => i === event), 1)
                );
            }).catch((e) => console.log({e}));

        });
    }

    removeEvent(event) {
        const options = {
            title: "Deprive from Event",
            message: `Are you sure you want not to use "${this._car.name}" for "${event.name}" event?`,
            okButtonText: "Yes",
            cancelButtonText: "No",
            neutralButtonText: "Cancel"
        };

        (confirm as any)(options).then((result: boolean) => {
            if (result) {
                this._carService.depriveCostumeToEvent(this._car.id, event.id).then((ref) => {
                    event.costumesIDs.splice(event.costumesIDs.indexOf(this._car.id), 1);
                    this.notAssignedEvents.push(
                        ...this.assignedEvents.splice(this.assignedEvents.findIndex((i) => i === event), 1)
                    );
                }).catch((e) => console.log({e}));
                console.log(this.notAssignedEvents);
            }
        });

    }
}
