import { Router } from "express";
import { CreateRegisterController } from "./controllers/create_register_controller";
import { GetRegisterController } from "./controllers/get_register_controller";
import { GetColorController } from "./controllers/get_color_controller";

const router = Router();

const createRegisterController = new CreateRegisterController();
const getRegisterController = new GetRegisterController();
const getColorController = new GetColorController();

router.post("/register", createRegisterController.handle);
router.get("/register/:id", getRegisterController.handle);
router.get("/color/:color", getColorController.handle);

export { router };
