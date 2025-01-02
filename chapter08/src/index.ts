import { read } from 'fs';
import { readFile } from 'fs/promises';

const p = readFile('foo.txt', 'utf-8');
p.then((data) => console.log(data));
// error handling
const p2 = readFile('bar.txt', 'utf-8');
p2.catch((err) => console.error(err));
p2.then(
    (data) => console.log(data),
    (err: unknown) => console.error(err),
);

// if call reject, then the promise will fail
const p3 = new Promise<number>((resolve, reject) => {
    setTimeout(() => resolve(42), 1000);
})
p3.then((data) => console.log(`data: ${data}`));

const p4 = Promise.resolve(1)
p4.then((data) => console.log(`data: ${data}`));
/*
const p1 = readFile('foo.txt', 'utf-8');
const p2 = readFile('bar.txt', 'utf-8');
const p3 = readFile('baz.txt', 'utf-8');
Promise.all([p1, p2, p3])
    .then((data) => {
        console.log(data[0])
        console.log(data[1])
        console.log(data[2])
    })
    .catch((err) => console.error(err));
*/
const sleepReject = (duration: number) => {
    return new Promise<never>((resolve, reject) => {
        setTimeout(() => reject('error'), duration);
    });
}
const p5 = Promise.allSettled([
    sleepReject(1000),
    readFile('foo.txt', 'utf-8')
]);
p5.then(([sr, rf]) => {
    console.log(sr);
    console.log(rf);
});
// promise any
const p6 = Promise.any([
    sleepReject(1000),
    readFile('foo.txt', 'utf-8')
]);
p6.then((data: unknown) => console.log(data));

// challenge
// to be refactored
import { readFile as readFileAsync } from 'fs/promises';
import path from "path";
import { fileURLToPath } from 'url';
const filePath = fileURLToPath(import.meta.url); // /app/dist/index.js
const fileDir = path.dirname(filePath);
const dataFile = path.join(fileDir, '../uhyo.txt');
const sleep = (duration: number) => {
    return new Promise<void>((resolve) => {
        setTimeout(resolve, duration);
    });
}
const errorAfter1ms = async (ms: number) => {
    await sleep(ms);
    throw new Error('time out');
}
const data = await Promise.race([
    readFileAsync(dataFile, {encoding: 'utf-8'}),
    errorAfter1ms(1)
]).catch((err) => {
    console.error(err);
    process.exit(0);
})
let count = 0;
let currentIndex = 0;
while (true) {
    const nextIndex = data.indexOf('uhyo', currentIndex);
    if (nextIndex >= 0) {
        count++;
        currentIndex = nextIndex + 1;
    } else {
        break;
    }
}
