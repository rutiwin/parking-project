import express, { Request, Response } from "express"
import cors from "cors";
import { parkingRouter } from "./controllers/parkingControllers";
import { isDbServerUp } from "./utils/helpers";
import { appConfig } from "./utils/appConfig";
import { streetRouter } from "./controllers/streetControllers";

const server = express();

server.use(cors());

// load body
server.use(express.json());

// Doorman security chcek
// server.use(doorman);

// register controllers
server.use("/", parkingRouter);
server.use("/", streetRouter);

// Error handling
// server.use(catchAll);

// run server only if DB-server is active
isDbServerUp().then((isUp) => {
    if (isUp) {
        server.listen(appConfig.port, () => {
            console.log(`Listening on http://localhost:${appConfig.port}`);
        })
    } else {
        console.error("\n\n****\nDB server is not up!!!\n****\n");
    }
})
