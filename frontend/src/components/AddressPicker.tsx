import React, { useMemo } from 'react';
import { TAIWAN_DATA } from '../constants/taiwan-data';

interface AddressPickerProps {
  city: string;
  district: string;
  detail: string;
  onChange: (field: string, value: string) => void;
  error?: string; // 接收來自父層的錯誤訊息
}

const AddressPicker: React.FC<AddressPickerProps> = ({ city, district, detail, onChange, error }) => {
  const districts = useMemo(() => (city ? TAIWAN_DATA[city] : []), [city]);

  return (
    <div className="space-y-3 w-full">
      <div className="flex gap-3">
        {/* 縣市選單 */}
        <select
          value={city}
          onChange={(e) => {
            onChange('city', e.target.value);
            onChange('district', ''); 
          }}
          className="flex-1 px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#79c4e0]/20 outline-none cursor-pointer text-gray-900"
        >
          <option value="">選擇縣市</option>
          {Object.keys(TAIWAN_DATA).map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {/* 區域選單 */}
        <select
          value={district}
          disabled={!city}
          onChange={(e) => onChange('district', e.target.value)}
          className="flex-1 px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#79c4e0]/20 outline-none cursor-pointer disabled:opacity-50 text-gray-900"
        >
          <option value="">選擇區域</option>
          {districts.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* 詳細地址輸入框 - 統一錯誤顯示樣式 */}
      <div className="relative">
        <input
          type="text"
          value={detail}
          onChange={(e) => onChange('detailAddress', e.target.value)}
          placeholder="路名、門牌號碼"
          className={`w-full px-6 py-4 bg-gray-50 border-2 rounded-2xl transition-all outline-none ${
            error 
              ? 'border-red-400 bg-red-50 focus:ring-red-100' 
              : 'border-transparent focus:ring-[#79c4e0]/20 focus:bg-white'
          }`}
        />
        {/* 與帳號/姓名統一的動態警告字眼 */}
        {error && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-red-500 animate-pulse whitespace-nowrap">
            {error}
          </span>
        )}
      </div>
    </div>
  );
};

export default AddressPicker;