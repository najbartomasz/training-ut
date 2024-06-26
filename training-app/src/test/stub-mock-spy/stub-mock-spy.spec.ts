import { NumberToStringConverter } from './number-to-string-converter';
import { Logger } from './logger';

describe('stub mock spy', () => {
    // 1. Napisać prostą klasę, która jako parametr konstruktora przyjmuje funkcję (to będzie stub w teście) i wystawia
    // inną funkcję przyjmującą number, która robi toString na tym co w konstruktorze.
    // 2. Pokazać, że stuby są po to żeby po prostu wrzucić jakieś fakeowe dane i weryfikować stan a nie zachowanie.
    test('stub', () => {
        const n = 2;
        const providerStub = () => n * 10;
        const numberToStringConverter = new NumberToStringConverter(providerStub);

        expect(numberToStringConverter.convertToString(n)).toEqual('20');
    });

    // 1. Napisać klasę Logger, która teraz przyjmuje tablicę typu LogAppender (później będzie to wykorzystane).
    // 2. W teście mock na 4 log appendery (info fn to mock) i forEachem sprawdzić wszystko.
    // 3. Pokazać, że test działa i że potrafi failować.
    test('mock', () => {
        const logAppenders = [
            { info: jest.fn() }, // console
            { info: jest.fn() }, // ws
            { info: jest.fn() }, // file,
            { info: jest.fn() }, // audit
        ];
        const logger = new Logger(logAppenders);

        logger.log('Test!');

        logAppenders.forEach((logAppender) => {
            expect(logAppender.info).toHaveBeenCalledTimes(1);
            expect(logAppender.info).toHaveBeenCalledWith('Test!');
        });
    });

    // 1. Dodać wymaganie, żeby zrobić jeden logger jak jest więcej niż jeden appender wrzucony.
    // 2. Sprawdzić że drugi się nie wywołuje.
    // 3. Pokazać, że mimo wszystko test wyżej działa a nie powinien.
    // 4. Refactoring na typ konstruktora, żeby nie można było zrobić `.lenght = 1`
    // 5. Refactoring forEach w loggerze na do while i pokazać, że testy działają i że coverage 100% a jak użyć loggera z [] to throw
        // test('empty', () => {
        //     const logger = new Logger([]);
        //     expect(() => logger.log('Test!')).not.toThrow();
        // });
    // 6. Refactoring typy z [] na [LogAppender, ...LogAppender[]] i pokazać że nie da się wywołać z [] (jeśli takie wymaganie)
    test('mock', () => {
        const logAppender1 = { info: jest.fn() };
        const logAppender2 = { info: jest.fn() };
        const logger = new Logger([logAppender1, logAppender2]);

        logger.log('Test!');

        expect(logAppender2.info).not.toHaveBeenCalled();
    });

    // 1. Stworzyć jakoś logAppender nie będący mockiem i z robić na nim spyOn
    // 2. Powiedzieć, że definicyjnie na spy nie powinniśmy nic nadpisywać, ale się da.
    test('spy', () => {
        const logAppender = { info: (message: string) => { console.info(message); } }
        const infoSpy = jest.spyOn(logAppender, 'info');
        const logAppenders = [
            logAppender
        ];
        const logger = new Logger(logAppenders);

        logger.log('Test!');

        expect(infoSpy).toHaveBeenCalledWith('Test!');
    });
});
