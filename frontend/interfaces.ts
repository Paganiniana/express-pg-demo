class ServerInterface {
    baseRoute = "/api";

    async fetchJson(method:"GET" | "PUT" | "POST" | "DELETE",route:string=this.baseRoute) {
        console.log(`Performing ${method} request on ... ${route}`)
        let res = await fetch(route, {
            method: method,
            mode: "same-origin",
        }).then(res => res.json())
        return res;
    }
}

export class PiInterface extends ServerInterface {
    /**
     * This would be generalizable for other data types
     */
    async getAll() {
        // 1. get all records
        let res = await this.fetchJson("GET") as PI_DATA[];
        console.log(res)
        /** @todo error handling ... */

        // 2. convert to local class instances
        let piList: PersonalInformation[] =  [];
        for (let p of res) {
            piList.push(new PersonalInformation(p));
        }
        return piList;
    }
}

/** See {@link getConnection} for backend version */
type PI_DATA = {
    id:number;
    name: string;
    favorite_language:string;
    favorite_os: string;
}

class PersonalInformation {
    data:PI_DATA;
    constructor(data:PI_DATA) {
        this.data = data;
    }
}