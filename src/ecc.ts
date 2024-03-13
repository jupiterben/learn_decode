import { ExactNumberType as NType, ExactNumber as N } from 'exactnumber';

export type NTypeComp = string | number | bigint | NType;
export type NPoint = { x: NTypeComp, y: NTypeComp }
export { N };

// y^2 = x^3 + ax + b (mod p)
export class ECC {
    constructor(public a: NTypeComp, public b: NTypeComp, public p: NTypeComp) { }
    isGroup() {
        // 4a^3 + 27b^2 (mod p) != 0
        return !N(4).mul(N(this.a).pow(3)).add(N(27).mul(N(this.b).pow(2))).mod(this.p).eq(N(0));
    }

    mod(a: NTypeComp) {
        let y = N(a)
        while (y.lt(0)) {
            y = y.add(this.p);
        }
        return y.mod(this.p);
    }

    isPointOnCurve(P: NPoint) {
        const left = N(P.y).pow(2).mod(this.p);
        const right = N(P.x).pow(3).add(N(this.a).mul(P.x)).add(this.b).mod(this.p);
        return left.eq(right);
    }

    neg(P: NPoint) {
        const x = P.x;
        const y = this.mod(P.y)
        return { x, y };
    }

    eqPoint(P: NPoint, Q: NPoint) {
        return N(P.x).eq(Q.x) && N(P.y).eq(Q.y);
    }

    add(P: NPoint, Q: NPoint) {
        const pEq = this.eqPoint(P, Q);
        const m = pEq ? N(3).mul(P.x).mul(P.x).add(this.a).div(P.y).div(2)
            : N(Q.y).sub(P.y).div(N(Q.x).sub(P.x));

        m.normalize().mod(this.p)
        const rx = N(m).mul(m).sub(P.x).sub(Q.x).normalize();
        const ry = N(m).mul(P.x).sub(N(m).mul(rx)).sub(P.y).normalize();
        return { x: rx.mod(this.p), y: ry.mod(this.p) };
    }

}

