import { Router, Request, Response } from "express";

const router = Router();

function serveApp(req: Request, res: Response) {
    /** @todo */
    console.log("Serving the application...");
    res.status(200).send("<h1>The app</h1>");
}

router.get('/', serveApp);


export default router;
