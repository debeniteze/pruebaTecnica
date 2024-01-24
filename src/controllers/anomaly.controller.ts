import {
  processDetectAnomaly,
  calculateStatistics,
} from "../services/anomaly.service";
import { Response, Request } from "express";
import { handleHttp } from "../utils/error.handle";

const validateAnomalyController = async ({ body }: Request, res: Response) => {
  try {
    (await processDetectAnomaly(body.dna)) == true
      ? res.status(200).json()
      : res.status(403).json();
  } catch (e) {
    handleHttp(res, "ERROR_IN_validateAnomalyController");
  }
};

const stastController = async ( req: Request, res: Response) => {
  try {
    res.send(await calculateStatistics());
  } catch (e) {
    handleHttp(res, "ERROR_IN_stastController");
  }
};

export { validateAnomalyController, stastController };
