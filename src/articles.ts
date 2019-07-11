import { Fortnox } from '.';

export class Articles {
    private api: Fortnox;
    constructor(api: Fortnox){
        this.api = api;
    }
    
    async get(articleNumber: string) {
        const result = await this.api.dispatch.get(`articles/${articleNumber}`);
        return result.Article;
    }

    async getAll(filter?: string) {
        let path = 'articles/';
        if (filter)
            path += '?filter=' + filter;
        const result = await this.api.dispatch.get(path);
        return result.Articles;
    }

    async create(article: any) {
        const result = await this.api.dispatch.post('articles', { Article: article })
        return result.Article;
    }

    async remove(articleNumber: string) {
        return await this.api.dispatch.delete(`articles/${articleNumber}`);
    }
}