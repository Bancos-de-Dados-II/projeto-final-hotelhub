import { Request, Response } from "express";
import { Application } from "express";

import app from "./config";

import quartoController from "../controller/QuartoController";

const quartoRoutes = (app: Application) => {
    app.get("/", (req: Request, res: Response) => {
        return res.send("Hello, world!");
    });

    app.post("/Quarto", async (req: Request, res: Response) => {
        await quartoController.addQuarto(req, res);
    });

    app.get("/Quarto", async (req: Request, res: Response) => {
        await quartoController.listAllRooms(req, res);
    });

    app.delete("/Quarto", async (req: Request, res: Response) => {
        await quartoController.deleteRoom(req, res);
    });

    app.get("/Quarto/:numero", async (req: Request, res: Response) => {
        await quartoController.findRoomByPk(req, res);
    });

    app.patch("/Quarto", async (req: Request, res: Response) => {
        await quartoController.updateRoom(req, res);
    });
}

export default quartoRoutes;