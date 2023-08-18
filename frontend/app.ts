import { PiInterface, PersonalInformation, PI_DATA } from "./interfaces";

const tableBody = document.querySelector("#app-body") as HTMLTableElement;

/** ------------------ ROWS ------------------- */

const DATASET_ID_ATTR = "id";
const DATASET_TEXT_ATTR = "value";
const valueNames = ["name", "favorite_language", "favorite_os"];

function getRow(pi: PersonalInformation) {
    const tr = document.createElement("tr");

    // 0. id
    let td = document.createElement("td");
    td.innerHTML = pi.data.id.toString();
    tr.appendChild(td);

    // 1. data
    for (let key of valueNames) {
        let td = document.createElement("td");
        let tdText = document.createElement("input");
        tdText.type = "text";
        // using data-* for data storage
        tdText.dataset[DATASET_ID_ATTR] = pi.data.id.toString();
        tdText.dataset[DATASET_TEXT_ATTR] = key;
        /** @ts-ignore */
        tdText.value = pi.data[key];
        td.appendChild(tdText);
        tr.appendChild(td);
    }
    
    // 2. buttons
    const updateButton = document.createElement("button");
    updateButton.classList.add("update");
    updateButton.innerText = "update";
    updateButton.dataset[DATASET_ID_ATTR] = pi.data.id.toString();
    tr.appendChild(updateButton);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete");
    deleteButton.innerText = "delete";
    deleteButton.dataset[DATASET_ID_ATTR] = pi.data.id.toString();
    tr.appendChild(deleteButton);

    return tr;

}

let localPiList:PersonalInformation[] = [];

async function syncTable() {
    // 1. clear table
    tableBody.innerHTML = "";
    
    // 2. get the pi and add them
    const piServer = new PiInterface();
    let piList = await piServer.getAll();
    localPiList = piList;
    for (let pi of piList) {
        let tr = getRow(pi);
        tableBody.appendChild(tr);
    }

    // 3. init listeners
    initRowListeners();
}

/** ---------------------- EVENT HANDLERS -------------------- */

function initRowListeners() {
    // update buttons
    document.querySelectorAll(".update").forEach(button => 
            button.addEventListener("click", updateRow));
    
    // delete buttons
    document.querySelectorAll(".delete").forEach(button => 
        button.addEventListener("click", deleteRow));
}

async function updateRow(e:Event) {
    let button = e.target as HTMLButtonElement
    let id = Number(button.dataset[DATASET_ID_ATTR]);

    let data:PI_DATA = {
        id: id,
        name:"",
        favorite_os:"",
        favorite_language:"",
    }

    // 1. get data from the dom
    for (let key of valueNames) {
        let dataKey = `[data-id='${id}'][data-value='${key}']`;
        let el = document.querySelector(dataKey) as HTMLInputElement;
        if (el) {
            console.log("Getting value ...", dataKey, el.innerText);
            data[key] = el.value;
        }
    }
    
    // 2. get corresponding pi
    let pi = localPiList.find(p => p.data.id == id);
    if (pi) {
        // 3. update
        pi.data = data;
        const piServer = new PiInterface();
        await piServer.update(pi);
        syncTable();
    }
}

async function deleteRow(e:Event) {
    // 1. get the ID
    let button = e.target as HTMLButtonElement
    let id = Number(button.dataset[DATASET_ID_ATTR]);
    let pi = localPiList.find(p => p.data.id == id);
    if (pi) {
        // 2. delete
        const piServer = new PiInterface();
        // @ts-ignore ... we only care bout the id
        await piServer.delete(pi);
        syncTable();
    }
}




/** -------------------- FORM LOGIC ------------------ */

const formName = document.getElementById("form-name") as HTMLInputElement;
const formLang = document.getElementById("form-lang") as HTMLInputElement;
const formOs = document.getElementById("form-os") as HTMLInputElement;
const formAdd = document.getElementById("form-add") as HTMLButtonElement;

async function addPersonalInfo() {
    // 1. collect data
    let data:PI_DATA = {
        id:0, // unimportant
        name: formName.value,
        favorite_language: formLang.value,
        favorite_os: formOs.value,
    }

    // 2. add it,
    const piServer = new PiInterface();
    await piServer.add(data);

    // 3. refresh table
    syncTable();

    // 4. clear form
    formName.value = "";
    formLang.value = "";
    formOs.value = "";
}

formAdd.addEventListener("click", addPersonalInfo);

// init
syncTable();