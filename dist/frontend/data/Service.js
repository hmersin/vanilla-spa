import { files } from "./files";
/**
 * DataService class
 * This is a singleton class which provides data service capabilities like get,set,etc
 */
export default class DataService {
    static instance;
    constructor() { }
    static getInstance() {
        if (!DataService.instance) {
            DataService.instance = new DataService();
        }
        return DataService.instance;
    }
    async getItems() {
        try {
            const res = await fetch("http://localhost:3000/api/v1/nodes");
            return await res?.json();
        }
        catch (err) {
            console.error("Error during data fetch:", err);
            console.log("Will use the local data");
            return Promise.resolve(files);
        }
    }
}
