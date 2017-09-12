export interface Custom {
    customerID: number;
    customerName: string;
    mobile: string;
    retailerName: string;
    email: string;
    country: string;
    state: string;
    city: string;
    address: string;
}

export interface Retailer {
    retailerID: number;
    partnerId: number;
    retailerName: string;
    aliasName: string;
    comments: string;
    contacts: string;
    tel: string;
    address?: any;
    district?: any;
    cityId?: any;
    level: number;
    type: number;
    lastTime?: any;
    email: string;
    taxing: string;
    loanNumber: number;
    loanDay: number;
    visitFlag: number;
    cardNumber?: any;
    createDate: string;
    rememberToken?: any;
    country: string;
    postcode?: any;
    credit?: any;
    business?: any;
    storefrontImageUrl1?: any;
    storefrontImageUrl2?: any;
    storefrontImageUrl3?: any;
    grade?: any;
    licenseUrl?: any;
    billTitle?: any;
    identityUrl1?: any;
    identityUrl2?: any;
    owner?: any;
    ownerSex?: any;
    paybillId?: any;
    profession?: any;
    education?: any;
    mobile: string;
    city: string;
    state: string;
    mrType: number;
    carNo?: any;
    isValid: number;
    status: number;
    
}

export interface QueryCustom {
    nameOrMobile?: string;
    page?: number;
    size?: number;
    retailerName?: string;
}

export interface QueryRetailer {
    nameOrMobile?: string;
    page?: number;
    size?: number;
}
