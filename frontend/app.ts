import { PiInterface } from "./interfaces";

const server = new PiInterface();
server.getAll().then(res => console.log(res));

console.log("todo")