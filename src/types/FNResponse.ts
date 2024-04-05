interface MetaInformation {
    '@TotalPages': number;
    '@CurrentPage': number;
    '@TotalResources': number;
}

type FNResponseBase = {
    [key: string]: any[];
};

export type FNResponse = FNResponseBase & {
    MetaInformation: MetaInformation;
};