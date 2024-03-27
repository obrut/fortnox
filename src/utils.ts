import { Dispatch } from "./dispatch";

export class Util {
    async getAllPages<T>(path: string, arrayName: string, dispatch: Dispatch) {
        const items: any = await dispatch.get(path);
        
        let allItems: T[] = [];
        const totalPages = Number.parseInt(items.MetaInformation['@TotalPages']);
        allItems.push(...items[arrayName]);
        
        if (totalPages > 1){
            let currentPage: number = 2;
            while(currentPage <= totalPages) {
                allItems.push(...await dispatch.get(path + '&page=' + currentPage)[arrayName]);
                currentPage++;
            }
        }
        
        return allItems;
    }
}