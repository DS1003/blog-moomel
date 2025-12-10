declare module 'pdf2json' {
    export default class PDFParser {
        constructor(context?: any, shouldFlat?: number);
        on(event: string, callback: (data: any) => void): void;
        getRawTextContent(): string;
        parseBuffer(buffer: Buffer): void;
    }
}
