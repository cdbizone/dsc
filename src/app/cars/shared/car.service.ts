import { Injectable, NgZone } from "@angular/core";
import * as firebase from "nativescript-plugin-firebase";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { Costume } from "./car.model";
import { Event } from "./event.model";
import { JCollectionReference } from "nativescript-plugin-firebase/firebase.android";

const editableProperties = [
    "doors",
    "imageUrl",
    "luggage",
    "name",
    "price",
    "seats",
    "transmission",
    "class"
];

/* ***********************************************************
* This is the master detail data service. It handles all the data operations
* of retrieving and updating the data. In this case, it is connected to Firebase and
* is using the {N} Firebase plugin. Learn more about it here:
* https://github.com/EddyVerbruggen/nativescript-plugin-firebase
* The {N} Firebase plugin needs some initialization steps before the app starts.
* Check out how it is imported in the main.ts file and the actual script in /shared/firebase.common.ts file.
*************************************************************/
@Injectable({
    providedIn: "root"
})
export class CarService {
    private static cloneUpdateModel(car: Costume): object {
        return editableProperties.reduce((a, e) => (a[e] = car[e], a), {}); // tslint:disable-line:ban-comma-operator
    }

    private _cars: Array<Costume> = [];
    private _events: Array<Event> = [];

    constructor(private _ngZone: NgZone) { }

    get events(): Array<Event> {
        return this._events;
    }

    getCarById(id: string): Costume {
        if (!id) {
            return;
        }

        return this._cars.filter((car) => {
            return car.id === id;
        })[0];
    }

    load(): Observable<any> {
        return new Observable((observer: any) => {
            const onValueEvent = (snapshot: [JCollectionReference, JCollectionReference]) => {
                this._ngZone.run(() => {
                    const results = this.handleSnapshot(...snapshot);
                    observer.next(results);
                });
            };
            Promise.all([
                firebase.firestore.collection("costumes").get(),
                firebase.firestore.collection("events").get()
            ]).then(onValueEvent);

        }).pipe(catchError(this.handleErrors));

    }

    async assignCostumeFromEvent(costumeId: string, eventId: string) {
        try {

            const eventRef = await firebase.firestore.collection("events").doc(eventId);

            return await eventRef.update({costumeIDs: firebase.firestore.FieldValue.arrayUnion(costumeId)});
        } catch (e) {
            console.error(e);
            throw new Error("Some error has occurred on add costume to event");
        }
    }

    async depriveCostumeToEvent(costumeId: string, eventId: string) {

        try {
            const eventRef = await firebase.firestore.collection("events").doc(eventId);

            return await eventRef.update({costumeIDs: firebase.firestore.FieldValue.arrayRemove(costumeId)})

        } catch (e) {
            throw new Error("Some error has occurred on removing costume from event");
        }
    }

    private handleSnapshot(
        costumeCollectionReference: JCollectionReference,
        eventCollectionReference: JCollectionReference
    ): Array<Costume> {
        this._cars = [];
        this._events = [];
        costumeCollectionReference.forEach((doc) => {
            const {id} = doc;
            const data = doc.data();
            this._cars.push({id, ...data});
        });
        eventCollectionReference.forEach((doc) => {
            this._events.push(new Event(doc));
        });

        return this._cars;
    }

    private handleErrors(error: Response): Observable<never> {
        return throwError(error);
    }
}
