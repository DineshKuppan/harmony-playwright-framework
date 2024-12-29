export class Parsers {
    /**
     * Parses a query string into an object.
     * @param queryString - The query string (e.g., "?key1=value1&key2=value2").
     * @returns An object representing the query parameters.
     */
    static parseQueryString(queryString: string): Record<string, string> {
      return queryString
        .replace(/^\?/, '')
        .split('&')
        .reduce((acc, pair) => {
          const [key, value] = pair.split('=').map(decodeURIComponent);
          acc[key] = value || '';
          return acc;
        }, {} as Record<string, string>);
    }
  
    /**
     * Converts an object to a query string.
     * @param params - An object representing query parameters.
     * @returns A query string (e.g., "?key1=value1&key2=value2").
     */
    static toQueryString(params: Record<string, string>): string {
      return (
        '?' +
        Object.entries(params)
          .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
          .join('&')
      );
    }
  }
  