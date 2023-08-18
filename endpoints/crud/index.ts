import { Router, Request, Response } from "express";
/** @todo replace this with a dir alias in tsconfig */
import { getConnection, PersonalInformation } from "../../db";

const router = Router();

async function doCreate(req: Request, res: Response) {
    const connection = await getConnection(); // authenticate

    /** @todo  - check for valid params */
    let reqData = req.body;
    console.log("adding pi to the database ...", reqData);

    // 1. create new PI
    let data = {
        name: reqData.name,
        favorite_language: reqData.favorite_language,
        favorite_os: reqData.favorite_os,
    }
    let pi = new PersonalInformation(data);
    await pi.save();
    connection.close();

    // 2. return for ID tracking purposes ...
    return res.json({
        id: pi.id,
        ... data
    });
}

async function doRead(req: Request, res: Response) {
    const connection = await getConnection(); // authenticate

    let piList = await PersonalInformation.findAll();
    let dataList = [];
    
    // 1. get all simple json
    for (let pi of piList) {
        dataList.push({
            id: pi.id,
            name: pi.name,
            favorite_language: pi.favorite_language,
            favorite_os: pi.favorite_os,
        })
    }
    connection.close();

    // 2. returns an array
    return res.json(dataList);
}

async function doUpdate(req: Request, res: Response) {
    const connection = await getConnection(); // authenticate
    /** @todo  - check for valid params */
    
    // 1. find the PI that corresponds to req.body.id
    const pi = await PersonalInformation.findByPk(req.body.id);

    if (pi) {
        // 2. perform update
        pi.name = req.body.name;
        pi.favorite_language = req.body.favorite_language;
        pi.favorite_os = req.body.favorite_os;
        await pi.save(); 
    }
    /** @todo handle case where pi doesn't exist */
    connection.close();

    // 2. this just lets the frontend know we're done...
    return res.json({value:"done"});
}

async function doDelete(req: Request, res: Response) {
    const connection = await getConnection(); // authenticate
    /** @todo  - check for valid params */
    
    // 1. find the PI that corresponds to req.body.id
    const pi = await PersonalInformation.findByPk(req.body.id);

    if (pi) {
        // 2. perform delete
        await pi.destroy(); 
    }
    /** @todo handle case where pi doesn't exist */
    connection.close();

    // 2. this just lets the frontend know we're done...
    return res.json({value:"done"});
}

router.get('/', doRead);
router.put('/', doUpdate);
router.post('/', doCreate);
router.delete('/', doDelete);

export default router;
