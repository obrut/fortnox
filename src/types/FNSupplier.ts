import { DeepPartial } from "./defaults";

export type FNSupplier = DeepPartial<SupplierClass>;

export interface Supplier {
    Supplier: SupplierClass;
}

export interface SupplierClass {
    "@url":              string;
    Active:              boolean;
    Address1:            string;
    Address2:            string;
    Bank:                string;
    BankAccountNumber:   string;
    BG:                  string;
    BIC:                 string;
    BranchCode:          string;
    City:                string;
    ClearingNumber:      string;
    Comments:            string;
    CostCenter:          string;
    Country:             string;
    CountryCode:         string;
    Currency:            string;
    DisablePaymentFile:  boolean;
    Email:               string;
    Fax:                 string;
    IBAN:                string;
    Name:                string;
    OrganisationNumber:  string;
    OurReference:        string;
    OurCustomerNumber:   string;
    PG:                  string;
    Phone1:              string;
    Phone2:              string;
    PreDefinedAccount:   string;
    Project:             string;
    SupplierNumber:      string;
    TermsOfPayment:      string;
    VATNumber:           string;
    VATType:             string;
    VisitingAddress:     string;
    VisitingCity:        string;
    VisitingCountry:     string;
    VisitingCountryCode: string;
    VisitingZipCode:     string;
    WorkPlace:           string;
    WWW:                 string;
    YourReference:       string;
    ZipCode:             string;
}
