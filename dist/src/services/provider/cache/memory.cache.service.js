export class MemoryCacheService {
    constructor() {
        this.memoryData = {};
    }
    static getInstance() {
        if (!MemoryCacheService.instance) {
            MemoryCacheService.instance = new MemoryCacheService();
        }
        return MemoryCacheService.instance;
    }
    saveValue(key, value) {
        this.memoryData[key] = value;
    }
    getValue(key) {
        return this.memoryData[key];
    }
    removeValue(key) {
        delete this.memoryData[key];
    }
}
