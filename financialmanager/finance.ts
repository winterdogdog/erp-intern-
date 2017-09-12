export interface Deposit {
  amount: number;
  code: string;
  creditBalance: number;
  creditLine: number;
  depositAmount: number;
  mobile: string;
  retailerID: number;
  retailerName: string;
}
export interface Finances {
  id: number;
  retailerID: number;
  retailerName: string;
  mobile: string;
  action: number;
  amount: number;
  actionTime: number;
  operatorId: number;
  comment: string;
  createTime: number;
  creditLine: number;
  creditBalance: number;
  depositAmount: number;
}
export interface Finance {
  totalElements?: number;
  totalPages?: number;
  numberOfElements?: number;
  size?: number;
  number?: number;
  content?: FinanceContent[];
}

export interface FinanceContent {
  id?: number;
  retailerId?: number;
  status?: any;
  createTime?: number;
  retailerName?: string;
  retailerTel?: string;
  completeTime?: any;
  updateTime?: any;
  operatorId?: any;
  remainAmount?: number;
  amount?: number;
}

export interface QueryFinance {
  status?: string;
  createTimeSearch?: number;
  retailerNameOrTel?: string;
  page?: number;
  size?: number;
}
