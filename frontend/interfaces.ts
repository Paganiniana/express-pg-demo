class ServerInterface {
    baseRoute = "/api";

    async fetchJson(method:"GET" | "PUT" | "POST" | "DELETE", body:any=undefined, route:string=this.baseRoute) {
        console.log(`Performing ${method} request on ... ${route} ... with ${body}`)
        let res = await fetch(route, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(body),
            method: method,
            mode: "same-origin",
        }).then(res => res.json())
        return res;
    }
}

export class PiInterface extends ServerInterface {
    constructor() {
        super();
        // debugging
        window.PiInterface = this;
    }

    /**
     * This would be generalizable for other data types
     */
    async getAll(): Promise<PersonalInformation[]> {
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

    async add(data:PI_DATA): Promise<PersonalInformation> {
        let createData = {
            name: data.name,
            favorite_language: data.favorite_language,
            favorite_os: data.favorite_os,
        }
        let res = await this.fetchJson("POST", createData);
        return new PersonalInformation(res);
    }

    async delete(pi:PersonalInformation) {
        await this.fetchJson("DELETE", pi.data);
    }

    async update(pi:PersonalInformation) {
        await this.fetchJson("PUT", pi.data);
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

    /** other methods? */
}