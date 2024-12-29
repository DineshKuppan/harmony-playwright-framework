import * as fs from 'fs';

export class JsonUtils {
  /**
   * Reads a JSON file and parses it into a JavaScript object.
   * @param filePath - The path to the JSON file.
   * @returns The parsed object.
   */
  static async readJsonFile<T>(filePath: string): Promise<T> {
    const data = await fs.promises.readFile(filePath, 'utf-8');
    return JSON.parse(data) as T;
  }

  /**
   * Writes a JavaScript object to a JSON file.
   * @param filePath - The path to the JSON file.
   * @param jsonObject - The object to write.
   */
  static async writeJsonFile(filePath: string, jsonObject: unknown): Promise<void> {
    const data = JSON.stringify(jsonObject, null, 2);
    await fs.promises.writeFile(filePath, data, 'utf-8');
  }

  /**
   * Validates if a string is a valid JSON format.
   * @param jsonString - The string to validate.
   * @returns True if the string is valid JSON, otherwise false.
   */
  static isValidJson(jsonString: string): boolean {
    try {
      JSON.parse(jsonString);
      return true;
    } catch (error) {
      return false;
    }
  }
}
