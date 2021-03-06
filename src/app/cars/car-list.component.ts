import { Component, OnDestroy, OnInit, ViewContainerRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ListViewEventData } from "nativescript-ui-listview";
import { BehaviorSubject, combineLatest, Subscription } from "rxjs";
import { filter, finalize } from "rxjs/operators";
import { ObservableArray } from "tns-core-modules/data/observable-array";

import { Costume } from "./shared/car.model";
import { CarService } from "./shared/car.service";
import { ModalDialogOptions, ModalDialogService } from "nativescript-angular/modal-dialog";
import { ModalViewActionBarComponent } from "~/app/cars/shared/modal-view-action-bar.component";

@Component({
    selector: "CarsList",
    templateUrl: "./car-list.component.html",
    styleUrls: ["./car-list.component.scss"],
    providers: [ModalDialogService]
})
export class CarListComponent implements OnInit, OnDestroy {

    get cars(): ObservableArray<Costume> {
        return this._cars;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }
    private _isLoading: boolean = false;
    private _cars: ObservableArray<Costume> = new ObservableArray<Costume>([]);
    private _dataSubscription: Subscription;
    private _filterSubject: BehaviorSubject<any>  = new BehaviorSubject(null);
    private filterDef: any;

    constructor(
        private _carService: CarService,
        private _routerExtensions: RouterExtensions,
        private _modalService: ModalDialogService,
        private viewContainerRef: ViewContainerRef
    ) { }

    ngOnInit(): void {
        if (!this._dataSubscription) {
            this._isLoading = true;

            this._dataSubscription = combineLatest(
                this._carService.load().pipe(finalize(() => this._isLoading = false)),
                this._filterSubject.pipe(filter((i) => i !== undefined)),
                (cars, b) => {
                    if (b === null) {
                        this.createFilterFromData(cars);

                        return cars;
                    } else {
                        this.filterDef = b;

                        return cars.filter((car) => {

                            return (
                                this.filterDef.types.every((i) => i.val) ||
                                this.filterDef.types.every((i) => !i.val) ||
                                this.filterDef.types.find((i) => i.name === car.type).val) && (
                                    this.filterDef.colors.every((i) => i.val) ||
                                this.filterDef.colors.every((i) => !i.val) ||
                                this.filterDef.colors.find((i) => i.name === car.color).val
                            );
                        });
                    }

                })
                .subscribe((cars: Array<Costume>) => {
                    this._cars = new ObservableArray(cars);
                    this._isLoading = false;
                });
        }
    }

    ngOnDestroy(): void {
        if (this._dataSubscription) {
            this._dataSubscription.unsubscribe();
            this._dataSubscription = null;
        }
    }

    onCarItemTap(args: ListViewEventData): void {
        const tappedCarItem = args.view.bindingContext;

        this._routerExtensions.navigate(["/cars/car-detail", tappedCarItem.id],
            {
                animated: true,
                transition: {
                    name: "slide",
                    duration: 200,
                    curve: "ease"
                }
            });
    }

    showFiltersDialog() {
        const opts: ModalDialogOptions = {
            context: { filter: JSON.parse(JSON.stringify(this.filterDef)) },
            fullscreen: false,
            viewContainerRef: this.viewContainerRef
        };
        this._modalService.showModal(ModalViewActionBarComponent, opts).then((data) => {
            this._filterSubject.next(data);
        });
    }

    private createFilterFromData(cars: Array<Costume>) {
        console.log(cars);
        this.filterDef = {
            types: [
                {name: "top", val: false},
                {name: "bottom", val: false},
                {name: "one piece", val: false}

            ],
            colors: cars.reduce((accum, car) => {
                const {color: name = null} = <any>car;
                const val = false;
                if (name && !accum.find((i) => i.name === name)) {
                    accum.push({name, val});
                }

                return accum;
            }, [])
        };
    }
}
