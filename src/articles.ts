import { Fortnox } from '.';
import { Dispatch } from './dispatch';

export class Articles {
    private api: Fortnox;
    private dispatch: Dispatch;
    
    constructor(api: Fortnox){
        this.api = api;
        this.dispatch = new Dispatch(api);
    }
    
    async get(articleNumber: string) {
        const result = await this.dispatch.get(`articles/${articleNumber}`);
        return result.Article;
    }

    async getAll(filter?: string) {
        let path = 'articles/';
        if (filter)
            path += '?filter=' + filter;
        const result = await this.dispatch.get(path);
        return result.Articles;
    }

    async create(article: any) {
        const result = await this.dispatch.post('articles', { Article: article })
        return result.Article;
    }

    async remove(articleNumber: string) {
        return await this.dispatch.delete(`articles/${articleNumber}`);
    }
}