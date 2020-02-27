export class Costume {
    id: string;
    name: string;
    imageUrl: string;
    color: string;
    type: string;
    description: string;

    constructor(options: any) {
        this.id = options.id;
        this.name = options.name;
        this.imageUrl = options.imageUrl;
        this.color = options.color;
        this.type = options.type;
        this.description = options.description;
    }
}
