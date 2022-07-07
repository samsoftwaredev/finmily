import express from 'express';
import {Request, Response} from "express";

const PORT = 3000;
// create and setup express app
const app = express();
app.use(express.json());

// register routes
app.get("/", function(req: Request, res: Response) {
    // here we will have logic to return all users
    res.send(new Date().toString());
});

app.get("/users", function(req: Request, res: Response) {
    // here we will have logic to return all users
    console.log("Testing");
});

app.get("/users/:id", function(req: Request, res: Response) {
    // here we will have logic to return user by id
});

app.post("/users", function(req: Request, res: Response) {
    // here we will have logic to save a user
});

app.put("/users/:id", function(req: Request, res: Response) {
    // here we will have logic to update a user by a given user id
});

app.delete("/users/:id", function(req: Request, res: Response) {
    // here we will have logic to delete a user by a given user id
});

// start express server
app.listen(PORT, ()=> console.log('listening on port', PORT));