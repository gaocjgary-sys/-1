import React, { useState, useEffect, useRef, useMemo } from 'react';
import L from 'leaflet';
import { ALL_EUROPEAN_TIRE_IMPORTERS } from '../data/importersData';
import { ImporterCompany, CountryName, TireSegment } from '../types';
import { MapPin, Building, Truck, Globe, ChevronRight, Search, Layers, Maximize2, RotateCcw } from 'lucide-react';

interface FranceMapVisualizerProps {
  onSelectCompany: (company: ImporterCompany) => void;
  importers?: ImporterCompany[];
}

type MapMode = 'dark' | 'street';

interface CountryPreset {
  id: CountryName | 'ALL';
  label: string;
  flag: string;
  center: [number, number];
  zoom: number;
}

const COUNTRY_PRESETS: CountryPreset[] = [
  { id: 'France', label: '法国', flag: '🇫🇷', center: [46.603354, 1.888334], zoom: 6 },
  { id: 'Croatia', label: '克罗地亚', flag: '🇭🇷', center: [45.1, 15.2], zoom: 7 },
  { id: 'Slovenia', label: '斯洛文尼亚', flag: '🇸🇮', center: [46.15, 14.99], zoom: 8 },
  { id: 'Ukraine', label: '乌克兰', flag: '🇺🇦', center: [49.0, 31.0], zoom: 6 },
  { id: 'ALL', label: '欧洲四国全景', flag: '🇪🇺', center: [48.0, 16.0], zoom: 5 },
];

