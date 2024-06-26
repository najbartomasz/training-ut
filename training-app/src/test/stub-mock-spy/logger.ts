export interface LogAppender {
    info(message: string): void;
}

export class Logger {
    readonly #logAppenders: LogAppender[];
    
    public constructor(logAppenders: LogAppender[]) {
        this.#logAppenders = logAppenders;
        if (this.#logAppenders.length > 1) {
            this.#logAppenders.length = 1;
        }
    }

    public log(message: string): void {
        // if (this.#logAppenders.length === 0) {
        //     return;
        // }
        // let i = 0;
        // do {
        //     this.#logAppenders[i].info(message);
        //     i++;
        // } while (i < this.#logAppenders.length);
        this.#logAppenders.forEach((appender) => {
            appender.info(message);
        });
    }
}