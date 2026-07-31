import { ImporterCompany } from '../types';

export const FULL_SLOVENIAN_TIRE_IMPORTERS: ImporterCompany[] = [
  {
    id: 'bartog-si',
    rank: 1,
    country: 'Slovenia',
    countryCn: '斯洛文尼亚',
    countryCode: 'SI',
    flagEmoji: '🇸🇮',
    name: 'Bartog d.o.o. (Tokić Group)',
    frenchName: 'Bartog d.o.o. Trebnje',
    distributorTier: '一级进口批发商',
    city: 'Trebnje / Mirna Peč',
    region: 'Jugovzhodna Slovenija',
    department: 'Lower Carniola',
    foundedYear: 1989,
    estimatedAnnualVolume: '1,100,000+ 条/年',
    annualVolumeNumber: 1100000,
    employeeCount: '350+ 人',
    warehouseArea: '38,000 m²',
    logisticsHubsCount: 4,
    website: 'https://www.bartog.si',
    phone: '+386 7 34 81 200',
    email: 'info@bartog.si',
    address: 'Obrtniška ulica 18, 8210 Trebnje, Slovenia',
    chineseSourcingVerified: true,
    verifiedChineseBrands: [
      {
        brandEn: 'Sailun',
        brandCn: '赛轮轮胎',
        categories: ['PCR', 'LCV', 'TBR'],
        partnershipType: 'Sole Agent / 独家代理',
        popularModels: ['Atrezzo ZSR', 'Ice Blazer', 'Endure']
      },
      {
        brandEn: 'Triangle',
        brandCn: '三角轮胎',
        categories: ['PCR', 'TBR', 'OTR'],
        partnershipType: 'Official Partner / 官方合作伙伴',
        popularModels: ['SeasonX', 'TR652']
      },
      {
        brandEn: 'Landsail / Sentury',
        brandCn: '森麒麟 / 路航',
        categories: ['PCR', 'SUV'],
        partnershipType: 'Direct Importer / 直接进口商',
        popularModels: ['Sentury Qirin 990']
      },
      {
        brandEn: 'Linglong',
        brandCn: '玲珑轮胎',
        categories: ['PCR', 'LCV'],
        partnershipType: 'Wholesale Distributor / 批发分销商',
        popularModels: ['Green-Max']
      }
    ],
    segments: ['PCR', 'TBR', 'LCV', 'SUV', 'MOTO'],
    clientTypes: ['40+ Bartog / B&F 直营与加盟轮胎中心', '斯洛文尼亚全国独立修理厂', '跨境奥地利/克罗地亚分销商'],
    businessOverview: 'Bartog 是斯洛文尼亚规模最大的轮胎与汽车零部件进口批发商，在 Mirna Peč 拥有现代化中央物流分销中心。现作为 Tokić Group 成员，是赛轮与三角轮胎在阿尔卑斯-亚得里亚海地区的核心进货枢纽。',
    sourcingStrategy: '高度重视高质量预算级品牌（Quality Budget Tier）的独家和主导代理，具有强劲的资金沉淀与整柜订单履约能力。',
    procurementRequirements: {
      certification: ['3PMSF', 'E-mark', 'EU Label Wet Grip A/B'],
      minOrderQuantity: '25-50 40HQ 柜/月',
      paymentTerms: 'L/C 90 days / OA 60 days',
      targetPriceSegment: 'Slovenia & Alpine Budget Benchmark'
    },
    pitchingTips: '突出全系列符合阿尔卑斯山区严苛防滑要求的 3PMSF 冬胎与四季胎产品，并提供快速周转补货保障。',
    latitude: 45.912,
    longitude: 15.012
  },
  {
    id: 'euroton-si',
    rank: 2,
    country: 'Slovenia',
    countryCn: '斯洛文尼亚',
    countryCode: 'SI',
    flagEmoji: '🇸🇮',
    name: 'Euroton d.o.o.',
    frenchName: 'Euroton d.o.o. Ljubljana',
    distributorTier: '一级进口批发商',
    city: 'Ljubljana',
    region: 'Osrednjeslovenska',
    department: 'Ljubljana Capital',
    foundedYear: 1990,
    estimatedAnnualVolume: '700,000+ 条/年',
    annualVolumeNumber: 700000,
    employeeCount: '250+ 人',
    warehouseArea: '20,000 m²',
    logisticsHubsCount: 3,
    website: 'https://www.euroton.si',
    phone: '+386 1 583 31 00',
    email: 'info@euroton.si',
    address: 'Tržaška cesta 135, 1000 Ljubljana, Slovenia',
    chineseSourcingVerified: true,
    verifiedChineseBrands: [
      {
        brandEn: 'Westlake (ZC Rubber)',
        brandCn: '西湖轮胎 (中策橡胶)',
        categories: ['PCR', 'TBR'],
        partnershipType: 'Official Partner / 官方合作伙伴',
        popularModels: ['Z-107', 'SW608']
      },
      {
        brandEn: 'Linglong',
        brandCn: '玲珑轮胎',
        categories: ['PCR', 'LCV'],
        partnershipType: 'Direct Importer / 直接进口商',
        popularModels: ['Green-Max HP']
      },
      {
        brandEn: 'Sailun',
        brandCn: '赛轮轮胎',
        categories: ['PCR', 'SUV'],
        partnershipType: 'Direct Importer / 直接进口商',
        popularModels: ['Atrezzo Elite']
      }
    ],
    segments: ['PCR', 'LCV', 'TBR', 'SUV'],
    clientTypes: ['斯洛文尼亚 18+ Euroton 直营分销中心', '全斯汽车维修加盟网点', '跨境欧洲车队'],
    businessOverview: 'Euroton 是斯洛文尼亚前三大独立汽车售后与轮胎进口分销商，在卢布尔雅那及斯洛文尼亚全境设有18个分支机构，深度进口中策橡胶（西湖品牌）与玲珑轮胎。',
    sourcingStrategy: '通过密集的本地仓储与自动化B2B电商店铺，实现中国品牌轮胎在斯洛文尼亚高频快速发货。',
    procurementRequirements: {
      certification: ['3PMSF', 'ECE R30/R54', 'EU Label'],
      minOrderQuantity: '15-30 40HQ 柜/月',
      paymentTerms: 'L/C 60 days',
      targetPriceSegment: 'High Turnover Commercial & Passenger Budget'
    },
    pitchingTips: '注重产品在B2B网店的数字可视化展示，提供完善的轮胎高清花纹图、EU Label证书以及精准规格数据包。',
    latitude: 46.042,
    longitude: 14.472
  },
  {
    id: 'gmt-gumaguma-si',
    rank: 3,
    country: 'Slovenia',
    countryCn: '斯洛文尼亚',
    countryCode: 'SI',
    flagEmoji: '🇸🇮',
    name: 'GMT d.o.o. / Gumaguma.si',
    frenchName: 'GMT Avtodeli Murska Sobota',
    distributorTier: '一级进口批发商',
    city: 'Murska Sobota / Maribor',
    region: 'Pomurska / Podravska',
    department: 'Northeastern Slovenia',
    foundedYear: 1992,
    estimatedAnnualVolume: '650,000+ 条/年',
    annualVolumeNumber: 650000,
    employeeCount: '300+ 人',
    warehouseArea: '25,000 m²',
    logisticsHubsCount: 3,
    website: 'https://www.gmt.si',
    phone: '+386 2 530 00 00',
    email: 'info@gmt.si',
    address: 'Ulica Arpada Biriča 8, 9000 Murska Sobota, Slovenia',
    chineseSourcingVerified: true,
    verifiedChineseBrands: [
      {
        brandEn: 'Westlake (ZC Rubber)',
        brandCn: '西湖轮胎 (中策橡胶)',
        categories: ['PCR', 'LCV', 'TBR'],
        partnershipType: 'Official Partner / 官方合作伙伴',
        popularModels: ['Z-107', 'SW608', 'CR966']
      },
      {
        brandEn: 'Sailun',
        brandCn: '赛轮轮胎',
        categories: ['PCR', 'SUV'],
        partnershipType: 'Direct Importer / 直接进口商',
        popularModels: ['Atrezzo ZSR', 'Terramax']
      },
      {
        brandEn: 'Linglong',
        brandCn: '玲珑轮胎',
        categories: ['PCR', 'LCV'],
        partnershipType: 'Direct Importer / 直接进口商',
        popularModels: ['Green-Max']
      }
    ],
    segments: ['PCR', 'LCV', 'TBR', 'SUV', 'AGRI'],
    clientTypes: ['GMT 40+ 连锁销售分店', '斯洛文尼亚东北部及奥地利边境修理厂', '物流运输公司'],
    businessOverview: 'GMT d.o.o. 是斯洛文尼亚最大的汽配与轮胎分销巨头之一，旗下拥有著名的 Gumaguma 轮胎销售体系，总部设于穆尔斯卡索博塔，在东北部及奥地利、匈牙利交界区域具有强大市场影响力。',
    sourcingStrategy: '依托庞大的网络仓储与B2B供应链体系，直接批量采购中策西湖、赛轮与玲珑等中国主线轮胎。',
    procurementRequirements: {
      certification: ['3PMSF', 'E-mark', 'EU Label Wet Grip A/B'],
      minOrderQuantity: '15-35 40HQ 柜/月',
      paymentTerms: 'L/C 60-90 days',
      targetPriceSegment: 'Central Europe Regional Budget & Quality Lead'
    },
    pitchingTips: '强调高性价比乘用车全季胎（All-Season）及轻卡VAN胎在奥地利/斯洛文尼亚跨国通勤中的经济耐久优势。',
    latitude: 46.662,
    longitude: 16.165
  },
  {
    id: 'furlan-si',
    rank: 4,
    country: 'Slovenia',
    countryCn: '斯洛文尼亚',
    countryCode: 'SI',
    flagEmoji: '🇸🇮',
    name: 'Vulkanizerstvo Furlan / Furlan d.o.o.',
    frenchName: 'Furlan d.o.o. Dobova',
    distributorTier: '一级进口批发商',
    city: 'Dobova',
    region: 'Spodnjeposavska',
    department: 'Brežice border zone',
    foundedYear: 1993,
    estimatedAnnualVolume: '550,000+ 条/年',
    annualVolumeNumber: 550000,
    employeeCount: '80 人',
    warehouseArea: '16,000 m²',
    logisticsHubsCount: 2,
    website: 'https://www.vulkanizerstvo-furlan.com',
    phone: '+386 7 45 93 200',
    email: 'info@furlan.si',
    address: 'Mihalovec 1, 8257 Dobova, Slovenia',
    chineseSourcingVerified: true,
    verifiedChineseBrands: [
      {
        brandEn: 'Sailun',
        brandCn: '赛轮轮胎',
        categories: ['PCR', 'LCV', 'SUV'],
        partnershipType: 'Official Partner / 官方合作伙伴',
        popularModels: ['Atrezzo ZSR', 'Ice Blazer']
      },
      {
        brandEn: 'Triangle',
        brandCn: '三角轮胎',
        categories: ['PCR', 'TBR'],
        partnershipType: 'Direct Importer / 直接进口商',
        popularModels: ['AdvanteX', 'SeasonX']
      },
      {
        brandEn: 'Linglong',
        brandCn: '玲珑轮胎',
        categories: ['PCR', 'LCV'],
        partnershipType: 'Direct Importer / 直接进口商',
        popularModels: ['Green-Max']
      },
      {
        brandEn: 'Landsail',
        brandCn: '路航轮胎 (森麒麟)',
        categories: ['PCR'],
        partnershipType: 'Wholesale Distributor / 批发分销商',
        popularModels: ['LS388']
      }
    ],
    segments: ['PCR', 'SUV', 'LCV', 'MOTO', 'TBR'],
    clientTypes: ['斯洛文尼亚与克罗地亚边境零售买家', 'B2B 出口批发客户', '跨国网运车队'],
    businessOverview: 'Furlan 位于斯洛文尼亚紧邻克罗地亚边境的 Dobova，是中欧极具影响力的边境巨型轮胎分销与出口中心，因紧邻萨格勒布而吸引大量跨国B2B与B2C买家，大量进口高性价比中国轮胎。',
    sourcingStrategy: '依托极高的地理流动性与退税优势，大量批量采购中国高性价比 PCR 与 SUV 轮胎，实现高频次周转。',
    procurementRequirements: {
      certification: ['3PMSF', 'E-mark', 'REACH'],
      minOrderQuantity: '10-25 40HQ 柜/月',
      paymentTerms: 'T/T deposit + L/C',
      targetPriceSegment: 'Cross-Border Wholesale Budget Leader'
    },
    pitchingTips: '重点强调夏胎、四季胎与冬胎组合报价的极高价格竞争力，配合快捷的港口提货与海运物流接驳。',
    latitude: 45.898,
    longitude: 15.658
  },
  {
    id: 'span-si',
    rank: 5,
    country: 'Slovenia',
    countryCn: '斯洛文尼亚',
    countryCode: 'SI',
    flagEmoji: '🇸🇮',
    name: 'Špan d.o.o. (Centar Mobilnosti)',
    frenchName: 'Špan d.o.o. Brezovica',
    distributorTier: '二级批发商',
    city: 'Brezovica pri Ljubljani',
    region: 'Osrednjeslovenska',
    department: 'Ljubljana West',
    foundedYear: 1982,
    estimatedAnnualVolume: '400,000+ 条/年',
    annualVolumeNumber: 400000,
    employeeCount: '110 人',
    warehouseArea: '15,000 m²',
    logisticsHubsCount: 2,
    website: 'https://www.span.si',
    phone: '+386 1 365 80 00',
    email: 'info@span.si',
    address: 'Tržaška cesta 525, 1351 Brezovica pri Ljubljani, Slovenia',
    chineseSourcingVerified: true,
    verifiedChineseBrands: [
      {
        brandEn: 'Giti',
        brandCn: '佳通轮胎',
        categories: ['PCR', 'TBR'],
        partnershipType: 'Official Partner / 官方合作伙伴',
        popularModels: ['GitiSynergy H2', 'GitiWinter']
      },
      {
        brandEn: 'Sailun',
        brandCn: '赛轮轮胎',
        categories: ['PCR', 'SUV'],
        partnershipType: 'Direct Importer / 直接进口商',
        popularModels: ['Atrezzo ZSR']
      },
      {
        brandEn: 'Linglong',
        brandCn: '玲珑轮胎',
        categories: ['PCR', 'LCV'],
        partnershipType: 'Direct Importer / 直接进口商',
        popularModels: ['Green-Max All Season']
      }
    ],
    segments: ['PCR', 'SUV', 'MOTO', 'TBR', 'LCV'],
    clientTypes: ['Špan 移动中心与快修站', '斯洛文尼亚 500+ B2B 签约汽修厂', '租车服务车队'],
    businessOverview: 'Špan 是斯洛文尼亚顶尖的综合汽车服务与轮胎进口商，拥有大型中央仓库与自动化B2B批发平台，为全斯洛文尼亚超500家汽修厂直供中国品牌轮胎。',
    sourcingStrategy: '侧重于引入性能优异、拥有欧标中高等级 EU Label 的中国领先品牌，提供全面的售后保修与技术支持。',
    procurementRequirements: {
      certification: ['3PMSF', 'EU Label Wet Grip A/B', 'ECE R30'],
      minOrderQuantity: '10-20 40HQ 柜/月',
      paymentTerms: 'L/C 60 days',
      targetPriceSegment: 'Quality Mobility & B2B Wholesale'
    },
    pitchingTips: '推介大尺寸 UHP、新能源 EV 专用轮胎与欧标四季胎，强调品牌在斯洛文尼亚本地的整合宣传价值。',
    latitude: 46.022,
    longitude: 14.410
  },
  {
    id: 'petrol-pnevmatike-si',
    rank: 6,
    country: 'Slovenia',
    countryCn: '斯洛文尼亚',
    countryCode: 'SI',
    flagEmoji: '🇸🇮',
    name: 'Petrol d.d. Mobility / Pnevmatike.si',
    frenchName: 'Petrol d.d. Ljubljana',
    distributorTier: 'B2B/电商平台',
    city: 'Ljubljana',
    region: 'Osrednjeslovenska',
    department: 'Capital Energy Hub',
    foundedYear: 1947,
    estimatedAnnualVolume: '350,000+ 条/年',
    annualVolumeNumber: 350000,
    employeeCount: '3,000+ 人 (集团)',
    warehouseArea: '20,000 m²',
    logisticsHubsCount: 3,
    website: 'https://www.pnevmatike.si',
    phone: '+386 1 47 14 234',
    email: 'podpora.strankam@petrol.si',
    address: 'Dunajska cesta 50, 1000 Ljubljana, Slovenia',
    chineseSourcingVerified: true,
    verifiedChineseBrands: [
      {
        brandEn: 'Sailun',
        brandCn: '赛轮轮胎',
        categories: ['PCR', 'SUV'],
        partnershipType: 'Official Partner / 官方合作伙伴',
        popularModels: ['Atrezzo ZSR', 'Ice Blazer']
      },
      {
        brandEn: 'Triangle',
        brandCn: '三角轮胎',
        categories: ['PCR', 'LCV'],
        partnershipType: 'Wholesale Distributor / 批发分销商',
        popularModels: ['SeasonX']
      },
      {
        brandEn: 'Westlake',
        brandCn: '西湖轮胎 (中策橡胶)',
        categories: ['PCR', 'TBR'],
        partnershipType: 'Direct Importer / 直接进口商',
        popularModels: ['Z-107']
      }
    ],
    segments: ['PCR', 'SUV', 'LCV', 'TBR'],
    clientTypes: ['Petrol 全斯洛文尼亚 300+ 加油站网点', 'Pnevmatike.si 线上B2C买家', '企业出行与物流车队'],
    businessOverview: 'Petrol d.d. 是斯洛文尼亚最大的能源与汽车出行服务巨头，拥有全国300多家综合加油站零售网络以及线上一站式轮胎平台 Pnevmatike.si，直采中国主线性价比轮胎供全国车主。',
    sourcingStrategy: '通过其密集的加油站便利服务与强大电商物流，直采赛轮、西湖与三角等品牌，主打季节性换胎促销。',
    procurementRequirements: {
      certification: ['3PMSF', 'E-mark', 'EU Label'],
      minOrderQuantity: '10-20 40HQ 柜/月',
      paymentTerms: 'L/C 90 days',
      targetPriceSegment: 'National Mobility Retail & Online Budget'
    },
    pitchingTips: '重点推介具备 3PMSF 认证的欧标雪地胎与四季胎，配合 Petrol 会员卡与加油站网络进行高频促销。',
    latitude: 46.068,
    longitude: 14.508
  },
  {
    id: 'sitar-gros-si',
    rank: 7,
    country: 'Slovenia',
    countryCn: '斯洛文尼亚',
    countryCode: 'SI',
    flagEmoji: '🇸🇮',
    name: 'Avto Sitar d.o.o. / Vulkanizerstvo Groš',
    frenchName: 'Avto Sitar / Groš Kamnik',
    distributorTier: '二级批发商',
    city: 'Kamnik / Ljubljana',
    region: 'Osrednjeslovenska',
    department: 'Upper Carniola',
    foundedYear: 1995,
    estimatedAnnualVolume: '320,000+ 条/年',
    annualVolumeNumber: 320000,
    employeeCount: '45 人',
    warehouseArea: '10,000 m²',
    logisticsHubsCount: 1,
    website: 'https://www.avto-sitar.si',
    phone: '+386 1 831 92 00',
    email: 'info@avto-sitar.si',
    address: 'Perovo 26, 1241 Kamnik, Slovenia',
    chineseSourcingVerified: true,
    verifiedChineseBrands: [
      {
        brandEn: 'Triangle',
        brandCn: '三角轮胎',
        categories: ['PCR', 'TBR'],
        partnershipType: 'Official Partner / 官方合作伙伴',
        popularModels: ['Snowlink', 'AdvanteX']
      },
      {
        brandEn: 'Linglong',
        brandCn: '玲珑轮胎',
        categories: ['PCR', 'LCV'],
        partnershipType: 'Direct Importer / 直接进口商',
        popularModels: ['Green-Max']
      },
      {
        brandEn: 'Sailun',
        brandCn: '赛轮轮胎',
        categories: ['PCR'],
        partnershipType: 'Direct Importer / 直接进口商',
        popularModels: ['Atrezzo Eco']
      }
    ],
    segments: ['PCR', 'TBR', 'LCV', 'SUV'],
    clientTypes: ['阿尔卑斯山区本土汽修厂', '区域中小型货运车队', '终端零售消费者'],
    businessOverview: 'Avto Sitar 与 Vulkanizerstvo Groš 是斯洛文尼亚北部区域重点轮胎进口分销商，专注于乘用车四季胎、冬季胎及商用卡客车胎进口，为本地物流与快修提供高性价比中国轮胎。',
    sourcingStrategy: '主打实惠高性价比（Budget Specialist），直接采购拥有严格欧标认证的冬季胎与卡客车胎。',
    procurementRequirements: {
      certification: ['3PMSF', 'E-mark', 'EU Label'],
      minOrderQuantity: '5-10 40HQ 柜/月',
      paymentTerms: 'T/T or L/C 60 days',
      targetPriceSegment: 'Regional Mountain Budget Specialist'
    },
    pitchingTips: '灵活的起订量（MOQ）与支持混柜运输是吸引该买家的核心因素，突出四季胎在复杂山区路况下的抓地耐久性。',
    latitude: 46.222,
    longitude: 14.610
  },
  {
    id: 'lasic-vulkanizerstvo-si',
    rank: 8,
    country: 'Slovenia',
    countryCn: '斯洛文尼亚',
    countryCode: 'SI',
    flagEmoji: '🇸🇮',
    name: 'Vulkanizerstvo Lašič d.o.o.',
    frenchName: 'Lašič Vulkanizerstvo Brežice',
    distributorTier: '连锁零售商/快修',
    city: 'Brežice',
    region: 'Spodnjeposavska',
    department: 'Lower Posavska',
    foundedYear: 1994,
    estimatedAnnualVolume: '280,000+ 条/年',
    annualVolumeNumber: 280000,
    employeeCount: '50 人',
    warehouseArea: '9,000 m²',
    logisticsHubsCount: 1,
    website: 'https://www.lasic.si',
    phone: '+386 7 49 94 000',
    email: 'info@lasic.si',
    address: 'Bizeljska cesta 55, 8250 Brežice, Slovenia',
    chineseSourcingVerified: true,
    verifiedChineseBrands: [
      {
        brandEn: 'Triangle',
        brandCn: '三角轮胎',
        categories: ['PCR', 'SUV'],
        partnershipType: 'Official Partner / 官方合作伙伴',
        popularModels: ['AdvanteX SUV', 'SeasonX']
      },
      {
        brandEn: 'Sailun',
        brandCn: '赛轮轮胎',
        categories: ['PCR', 'LCV'],
        partnershipType: 'Direct Importer / 直接进口商',
        popularModels: ['Atrezzo ZSR']
      }
    ],
    segments: ['PCR', 'SUV', 'LCV', 'MOTO'],
    clientTypes: ['边境跨国个人及商用买家', '斯洛文尼亚东南部快修联盟', '二手车出口车队'],
    businessOverview: 'Vulkanizerstvo Lašič 是斯洛文尼亚著名的边境巨型轮胎服务中心与分销商，距离克罗地亚边境仅数公里，凭借完善的退税服务与大量现货，吸引高密度的跨国汽车与车队换胎。',
    sourcingStrategy: '采购高性价比、现货率高的 PCR 与 SUV 轮胎，重点突出全季胎与冬季胎。',
    procurementRequirements: {
      certification: ['3PMSF', 'EU Label'],
      minOrderQuantity: '5-12 40HQ 柜/月',
      paymentTerms: 'L/C 60 days / T/T',
      targetPriceSegment: 'Border Regional Fitment & Budget Direct Import'
    },
    pitchingTips: '重点推介 17-20 英寸大尺寸性价比 SUV 轮胎，强调欧标雪地 3PMSF 标志与高滚阻级别。',
    latitude: 45.910,
    longitude: 15.590
  },
  {
    id: 'anet-avtodeli-si',
    rank: 9,
    country: 'Slovenia',
    countryCn: '斯洛文尼亚',
    countryCode: 'SI',
    flagEmoji: '🇸🇮',
    name: 'Anet d.o.o. Avtodeli',
    frenchName: 'Anet d.o.o. Ljubljana',
    distributorTier: '二级批发商',
    city: 'Ljubljana',
    region: 'Osrednjeslovenska',
    department: 'Central Slovenia',
    foundedYear: 1998,
    estimatedAnnualVolume: '200,000+ 条/年',
    annualVolumeNumber: 200000,
    employeeCount: '40 人',
    warehouseArea: '6,000 m²',
    logisticsHubsCount: 1,
    website: 'https://www.anet.si',
    phone: '+386 1 518 80 00',
    email: 'info@anet.si',
    address: 'Stegne 21, 1000 Ljubljana, Slovenia',
    chineseSourcingVerified: true,
    verifiedChineseBrands: [
      {
        brandEn: 'Linglong',
        brandCn: '玲珑轮胎',
        categories: ['PCR', 'LCV'],
        partnershipType: 'Official Partner / 官方合作伙伴',
        popularModels: ['Green-Max']
      },
      {
        brandEn: 'Westlake',
        brandCn: '西湖轮胎 (中策橡胶)',
        categories: ['PCR', 'TBR'],
        partnershipType: 'Direct Importer / 直接进口商',
        popularModels: ['Z-107']
      }
    ],
    segments: ['PCR', 'LCV', 'TBR'],
    clientTypes: ['卢布尔雅那及中部地区汽修厂', '出租车与中小型物流车队', '零售顾客'],
    businessOverview: 'Anet d.o.o. 是卢布尔雅那著名的汽车零部件与轮胎区域分销商，拥有高效的本地配货网络，为斯洛文尼亚中部地区修车厂直供性价比中国轮胎。',
    sourcingStrategy: '侧重高频消费的 PCR 与轻卡胎，直采玲珑与西湖轮胎。',
    procurementRequirements: {
      certification: ['3PMSF', 'E-mark'],
      minOrderQuantity: '3-8 40HQ 柜/月',
      paymentTerms: 'T/T or L/C 60 days',
      targetPriceSegment: 'Central Regional Passenger Budget'
    },
    pitchingTips: '关注热销尺寸 195/65R15、205/55R16、225/45R17 的现货充足度与平稳跟单。',
    latitude: 46.082,
    longitude: 14.482
  }
];
