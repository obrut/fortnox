import { Dispatch } from './dispatch';
import { Util } from './utils';

export class Articles {
    private dispatch: Dispatch;
    private util: Util;
    
    constructor(dispatch: Dispatch){
        this.dispatch = dispatch;
        this.util = new Util();
    }
    
    async get(articleNumber: string) {
        const result = await this.dispatch.get(`articles/${articleNumber}`);
        return result.Article;
    }

    async getAll(filter?: string) {
        let path = 'articles/';
        if (filter)
            path += '?filter=' + filter;
        const result: any = await this.util.getAllPages(path, 'Articles', this.dispatch);
        return result;
    }

    async create(article: any) {
        const result = await this.dispatch.post('articles', { Article: article })
        return result.Article;
    }

    async remove(articleNumber: string) {
        return await this.dispatch.delete(`articles/${articleNumber}`);
    }
}