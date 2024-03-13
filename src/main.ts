import { ECC, N } from "./ecc";

async function main() {
    const p = BigInt('0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F');
    const G =
    {
        x: (55066263022277343669578718895168534326250603453777594175500187360389116729240n),
        y: (32670510020758816978083085130507043184471273380659243275938904335757337482424n)
    }
    const n = N(2).pow(256).sub(432420386565659656852420866394968145599n)

    const ecc = new ECC(0, 7, p);
    console.log(ecc.add(G, G));
}


async function test() {

    const P = { x: 1, y: 2 }
    const Q = { x: 3, y: 4 }
    const ecc = new ECC(-7, 10, 10000000);

    console.log("isGroup", ecc.isGroup())
    console.log(ecc.add(P, Q));

}

main();