describe('async', () => {
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

    test('with Promise.resolve', () => {
        let x = 1;
        Promise.resolve().then(() => {
            x = 2;
            expect(x).toBe(1);
        });
    });

    test('with done callback', (done) => {
        let x = 1;
        Promise.resolve().then(() => {
            x = 2;
            expect(x).toBe(2);
        }).then(done, done);
    });

    test('with return Promise', () => {
        let x = 1;
        return Promise.resolve().then(() => {
            x = 2;
            expect(x).toBe(2);
        });
    });

    test('with return expect', () => {
        let x = 1;
        const promise = Promise.resolve().then(() => {
            x = 2;
            return x;
        });
        return expect(promise).resolves.toBe(2);
    });

    test('with async await', async () => {
        let x = 1;
        const promise = Promise.resolve().then(() => {
            x = 2;
            return x;
        });
        expect(await promise).toBe(2);
    });

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