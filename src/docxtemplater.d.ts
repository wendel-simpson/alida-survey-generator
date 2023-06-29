declare module "docxtemplater" {
  export default class Docxtemplater {
    constructor();
    loadZip(input: Buffer | ArrayBuffer | Blob | string): void;
    setData(data: any): void;
    render(): void;
    getZip(): any;
    getFullText(): string;
    resolveTags(options?: { linebreaks?: boolean }): void;
    getTags(): any[];
    compile(): void;
    renderTable(index: number, data: any[]): void;
    renderTableFromId(options: { id: string; data: any[] }): void;
    applyModule(module: any): void;
    getErrors(): any[];
  }
}
