export class Spot {
    private isGiven: boolean = false;
    private value: string;

    constructor(value: string = "") {
        this.set(value);
        if (value) {
            this.isGiven = true;
        }
    }

    public get(): string {
        return this.value;
    }

    public set(value: string) {
        if (value !== "X" && value !== "O" && value !== "") {
            throw new Error(("Invalid value"));
        }
        if (!this.given()) {
            this.value = value;
        }
    }

    public given() {
        return this.isGiven;
    }
}
