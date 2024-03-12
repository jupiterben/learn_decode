import { ExactNumberType as NType, ExactNumber as N } from 'exactnumber';


type NTypeComp = string | number | bigint | NType;
type NPoint = { x: NType, y: NType }

class ECC {
    constructor(public a: NTypeComp, public b: NTypeComp, public p: NTypeComp) { }
    mul(P: NPoint, Q: NPoint) {
        const pEq = P.x.eq(Q.x) && P.y.eq(Q.y);
        const m = pEq ? N(3).mul(P.x).mul(P.x).add(this.a).div(P.y).div(2)
            : N(Q.y).sub(P.y).div(N(Q.x).sub(P.x));

        const rx = N(m).mul(m).sub(P.x).sub(Q.x).normalize();
        const ry = N(m).mul(P.x).sub(N(m).mul(rx)).sub(P.y).normalize();
        return { x: rx.mod(this.p), y: ry.mod(this.p) };
    }

}

async function main() {
    const p = N(2).pow(256);[32, 9, 8, 7, 6, 4, 0].forEach(i => p.sub(N(2).pow(i)));
    const G =
    {
        x: N(55066263022277343669578718895168534326250603453777594175500187360389116729240n),
        y: N(32670510020758816978083085130507043184471273380659243275938904335757337482424n)
    }
    const n = N(2).pow(256).sub(432420386565659656852420866394968145599n)

    const ecc = new ECC(0, 7, p);
    console.log(ecc.mul(G, G));
}


async function test() {

    const P = { x: N(1), y: N(2) }
    const Q = { x: N(3), y: N(4) }
    const ecc = new ECC(-7, 10, 10000000);
    console.log(ecc.mul(P, Q));

}

main();