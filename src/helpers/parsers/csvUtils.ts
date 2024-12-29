import * as fs from 'fs';
import { parse, stringify } from 'csv/sync';

export class CsvUtils {
  /**
   * Reads a CSV file and parses it into an array of objects.
   * @param filePath - The path to the CSV file.
   * @returns An array of objects representing the CSV data.
   */
  static async readCsvFile<T>(filePath: string): Promise<T[]> {
    const data = await fs.promises.readFile(filePath, 'utf-8');
    return parse(data, { columns: true }) as T[];
  }

  /**
   * Writes an array of objects to a CSV file.
   * @param filePath - The path to the CSV file.
   * @param records - The data to write.
   */
  static async writeCsvFile(filePath: string, records: object[]): Promise<void> {
    const data = stringify(records, { header: true });
    await fs.promises.writeFile(filePath, data, 'utf-8');
  }

  /**
   * Converts a CSV string to an array of objects.
   * @param csvString - The CSV string.
   * @returns An array of objects.
   */
  static parseCsvString<T>(csvString: string): T[] {
    return parse(csvString, { columns: true }) as T[];
  }
}
