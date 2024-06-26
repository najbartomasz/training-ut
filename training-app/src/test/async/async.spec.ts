describe('async', () => {
    // 1. najpierw set timeout i pokazać, że test nie przechodzi jeśli w środku damy expect
    // 2. na samym końcu tego ćwiczenia, po wszystkich innych testach, pokazać że fake timery naprawiają
    test('with setTimeout', () => {
        // jest.useFakeTimers();
        let x = 1;
        setTimeout(() => {
            x = 2;
            expect(x).toBe(1);
        });
        // jest.runAllTimers();
        // jest.useRealTimers();
    });

    // Przykład z Promise.resolve
    test('with Promise.resolve', () => {
        let x = 1;
        Promise.resolve().then(() => {
            x = 2;
            expect(x).toBe(1);
        });
    });

    // Pokazać, że można to naprawić za pomocą `done` ale zwrócić uwagę na to co się stanie jak wywołamy done bezpośrednio w then
    // (timeout!!!). Zwrócić uwagę na to dlaczego testy failują a nie tylko, że failują.
    test('with done callback', (done) => {
        let x = 1;
        Promise.resolve().then(() => {
            x = 2;
            expect(x).toBe(2);
        }).then(done, done);
    });

    // Pokazać, że można to samo zrobić bez `done` poprzez zwrócenie wyniku.
    test('with return Promise', () => {
        let x = 1;
        return Promise.resolve().then(() => {
            x = 2;
            expect(x).toBe(2);
        });
    });

    // To samo co wyżej tylko return na expect resolves, bo `resolves` automatycznie resolvuje promise
    test('with return expect', () => {
        let x = 1;
        const promise = Promise.resolve().then(() => {
            x = 2;
            return x;
        });
        return expect(promise).resolves.toBe(2);
    });

    // Znów podobnie, tylko jakbardziej 'modern'
    test('with async await', async () => {
        let x = 1;
        const promise = Promise.resolve().then(() => {
            x = 2;
            return x;
        });
        expect(await promise).toBe(2);
    });

    // 1. Opakowanie promisa w timeout i pokazanie, że to też działa przy awaitowaniu.
    // 2. ALE!!! Failuje test `setTimeout`. Pokazać że triggerujemy mikro/makro taski i przypadkiem pierwszy test zaczyna failować
    // mimo, że błąd jest w tym teście.
    // 3. Pokazać, że jak ten test będzie ponad `setTimeout` to wszysko NIESTETY działa.
    test('with async await and setTimeout', async () => {
        let x = 1;
        const promise = new Promise((resolve) => {
            setTimeout(() => {
                x = 2;
                resolve(x);
            });
        });
        expect(await promise).toBe(2);
    });
});