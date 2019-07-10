import { Fortnox } from '.';

export class Articles {
    private api: Fortnox;
    constructor(api: Fortnox){
        this.api = api;
    }
    
    async get(articleNumber?: any) {
        return await this.api.dispatch.get(`articles/${articleNumber || ''}`);
    }

    async create(article: any) {
        return await this.api.dispatch.post('articles', { Article: article })
    }

    async remove(articleNumber: string) {
        return await this.api.dispatch.delete(`articles/${articleNumber}`);
    }
}