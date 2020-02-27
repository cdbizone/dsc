import { JDocumentReference } from "nativescript-plugin-firebase/firebase.android";

export class Event {
    name: string;
    costumeIDs: Array<string>;
    id?: string;

    constructor(config: JDocumentReference) {
        const data = config.data();
        this.id = config.id;
        this.name = data.name;
        this.costumeIDs = data.costumeIDs;
    }
}
