import { Router} from "express";
import { stastController, validateAnomalyController } from "../controllers/anomaly.controller";

const router = Router();

router.post("/validate-anomaly", validateAnomalyController);
router.get("/stats", stastController)

export { router };
