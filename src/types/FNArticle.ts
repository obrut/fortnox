import { DeepPartial } from "./defaults";

export type FNArticle = DeepPartial<ArticleClass>;

export type Article = {
    Article: ArticleClass;
}

export type ArticleClass = {
    ArticleNumber: string,
    Bulky: boolean,
    ConstructionAccount: number,
    Depth: number,
    Description: string,
    DisposableQuantity: number,
    EAN: string,
    EUAccount: number,
    EUVATAccount: number,
    ExportAccount: number,
    Height: number,
    Housework: boolean,
    HouseworkType: string,
    Active: boolean,
    Manufacturer: string,
    ManufacturerArticleNumber: string,
    Note: string,
    PurchaseAccount: number,
    PurchasePrice: number,
    QuantityInStock: number,
    ReservedQuantity: number,
    SalesAccount: number,
    StockGoods: boolean,
    StockPlace: string,
    StockValue: number,
    StockWarning: number,
    SupplierName: string,
    SupplierNumber: string,
    Type: string,
    Unit: string,
    VAT: number,
    WebshopArticle: boolean,
    Weight: number,
    Width: number,
    Expired: boolean,
    SalesPrice: number,
    CostCalculationMethod: string,
    StockAccount: number,
    StockChangeAccount: number,
    DirectCost: number,
    FreightCost: number,
    OtherCost: number,
    DefaultStockPoint: string,
    DefaultStockLocation: string
}