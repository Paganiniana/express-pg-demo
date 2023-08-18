import { Router, Request, Response } from "express";
/** @todo replace this with a dir alias in tsconfig */
import { getConnection, PersonalInformation } from "../../db";

const router = Router();

async function doCreate(req: Request, res: Response) {
    /** @todo */
    console.log("creating the record...");
}

async function doRead(req: Request, res: Response) {
    /** @todo */
    console.log("reading all records...");
}

async function doUpdate(req: Request, res: Response) {
    /** @todo */
    console.log("updating all records...");
}

async function doDelete(req: Request, res: Response) {
    /** @todo */
    console.log("updating all records...");
}

router.get('/', doRead);
router.put('/', doUpdate);
router.post('/', doCreate);
router.delete('/', doDelete);

export default router;
