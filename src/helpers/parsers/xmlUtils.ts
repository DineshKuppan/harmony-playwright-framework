import * as fs from 'fs';
import * as xml2js from 'xml2js';

export class XmlUtils {
    private builder: xml2js.Builder;

    constructor() {
        this.builder = new xml2js.Builder();
    }

    public generateXmlFile(data: any, filePath: string): void {
        const xml = this.builder.buildObject(data);
        fs.writeFileSync(filePath, xml);
    }
}

// Example usage:
const xmlUtils = new XmlUtils();
const data = {
    root: {
        element: [
            { _attr: { name: 'value1' } },
            { _attr: { name: 'value2' } }
        ]
    }
};

xmlUtils.generateXmlFile(data, 'output.xml');