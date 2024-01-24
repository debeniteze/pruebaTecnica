import { processDetectAnomaly } from '../services/anomaly.service';
import AnomalyModel from '../models/anomaly.model';


jest.mock('../models/anomaly.model', () => ({
  create: jest.fn(),
}));

describe('processDetectAnomaly', () => {
  beforeEach(() => {
    (AnomalyModel.create as jest.Mock).mockClear();
  });

  it('should throw an error for invalid DNA JSON format', async () => {
    // Arrange
    const invalidDna = [['A', 'T'], ['C', 'G']];
    
    // Act & Assert
    await expect(processDetectAnomaly(invalidDna)).rejects.toThrow('Invalid JSON format');
    expect(AnomalyModel.create).not.toHaveBeenCalled();
  });

  it('should detect anomaly and insert record', async () => {
    // Arrange
    const validDna = [['A', 'T', 'A'], 
                      ['C', 'A', 'C'],
                      ['A', 'T', 'A']];
    
    // Act
    const isAnomaly = await processDetectAnomaly(validDna);
    // Assert
    expect(isAnomaly).toBe(true);
    expect(AnomalyModel.create).toHaveBeenCalledWith({ dna: validDna, result: true });
  });
});
