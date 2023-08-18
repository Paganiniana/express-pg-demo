import { Router, Request, Response } from "express";

const router = Router();

function serveApp(req: Request, res: Response) {
    console.log("Todo...");
}

router.get('/', serveApp);


export default router;
