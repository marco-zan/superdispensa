import { Router } from "express";
import express from "express";
import { routes } from "./pages/index";
import { Dbservice } from "./db/Dbservice";

const app = express();
const PORT: number = 3001;

app.set('view engine', 'ejs');
app.use(routes);
app.use(express.static(__dirname + "\\..\\static"));

console.log("Running...");

app.listen(<number>PORT, "0.0.0.0", 511, async () => {
    await Dbservice.getInstance();
    console.log(`Server running at ${PORT}`)
})