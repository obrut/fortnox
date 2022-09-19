import { Dispatch } from './dispatch';
import { FNPrice } from './types/FNPrice';
import { Util } from './utils';

type PriceResult = {
    Price: FNPrice
}

export class Prices {
    private dispatch: Dispatch;
    private path = 'prices';

    constructor(dispatch: Dispatch) {
        this.dispatch = dispatch;
    }

    async getAll(priceList?: string, articleNumber?: string) {
        let path = `${this.path}/sublist`;
        if (priceList)
            path += `/${priceList}`;
        if (articleNumber)
            path += `/${articleNumber}`
        const result = await Util.getAllPages(path, 'Prices', this.dispatch) as FNPrice[];
        return result;
    }

    async create(price: any) {
        const result = await this.dispatch.post(this.path, { Price: price }) as PriceResult;
        return result.Price;
    }

    async update(price: FNPrice) {
        const result = await this.dispatch.put(`${this.path}/${price.PriceList}/${price.ArticleNumber}/${price.FromQuantity}`, { Price: price }) as PriceResult;
        return result.Price;
    }

    async remove(priceList: string, articleNumber: string, fromQuantity?: number) {
        let path = `${this.path}/${priceList}/${articleNumber}`;
        if (fromQuantity)
            path += `/${fromQuantity}`;
        const result = await this.dispatch.delete(path);
        return result;
    }
}