export const FranceMapVisualizer: React.FC<FranceMapVisualizerProps> = ({ onSelectCompany, importers }) => {
  const [selectedCountry, setSelectedCountry] = useState<CountryName | 'ALL'>('France');
  const [selectedSegment, setSelectedSegment] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mapMode, setMapMode] = useState<MapMode>('dark');
  const [activeCompany, setActiveCompany] = useState<ImporterCompany | null>(null);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  // Filter importers
  const filteredImporters = useMemo(() => {
    const sourceList = importers || ALL_EUROPEAN_TIRE_IMPORTERS;
    return sourceList.filter((imp) => {
      if (selectedCountry !== 'ALL') {
        const isMatch =
          imp.country === selectedCountry ||
          (selectedCountry === 'France' && (imp.countryCn === '法国' || imp.countryCode === 'FR')) ||
          (selectedCountry === 'Croatia' && (imp.countryCn === '克罗地亚' || imp.countryCode === 'HR')) ||
          (selectedCountry === 'Slovenia' && (imp.countryCn === '斯洛文尼亚' || imp.countryCode === 'SI')) ||
          (selectedCountry === 'Ukraine' && (imp.countryCn === '乌克兰' || imp.countryCode === 'UA'));

        if (!isMatch) return false;
      }
      if (selectedSegment !== 'ALL' && !imp.segments.includes(selectedSegment as TireSegment)) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = imp.name.toLowerCase().includes(q);
        const matchCity = imp.city.toLowerCase().includes(q);
        const matchBrand = imp.verifiedChineseBrands.some(
          (b) => b.brandEn.toLowerCase().includes(q) || b.brandCn.includes(q)
        );
        if (!matchName && !matchCity && !matchBrand) return false;
      }
      return true;
    });
  }, [selectedCountry, selectedSegment, searchQuery]);

  // Set active company when dataset changes if current active is filtered out
  useEffect(() => {
    if (filteredImporters.length > 0) {
      if (!activeCompany || !filteredImporters.some((i) => i.id === activeCompany.id)) {
        setActiveCompany(filteredImporters[0]);
      }
    } else {
      setActiveCompany(null);
    }
  }, [filteredImporters]);

  // Unique city list for quick jump
  const availableCities = useMemo(() => {
    const list = Array.from(
      new Set(
        filteredImporters.map((i) => {
          const mainCity = i.city.split('/')[0].trim();
          return mainCity;
        })
      )
    );
    return list.slice(0, 10);
  }, [filteredImporters]);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const preset = COUNTRY_PRESETS.find((p) => p.id === 'France') || COUNTRY_PRESETS[0];
      const map = L.map(mapContainerRef.current, {
        center: preset.center,
        zoom: preset.zoom,
        zoomControl: false,
      });

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      const darkUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
      const tile = L.tileLayer(darkUrl, {
        maxZoom: 18,
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
      }).addTo(map);

      tileLayerRef.current = tile;
      markersLayerRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Tile Layer when mapMode changes
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;

    mapInstanceRef.current.removeLayer(tileLayerRef.current);

    const tileUrl =
      mapMode === 'dark'
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

    const newTile = L.tileLayer(tileUrl, {
      maxZoom: 18,
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
    }).addTo(mapInstanceRef.current);

    tileLayerRef.current = newTile;
  }, [mapMode]);

  // Handle Country Selection & Camera Animation
  const handleSelectCountry = (countryId: CountryName | 'ALL') => {
    setSelectedCountry(countryId);
    const preset = COUNTRY_PRESETS.find((p) => p.id === countryId);
    if (preset && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(preset.center, preset.zoom, {
        duration: 1.2,
      });
    }
  };

  // Render Pins on Map
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    // Grouping by coordinate to handle micro-offsets for overlapping locations
    const coordCounts: Record<string, number> = {};

    filteredImporters.forEach((company, index) => {
      const baseKey = `${company.latitude.toFixed(3)}_${company.longitude.toFixed(3)}`;
      const indexInSameCity = coordCounts[baseKey] || 0;
      coordCounts[baseKey] = indexInSameCity + 1;

      // Calculate micro jitter offset for multi-companies in same city (e.g., Moscow, St. Petersburg, Vladivostok)
      const offsetLat = indexInSameCity > 0 ? (indexInSameCity % 2 === 0 ? 0.015 : -0.015) * Math.ceil(indexInSameCity / 2) : 0;
      const offsetLng = indexInSameCity > 0 ? (indexInSameCity % 2 === 1 ? 0.02 : -0.02) * Math.ceil(indexInSameCity / 2) : 0;

      const lat = company.latitude + offsetLat;
      const lng = company.longitude + offsetLng;

      const isSelected = activeCompany?.id === company.id;

      const cityNameShort = company.city.split('/')[0].trim();
      const companyShortName = company.name.split(' ')[0];

      // Custom div HTML marker
      const customIcon = L.divIcon({
        className: 'custom-map-pin-container',
        iconSize: [120, 42],
        iconAnchor: [20, 20],
        html: `
          <div class="relative group cursor-pointer flex items-center space-x-1.5 transition-transform duration-200 ${
            isSelected ? 'scale-110 z-50' : 'hover:scale-105 z-10'
          }">
            <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-lg border-2 ${
              isSelected
                ? 'bg-amber-400 text-slate-950 border-white ring-2 ring-amber-400/50'
                : 'bg-slate-800 text-amber-300 border-amber-500/70'
            }">
              ${index + 1}
            </div>
            <div class="bg-slate-900/95 backdrop-blur border ${
              isSelected ? 'border-amber-400 text-amber-300 ring-1 ring-amber-400/30' : 'border-slate-700 text-slate-200'
            } px-2 py-0.5 rounded-lg shadow-md text-[11px] font-bold whitespace-nowrap leading-tight">
              <div>${companyShortName}</div>
              <div class="text-[9px] text-slate-400 font-medium">${company.flagEmoji} ${cityNameShort}</div>
            </div>
          </div>
        `,
      });

      const marker = L.marker([lat, lng], { icon: customIcon });

      marker.on('click', () => {
        setActiveCompany(company);
        if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo([company.latitude, company.longitude], Math.max(mapInstanceRef.current.getZoom(), 8), {
            duration: 0.8,
          });
        }
      });

      markersLayerRef.current?.addLayer(marker);
    });
  }, [filteredImporters, activeCompany]);

  // Fly camera to a specific city
  const handleJumpToCity = (cityName: string) => {
    const target = filteredImporters.find((i) => i.city.includes(cityName));
    if (target && mapInstanceRef.current) {
      setActiveCompany(target);
      mapInstanceRef.current.flyTo([target.latitude, target.longitude], 9, {
        duration: 1.0,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-amber-400" />
            <span>欧洲四国（法·克·斯·乌）真实地理与城市地图分布</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            高精度真实国家地图背景：已准确定位 97 家轮胎进口商总部及核心物流仓储所在的 35+ 个欧洲城市
          </p>
        </div>

        {/* Map Theme Toggle */}
        <div className="flex items-center space-x-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setMapMode('dark')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
              mapMode === 'dark'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>夜间暗色地图</span>
          </button>
          <button
            onClick={() => setMapMode('street')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
              mapMode === 'street'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>实景路网地图</span>
          </button>
        </div>
      </div>

      {/* Preset Country Bar & Search / Segment Filters */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Country Tabs */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
            {COUNTRY_PRESETS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleSelectCountry(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer whitespace-nowrap ${
                  selectedCountry === tab.id
                    ? 'bg-amber-500 text-slate-950 font-extrabold shadow-md'
                    : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <span>{tab.flag}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="搜索城市、公司名或中国品牌..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 text-xs text-white placeholder-slate-500 pl-9 pr-3 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Tire Segment Filter + Quick City Jump Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/80 text-xs">
          <div className="flex items-center space-x-1.5 overflow-x-auto">
            <span className="text-slate-400 font-medium whitespace-nowrap">品类筛选:</span>
            {[
              { id: 'ALL', label: '全部品类' },
              { id: 'PCR', label: '乘用车 (PCR)' },
              { id: 'TBR', label: '卡客车 (TBR)' },
              { id: 'OTR', label: '工程胎 (OTR)' },
              { id: 'AGRI', label: '农用胎 (AGRI)' },
              { id: 'LCV', label: '轻卡 (LCV)' },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedSegment(s.id)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  selectedSegment === s.id
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Quick City Navigation Tags */}
          {availableCities.length > 0 && (
            <div className="flex items-center space-x-1.5 overflow-x-auto">
              <span className="text-slate-500 text-[11px]">热门城市快速聚焦:</span>
              {availableCities.map((city) => (
                <button
                  key={city}
                  onClick={() => handleJumpToCity(city)}
                  className="px-2 py-0.5 rounded-md bg-slate-950 text-slate-300 hover:text-amber-400 border border-slate-800 text-[11px] whitespace-nowrap cursor-pointer"
                >
                  📍 {city}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Map & Detail Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Real Leaflet Map Box */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm relative min-h-[360px] sm:min-h-[520px] flex flex-col">
          {/* Map Top Badge */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-[1000] bg-slate-950/90 border border-slate-800 backdrop-blur px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-[11px] sm:text-xs text-slate-200 font-bold shadow-lg flex items-center space-x-1.5 sm:space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>
              已加载 {filteredImporters.length} 家目标进口商标记
            </span>
          </div>

          {/* Map Container */}
          <div ref={mapContainerRef} className="w-full h-[360px] sm:h-[520px] z-0 touch-manipulation" />
        </div>

        {/* Selected Importer Location Details Card */}
        <div className="lg:col-span-4 space-y-4">
          {activeCompany ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
              <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-base">{activeCompany.flagEmoji}</span>
                    <span className="text-xs font-bold text-amber-400">
                      {activeCompany.countryCn}排名 #{activeCompany.rank}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mt-0.5 leading-snug">
                    {activeCompany.name}
                  </h3>
                  <div className="text-xs text-slate-400 mt-0.5">{activeCompany.frenchName}</div>
                </div>

                <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-center shrink-0">
                  <span className="text-[10px] text-slate-500 block">仓库总面积</span>
                  <span className="text-xs font-bold text-emerald-400">{activeCompany.warehouseArea}</span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center space-x-2 text-slate-300">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    <strong>准确落脚城市:</strong> {activeCompany.city} ({activeCompany.region})
                  </span>
                </div>

                <div className="flex items-center space-x-2 text-slate-300">
                  <Truck className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>
                    <strong>仓储分布枢纽:</strong> {activeCompany.logisticsHubsCount} 个分销集散中心
                  </span>
                </div>

                <div className="flex items-center space-x-2 text-slate-300">
                  <Building className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>
                    <strong>年估算进口量:</strong> {activeCompany.estimatedAnnualVolume}
                  </span>
                </div>
              </div>

              {/* Verified Brands */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-xs font-semibold text-slate-400">已核实采买中国品牌:</span>
                <div className="flex flex-wrap gap-1.5">
                  {activeCompany.verifiedChineseBrands.map((b) => (
                    <span
                      key={b.brandEn}
                      className="bg-slate-950 text-amber-300 border border-slate-800 px-2.5 py-1 rounded-lg text-xs font-bold"
                    >
                      {b.brandEn} ({b.brandCn})
                    </span>
                  ))}
                </div>
              </div>

              {/* Brief Overview */}
              <div className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <div className="text-slate-400 font-semibold text-[11px]">分销网络与采购特色:</div>
                <p>{activeCompany.businessOverview}</p>
              </div>

              <button
                onClick={() => onSelectCompany(activeCompany)}
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs py-2.5 rounded-xl flex items-center justify-center space-x-2 transition-colors cursor-pointer shadow-md"
              >
                <span>查看 {activeCompany.name} 完整出海档案</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-400 text-xs">
              点击地图上的城市标记点查看对应的进口商落脚城市与仓储网络
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
