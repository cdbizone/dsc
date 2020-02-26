import { JDocumentReference } from "nativescript-plugin-firebase/firebase.android";

export class Event {
    name: string;
    costumesIDs: Array<string>;
    id?: string;

    constructor(config: JDocumentReference) {
        const data = config.data();
        this.id = config.id;
        this.name = data.name;
        this.costumesIDs = data.costumes.map((i) => i.id);
    }
}
