import { CacheInterface } from "./cache.interface.js";

export class MemoryCacheService implements CacheInterface {
    private static instance: MemoryCacheService;
    private memoryData: Record<string, any> = {};

    private constructor() { }

    static getInstance(): MemoryCacheService {
        if (!MemoryCacheService.instance) {
            MemoryCacheService.instance = new MemoryCacheService();
        }
        return MemoryCacheService.instance;
    }

    saveValue(key: string, value: any): void {
        this.memoryData[key] = value;
    }

    getValue(key: string): any {
        return this.memoryData[key];
    }

    removeValue(key: string): void {
        delete this.memoryData[key];
    }
}