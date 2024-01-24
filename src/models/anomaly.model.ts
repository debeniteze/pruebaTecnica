import { Schema, model } from "mongoose";
import { IAnomaly } from "../interfaces/anomaly.interface";
const AnomalySchema = new Schema<IAnomaly>(
  {
    dna: {
      type: [[String]],
    },
    result: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const AnomalyModel = model("anomaly", AnomalySchema);
export default AnomalyModel;
