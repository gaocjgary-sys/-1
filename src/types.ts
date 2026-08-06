export interface CroatiaHistoricalCompany {
  id: string;
  name: string;
  city: string;
  website: string;
  phone: string;
  email: string;
  address: string;
  brands: string[];
  chineseBrands: string[];
  bestSellers?: string;
}

export type TireSegment = 'PCR' | 'TBR' | 'OTR' | 'AGRI' | 'LCV' | 'MOTO' | 'SUV' | 'UHP';

export interface ChineseBrandSourced {
  brandEn: string;
  brandCn: string;
  categories: TireSegment[];
  partnershipType: 'Sole Agent / 独家代理' | 'Official Partner / 官方合作伙伴' | 'Direct Importer / 直接进口商' | 'Wholesale Distributor / 批发分销商';
  popularModels?: string[];
}

export type CountryCode = 'FR' | 'HR' | 'SI' | 'UA';
export type CountryName = 'France' | 'Croatia' | 'Slovenia' | 'Ukraine';

export type DistributorTier = '一级进口批发商' | '二级批发商' | '连锁零售商/快修' | 'B2B/电商平台';

export interface ImporterCompany {
  id: string;
  rank: number; // Rank within its country or overall
  distributorTier?: DistributorTier;
  country: CountryName;
  countryCn: string;
  countryCode: CountryCode;
  flagEmoji: string;
  name: string;
  frenchName: string; // or local official name (Russian/Ukrainian/Local name)
  city: string;
  region: string;
  department: string;
  foundedYear: number;
  estimatedAnnualVolume: string; // e.g. "3,500,000+ 条"
  annualVolumeNumber: number;
  employeeCount: string;
  warehouseArea: string; // e.g. "80,000 m²"
  logisticsHubsCount: number;
  website: string;
  phone: string;
  email: string;
  address: string;
  chineseSourcingVerified: boolean; // Must be true for all in list
  verifiedChineseBrands: ChineseBrandSourced[];
  segments: TireSegment[];
  clientTypes: string[];
  businessOverview: string;
  sourcingStrategy: string;
  procurementRequirements: {
    certification: string[];
    minOrderQuantity: string;
    paymentTerms: string;
    targetPriceSegment: string;
  };
  pitchingTips: string;
  latitude: number;
  longitude: number;
  hsCode?: string; // e.g. "4011.10.00 / 4011.20.00"
  customsRecordInfo?: string; // e.g. "俄罗斯海关报关单流水/2025提单核验"
  importSource?: 'VERIFIED_DATABASE' | 'USER_EXCEL_IMPORT';
}

export interface FilterState {
  searchQuery: string;
  country: CountryName | 'ALL';
  segment: TireSegment | 'ALL';
  region: string | 'ALL';
  brand: string | 'ALL';
  tier?: DistributorTier | 'ALL';
  sortBy: 'rank' | 'volume' | 'foundedYear';
}

export type ChatMessage = {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
};

export type VisitPriority = 'HIGH' | 'MEDIUM' | 'LOW';
export type VisitStatus = 'PLANNED' | 'CONTACTED' | 'CONFIRMED' | 'VISITED' | 'FOLLOWUP' | 'POSTPONED';

export interface VisitPlanItem {
  companyId: string;
  addedAt: string;
  visitDate?: string;
  priority: VisitPriority;
  status: VisitStatus;
  notes?: string;
  meetingObjective?: string;
}
