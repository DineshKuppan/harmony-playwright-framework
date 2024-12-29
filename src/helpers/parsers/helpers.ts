export class Helpers {
    /**
     * Pauses execution for a given duration.
     * @param milliseconds - The time to wait in milliseconds.
     */
    static async delay(milliseconds: number): Promise<void> {
      return new Promise((resolve) => setTimeout(resolve, milliseconds));
    }
  
    /**
     * Generates a random string of specified length.
     * @param length - The length of the string.
     * @returns A random string.
     */
    static generateRandomString(length: number): string {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    }
  
    /**
     * Formats a date to `YYYY-MM-DD` format.
     * @param date - The date to format.
     * @returns A formatted date string.
     */
    static formatDate(date: Date): string {
      return date.toISOString().split('T')[0];
    }
  }
  