import { DeepPartial } from "./defaults";

export type FNInvoice = DeepPartial<InvoiceClass>;

export type Invoice = {
    Invoice: InvoiceClass;
}

export type InvoiceClass = {
    "@url":                    string;
    "@urlTaxReductionList":    string;
    AdministrationFee:         number;
    AdministrationFeeVAT:      number;
    Address1:                  string;
    Address2:                  string;
    Balance:                   number;
    BasisTaxReduction:         number;
    Booked:                    boolean;
    Cancelled:                 boolean;
    City:                      string;
    Comments:                  string;
    ContractReference:         number;
    ContributionPercent:       number;
    ContributionValue:         number;
    Country:                   string;
    CostCenter:                string;
    Credit:                    string;
    CreditInvoiceReference:    string;
    Currency:                  string;
    CurrencyRate:              number;
    CurrencyUnit:              number;
    CustomerName:              string;
    CustomerNumber:            string;
    DeliveryAddress1:          string;
    DeliveryAddress2:          string;
    DeliveryCity:              string;
    DeliveryCountry:           string;
    DeliveryDate:              string;
    DeliveryName:              string;
    DeliveryZipCode:           string;
    DocumentNumber:            string;
    DueDate:                   string;
    EDIInformation:            EDIInformation;
    EmailInformation:          EmailInformation;
    EUQuarterlyReport:         boolean;
    ExternalInvoiceReference1: string;
    ExternalInvoiceReference2: string;
    Freight:                   number;
    FreightVAT:                number;
    Gross:                     number;
    HouseWork:                 boolean;
    InvoiceDate:               string;
    InvoicePeriodStart:        string;
    InvoicePeriodEnd:          string;
    InvoicePeriodReference:    string;
    InvoiceRows:               InvoiceRow[];
    InvoiceType:               string;
    Labels:                    Label[];
    Language:                  string;
    LastRemindDate:            string;
    Net:                       number;
    NotCompleted:              boolean;
    NoxFinans:                 boolean;
    OCR:                       string;
    OfferReference:            string;
    OrderReference:            string;
    OrganisationNumber:        string;
    OurReference:              string;
    PaymentWay:                string;
    Phone1:                    string;
    Phone2:                    string;
    PriceList:                 string;
    PrintTemplate:             string;
    Project:                   string;
    WarehouseReady:            boolean;
    OutboundDate:              string;
    Remarks:                   string;
    Reminders:                 number;
    RoundOff:                  number;
    Sent:                      boolean;
    TaxReduction:              number;
    TermsOfDelivery:           string;
    TermsOfPayment:            string;
    TimeBasisReference:        number;
    Total:                     number;
    TotalToPay:                number;
    TotalVAT:                  number;
    VATIncluded:               boolean;
    VoucherNumber:             number;
    VoucherSeries:             string;
    VoucherYear:               number;
    WayOfDelivery:             string;
    YourOrderNumber:           string;
    YourReference:             string;
    ZipCode:                   string;
    AccountingMethod:          string;
    TaxReductionType:          string;
    FinalPayDate:              string;
}

export type EDIInformation = {
    EDIGlobalLocationNumber:         string;
    EDIGlobalLocationNumberDelivery: string;
    EDIInvoiceExtra1:                string;
    EDIInvoiceExtra2:                string;
    EDIOurElectronicReference:       string;
    EDIYourElectronicReference:      string;
    EDIStatus:                       string;
}

export type EmailInformation = {
    EmailAddressFrom: string;
    EmailAddressTo:   string;
    EmailAddressCC:   string;
    EmailAddressBCC:  string;
    EmailSubject:     string;
    EmailBody:        string;
}

export type InvoiceRow = {
    AccountNumber:          number;
    ArticleNumber:          string;
    ContributionPercent:    string;
    ContributionValue:      string;
    CostCenter:             string;
    DeliveredQuantity:      string;
    Description:            string;
    Discount:               number;
    DiscountType:           string;
    HouseWork:              boolean;
    HouseWorkHoursToReport: number;
    HouseWorkType:          string;
    Price:                  number;
    PriceExcludingVAT:      number;
    Project:                string;
    RowId:                  number;
    StockPointCode:         string;
    Total:                  number;
    TotalExcludingVAT:      number;
    Unit:                   string;
    VAT:                    number;
}

export type Label = {
    Id: number;
}