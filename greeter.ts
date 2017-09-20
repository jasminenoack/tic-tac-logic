export class Greeter {
    name: string;

    constructor(name: string) {
        this.name = name
    }

    greet() {
        console.log("Hello,", this.name)
    }
}
