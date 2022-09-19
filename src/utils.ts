import { Dispatch } from "./dispatch";

export class Util {
    static async getAllPages(path: string, arrayName: string, dispatch: Dispatch, filter?: string) {
        const items: any = await dispatch.get(path);
        
        if (filter)
            path += '?filter=' + filter;

        let allItems: any[] = [];
        const totalPages = Number.parseInt(items.MetaInformation['@TotalPages']);
        allItems.push(...items[arrayName]);
        
        if (totalPages > 1){
            let currentPage: number = 2;
            while(currentPage <= totalPages) {
                const pageItems: any = await dispatch.get(path + (filter ? '&' : '?') + 'page=' + currentPage);
                allItems.push(...pageItems[arrayName]);
                currentPage++;
            }
        }
        
        return allItems;
    }

    // convert fortnox error into standard error
    static async makeErrorFromResponse (response: any) {

        // get fortnox error if exist
        if (response?.headers?.get('content-type')?.startsWith('application/json')) {
            const fnError = await response.json();
            const fnMessage = fnError?.ErrorInformation?.message;
            if (fnMessage) {
                return new Error(fnMessage);
            }
        }
    
        return new Error(response.statusText ?? "An error has occured");
    }
    
    // a promise that resolves after specified amount of time
    static delay(ms: number): Promise<void> {
        return new Promise((resolve: () => void) => {
            setTimeout(resolve, ms);
        });
    }
}