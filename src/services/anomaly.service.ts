import { IStast } from "../interfaces/stast.interface";
import { IAnomaly } from "../interfaces/anomaly.interface";
import AnomalyModel from "../models/anomaly.model";

const insertAnomaly = async (iAnomaly: IAnomaly) => {
  const responseInsert = await AnomalyModel.create(iAnomaly);
  return responseInsert;
};

const calculateStatistics = async () => {
  const stast: IStast = {
    count_anomalies: await countAnomalies(),
    count_no_anomalies: await countNoAnomalies(),
    ratio: await getAnomalyRatio(),
  };
  return stast;
};

const validateJson = (dna: string[][]): boolean => {
  const filas = dna.length;
  const columnas = filas > 0 ? dna[0].length : 0;
  return filas >= 3 && filas <= 2000 && columnas >= 3 && columnas <= 2000;
};

const validateAnomaly = (dna: string[][]): boolean => {
  for (const [i, row] of dna.entries()) {
    for (const [j, value] of row.entries()) {
      if (
        checkStreak(dna, i, j, 0, 1) || 
        checkStreak(dna, i, j, 1, 0) || 
        checkStreak(dna, i, j, 1, 1) || 
        checkStreak(dna, i, j, -1, 1) 
      ) {
        return true;
      }
    }
  }

  return false;
}

const checkStreak = (dna: string[][], i: number, j: number, di: number, dj: number): boolean => {
  let streak = 1;
  while (
    i + di >= 0 &&
    i + di < dna.length &&
    j + dj >= 0 &&
    j + dj < dna[0].length &&
    dna[i][j] === dna[i + di][j + dj]
  ) {
    streak++;
    if (streak >= 3) {
      return true;
    }
    i += di;
    j += dj;
  }
  return false;
}

const processDetectAnomaly = async (dna: string[][]): Promise<boolean> => {
  if (!validateJson(dna)) throw new Error("Invalid JSON format");

  const isAnomaly = validateAnomaly(dna);
  const iAnomaly: IAnomaly = { dna, result: isAnomaly };
  await insertAnomaly(iAnomaly);
  return isAnomaly;
};

const countAnomalies = async (): Promise<number> => {
  const count = await AnomalyModel.countDocuments({ result: true });
  return count;
};

const countNoAnomalies = async (): Promise<number> => {
  const count = await AnomalyModel.countDocuments({ result: false });
  return count;
};

const getAnomalyRatio = async (): Promise<number> => {
  const total = await AnomalyModel.countDocuments();
  if (total === 0) {
    return 0; 
  }

  const anomalies = await AnomalyModel.countDocuments({ result: true });
  const ratio = (anomalies / total) * 100;
  return ratio;
};

export {
  processDetectAnomaly,
  validateJson,
  validateAnomaly,
  insertAnomaly,
  calculateStatistics,
};
