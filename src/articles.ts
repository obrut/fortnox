import { Fortnox } from '.';

export class Articles {
    private api: Fortnox;
    constructor(api: Fortnox){
        this.api = api;
    }
    
    async get(selector?: { articleNumber?: string, filter?: string }) {
        let path = 'articles/';
        path += (selector && selector.articleNumber) || '';
        path += (selector && selector.filter && `?filter=${selector.filter}`) || '';

        return await this.api.dispatch.get(path);
    }

    async create(article: any) {
        return await this.api.dispatch.post('articles', { Article: article })
    }

    async remove(articleNumber: string) {
        return await this.api.dispatch.delete(`articles/${articleNumber}`);
    }
}