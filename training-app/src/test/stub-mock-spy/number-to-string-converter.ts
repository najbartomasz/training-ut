export class NumberToStringConverter {
    readonly #numberProvider: (n: number) => number;
    
    public constructor(numberProvider: (n: number) => number) {
        this.#numberProvider = numberProvider;
    }

    public convertToString(n: number): string {
        return this.#numberProvider(n).toString();
    }
}