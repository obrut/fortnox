import { DeepPartial } from "./defaults";

export type FNSupplierInvoice = DeepPartial<SupplierInvoiceClass>;

export type SupplierInvoice = {
    SupplierInvoice: SupplierInvoiceClass;
}

export type SupplierInvoiceClass = {
    "@url":                string;
    AdministrationFee:     string;
    Balance:               string;
    Booked:                boolean;
    Cancelled:             boolean;
    Comments:              string;
    CostCenter:            string;
    Credit:                boolean;
    CreditReference:       number;
    Currency:              string;
    CurrencyRate:          string;
    CurrencyUnit:          number;
    DisablePaymentFile:    boolean;
    DueDate:               string;
    ExternalInvoiceNumber: string;
    ExternalInvoiceSeries: string;
    Freight:               string;
    GivenNumber:           string;
    InvoiceDate:           string;
    InvoiceNumber:         string;
    OCR:                   string;
    OurReference:          string;
    PaymentPending:        boolean;
    Project:               string;
    RoundOffValue:         string;
    SupplierInvoiceRows:   SupplierInvoiceRow[];
    SupplierNumber:        string;
    SupplierName:          string;
    Total:                 string;
    VAT:                   string;
    YourReference:         string;
    VoucherNumber:         number;
    VoucherSeries:         string;
    VoucherYear:           number;
    VATType:               string;
    SalesType:             string;
    AccountingMethod:      string;
    Vouchers:              Voucher[];
    FinalPayDate:          string;
}

export type SupplierInvoiceRow = {
    Account:                number;
    ArticleNumber:          string;
    Code:                   string;
    CostCenter:             string;
    AccountDescription:     string;
    ItemDescription:        string;
    Debit:                  number;
    DebitCurrency:          number;
    Credit:                 number;
    CreditCurrency:         number;
    Project:                string;
    TransactionInformation: string;
    Price:                  number;
    Quantity:               number;
    Total:                  number;
    Unit:                   string;
    StockPointCode:         string;
    StockLocationCode:      string;
}

export type Voucher = {
    Number:        number;
    Year:          number;
    Series:        string;
    ReferenceType: string;
}
