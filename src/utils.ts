import { Dispatch } from "./dispatch";
import { FNResponse } from "./types";

export class Util {
    async getAllPages<T>(path: string, dispatch: Dispatch) {
        const fnResp = await dispatch.get<FNResponse>(path);
        
        let allItems: T[] = [];
        const totalPages = fnResp.MetaInformation["@TotalPages"];
        // HAXX0R: The property that is not MetaInformation...
        const collectionName = Object.getOwnPropertyNames(fnResp).find(n => n !== 'MetaInformation') || '';
        allItems.push(...fnResp[collectionName]);
                
        if (totalPages > 1){
            let currentPage = 2;
            while(currentPage <= totalPages) {
                const page =  await dispatch.get<FNResponse>(path + '&page=' + currentPage);
                allItems.push(...page[collectionName]);
                currentPage++;
            }
        }
        
        return allItems;
    }
}