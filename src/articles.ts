import { Dispatch } from './dispatch';
import { FNArticle } from './types/FNArticle';
import { Util } from './utils';

type ArticleResult = {
    Article: FNArticle
}

export class Articles {
    private dispatch: Dispatch;
    private util: Util;
    private path = 'articles';
    
    constructor(dispatch: Dispatch){
        this.dispatch = dispatch;
        this.util = new Util();
    }
    
    async get(articleNumber: string) {
        const result = await this.dispatch.get(`${this.path}/${articleNumber}`) as unknown as ArticleResult;
        return result.Article;
    }

    async getAll(filter?: string) {
        let path = this.path;
        if (filter)
            path += '?filter=' + filter;
        const result = await this.util.getAllPages(path, 'Articles', this.dispatch) as FNArticle[];
        return result;
    }

    async create(article: any) {
        const result = await this.dispatch.post(this.path, { Article: article }) as ArticleResult;
        return result.Article;
    }

    async update(article: any) {
        const result = await this.dispatch.put(`${this.path}/${article.ArticleNumber}`, { Article: article }) as ArticleResult;
        return result.Article;
    }

    async remove(articleNumber: string) {
        //Remove or make inactive
        try {
            const result = await this.dispatch.delete(`${this.path}/${articleNumber}`);
            return result;
        } catch (error) {
            const result = await this.update( { ArticleNumber: articleNumber, Active: false } );
            return result.Active === false;
        }
    }
}