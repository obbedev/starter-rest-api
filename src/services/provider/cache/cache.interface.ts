export interface CacheInterface {
    saveValue(key: string, value: any): void;
    getValue(key: string): any;
    removeValue(key: string): void;
}