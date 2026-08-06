import { ImporterCompany } from '../types';
import { FULL_FRENCH_TIRE_IMPORTERS } from './frenchImportersData';
import { FULL_CROATIAN_TIRE_IMPORTERS } from './croatianImportersData';
import { FULL_SLOVENIAN_TIRE_IMPORTERS } from './slovenianImportersData';
import { FULL_UKRAINIAN_TIRE_IMPORTERS } from './ukrainianImportersData';

export const TOP_FRENCH_TIRE_IMPORTERS: ImporterCompany[] = FULL_FRENCH_TIRE_IMPORTERS;
export const TOP_CROATIAN_TIRE_IMPORTERS: ImporterCompany[] = FULL_CROATIAN_TIRE_IMPORTERS;
export const TOP_SLOVENIAN_TIRE_IMPORTERS: ImporterCompany[] = FULL_SLOVENIAN_TIRE_IMPORTERS;
export const TOP_UKRAINIAN_TIRE_IMPORTERS: ImporterCompany[] = FULL_UKRAINIAN_TIRE_IMPORTERS;

export const ALL_EUROPEAN_TIRE_IMPORTERS: ImporterCompany[] = [
  ...TOP_FRENCH_TIRE_IMPORTERS,
  ...TOP_CROATIAN_TIRE_IMPORTERS,
  ...TOP_SLOVENIAN_TIRE_IMPORTERS,
  ...TOP_UKRAINIAN_TIRE_IMPORTERS,
];

export const CHINESE_BRANDS_MATRIX = [
  { brandEn: 'Sailun', brandCn: '赛轮轮胎', importers: ['Distri Cash', 'Dipropneu', 'Massa Group', 'Muchpneu', 'Tokić', 'CIAAK Auto', 'Auto Hrvatska', 'Gumiimpex', 'Bartog', 'Euroton', 'Furlan', 'Špan', 'Avto Sitar', 'CFP Wholesale', 'Norauto', 'Point S', 'Euromaster', 'Allopneus', 'Alsagom', 'Sud-Ouest Pneus', 'Auto Antonio', 'Vulkal', 'Autogume.hr', 'GMT', 'Petrol', 'Lašič', 'Zapaska', 'Technoopt-Torg-Dnepr'] },
  { brandEn: 'Rovelo', brandCn: '陆陆通轮胎 (赛轮集团)', importers: ['Distri Cash'] },
  { brandEn: 'Taurus', brandCn: '金牛轮胎 (Taurus Tyres)', importers: ['Distri Cash'] },
  { brandEn: 'Tracmax', brandCn: '创密斯轮胎', importers: ['Distri Cash', 'Centralepneus', '1001Pneus', 'Allopneus', 'Muchpneu', 'Autogume.hr', 'Shyp-Shyna'] },
  { brandEn: 'Evergreen', brandCn: '长荣轮胎', importers: ['Distri Cash', 'SCP Pneumatiques'] },
  { brandEn: 'Westlake (ZC Rubber)', brandCn: '西湖轮胎 (中策橡胶)', importers: ['Distri Cash', 'Copadex', 'CFP Wholesale', 'Norauto', 'Point S', 'Feu Vert', '1001Pneus', 'Muchpneu', 'Sogep Pneus', 'CIAAK Auto', 'Auto Hrvatska', 'Pneumatik', 'Euroton', 'Vulkal', 'Gumi Centar Kordić', 'GMT', 'Petrol', 'Anet', 'Omega LLC'] },
  { brandEn: 'Ceat', brandCn: 'CEAT 轮胎', importers: ['Distri Cash'] },
  { brandEn: 'Roadking', brandCn: '路王轮胎', importers: ['Distri Cash', 'Garazh.ua'] },
  { brandEn: 'Linglong', brandCn: '玲珑轮胎', importers: ['Copadex', 'Massa Group', 'Interpneu', 'Bertrand Pneus', 'Soreg Pneus', 'Sogep Pneus', 'Tokić', 'Pneumatik', 'Gumiimpex', 'Bartog', 'Euroton', 'Furlan', 'Špan', 'Avto Sitar', 'Norauto', 'Allopneus', 'Auto Antonio', 'Gumi Centar Kordić', 'GMT', 'Anet', 'Zapaska', 'Omega LLC'] },
  { brandEn: 'Triangle', brandCn: '三角轮胎', importers: ['Copadex', 'Alsagom', 'Bertrand Pneus', 'Centralepneus', 'Speedy', 'Allopneus', 'POD Ouest', 'Tokić', 'CIAAK Auto', 'Auto Hrvatska', 'Gumiimpex', 'Bartog', 'Furlan', 'Avto Sitar', 'Euromaster', 'Vulkal', 'Autounion', 'Petrol', 'Lašič', 'Technoopt-Torg-Dnepr'] },
  { brandEn: 'Doublestar / Double Coin', brandCn: '双星 / 双钱轮胎', importers: ['Dipropneu', 'Fort Pneus', 'Copadex', 'Soreg Pneus', 'SCP Pneumatiques', 'Auto Hrvatska', 'Euroton', 'Špan', 'Autounion', 'Shyp-Shyna'] },
  { brandEn: 'Sentury (Landsail/Delinte)', brandCn: '森麒麟 (路航/德林特)', importers: ['Massa Group', 'Bertrand Pneus', 'Speedy', 'Tokić', 'Pneumatik', 'Bartog', 'Furlan'] },
  { brandEn: 'Giti', brandCn: '佳通轮胎', importers: ['CIAAK Auto', 'Špan', 'Garazh.ua'] },
  { brandEn: 'Aeolus / Windpower', brandCn: '风神 / 风力轮胎', importers: ['Dipropneu', 'Fort Pneus', 'Interpneu', 'Sud-Ouest Pneus', 'Gumiimpex', 'Avto Sitar', 'Technoopt-Torg-Dnepr'] },
  { brandEn: 'Wanli', brandCn: '万力轮胎', importers: ['Dipropneu', 'Feu Vert', 'Alsagom', 'POD Ouest', 'Auto Antonio'] },
  { brandEn: 'Rotalla', brandCn: '路泰莱轮胎', importers: ['Centralepneus', '1001Pneus'] },
  { brandEn: 'Powertrac', brandCn: '普林斯轮胎', importers: ['SCP Pneumatiques'] },
  { brandEn: 'Nankang', brandCn: '南港轮胎', importers: ['Allopneus'] },
];

