import * as fs from "fs";
import * as path from "path";
import express from "express";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "url";
import { files } from "../frontend/data/files.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const resolve = (p) => path.resolve(__dirname, p);
// We would like to run the vite server in the middleware mode
const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
});
const htmlContent = fs.readFileSync(resolve("../../src/index.html"), "utf-8");
const app = express();
// an RESTful api endpoint
// returns our file system data
app.get("/api/v1/nodes", (_req, res) => {
    res.json(files);
});
// Adding vite server as middleware
app.use(vite.middlewares);
// This middleware helps serving the static files
app.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
        const transformed = await vite.transformIndexHtml(url, htmlContent);
        res.status(200).set({ "Content-Type": "text/html" }).end(transformed);
    }
    catch (e) {
        next(e);
    }
});
app.listen(3000, () => console.log("Listening on port 3000. Check out on http://localhost:3000"));
