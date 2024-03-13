import { ECC } from '../src/ecc';

describe('testing ecc', () => {
    test('isGroup', () => {
        const ecc = new ECC(10, 5, 17);
        expect(ecc.isGroup()).toBe(false);
    });

    test("isPointOnCurve", () => {
        const ecc = new ECC(1, 7, 17);
        expect(ecc.isPointOnCurve({ x: 2, y: 0 })).toBe(true);
        expect(ecc.isPointOnCurve({ x: 6, y: 3 })).toBe(false);

        const p = BigInt('0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F');
        const ecc1 = new ECC(0, 7, p)
        const G =
        {
            x: (55066263022277343669578718895168534326250603453777594175500187360389116729240n),
            y: (32670510020758816978083085130507043184471273380659243275938904335757337482424n)
        }
        expect(ecc1.isPointOnCurve(G)).toBe(true);
    });

    test("neg", () => {
        const ecc = new ECC(1, 7, 17);
        const P = { x: 5, y: 8 };
        const Q = { x: 3, y: 0 };
        const R = { x: 0, y: 6 };
        expect(ecc.eqPoint(ecc.neg(P), { x: 5, y: 9 })).toBe(true);
        expect(ecc.eqPoint(ecc.neg(Q), { x: 3, y: 0 })).toBe(true);
        expect(ecc.eqPoint(ecc.neg(R), { x: 0, y: 11 })).toBe(true);
    });

    // test("add", () => {
    //     const ecc = new ECC(1, 7, 17);
    //     const P = { x: 2, y: 0 };
    //     const Q = { x: 1, y: 3 };
    //     expect(ecc.eqPoint(ecc.add(P, Q), { x: 6, y: 12 })).toBe(true);
    // });
});