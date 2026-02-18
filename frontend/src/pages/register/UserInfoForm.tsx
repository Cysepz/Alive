import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoImg from '../../assets/logo.png';
import AddressPicker from '../../components/AddressPicker';

const UserInfoForm: React.FC = () => {
  const navigate = useNavigate();
  
  // 狀態管理：儲存輸入值與錯誤訊息
  const [formData, setFormData] = useState({
    account: '',
    username: '',
    birthday: '',
    city: '',            // 縣市
    district: '',        // 區域
    detailAddress: '',   // 門牌路名
    address: '',         // 最終組合地址 (用於送出與正則驗證)
    situation: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // 提交狀態控制

  const [errors, setErrors] = useState({
    account: '',
    username: '',
    birthday: '',
    address: ''
  });

  const igAccountRegex = /^[a-z0-9._]+$/;
  const forbiddenChars = /[!@#$%^&*(),.?":{}|<>/]/;
  const addressRegex = /^[\u4e00-\u9fa5]{2,5}(市|縣)[\u4e00-\u9fa5]{2,5}(區|鎮|鄉|市)[\u4e00-\u9fa5\d\u00b7].*$/;

  // --- 地址自動組合與驗證邏輯 ---
  useEffect(() => {
    const fullAddr = `${formData.city}${formData.district}${formData.detailAddress}`;
    setFormData(prev => ({ ...prev, address: fullAddr }));

    if (formData.detailAddress) {
      if (!addressRegex.test(fullAddr)) {
        setErrors(prev => ({ ...prev, address: '請輸入包含路名與門牌的完整地址' }));
      } else {
        setErrors(prev => ({ ...prev, address: '' }));
      }
    } else if (formData.city || formData.district) {
      setErrors(prev => ({ ...prev, address: '地址尚未填寫完整' }));
    }
  }, [formData.city, formData.district, formData.detailAddress]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const lowerValue = name === 'account' ? value.toLowerCase() : value;
    
    setFormData(prev => ({ ...prev, [name]: lowerValue }));

    if (name === 'account') {
      if (!lowerValue) {
        setErrors(prev => ({ ...prev, account: '帳號不能為空' }));
      } else if (lowerValue.length > 30) {
        setErrors(prev => ({ ...prev, account: '帳號不能超過 30 個字元' }));
      } else if (!igAccountRegex.test(lowerValue)) {
        setErrors(prev => ({ ...prev, account: '僅限英數、下底線或句點' }));
      } else if (lowerValue.startsWith('.') || lowerValue.endsWith('.')) {
        setErrors(prev => ({ ...prev, account: '句點不能在開頭或結尾' }));
      } else if (lowerValue.includes('..')) {
        setErrors(prev => ({ ...prev, account: '不能連續使用兩個句點' }));
      } else {
        setErrors(prev => ({ ...prev, account: '' }));
      }
    }

    if (name === 'username') {
      if (forbiddenChars.test(value)) {
        setErrors(prev => ({ ...prev, username: '禁止輸入特殊字元！' }));
      } else {
        setErrors(prev => ({ ...prev, username: '' }));
      }
    }
  };

  const updateAddressFields = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormInvalid = () => {
    return (
      !formData.account ||
      !formData.username ||
      !formData.birthday ||
      !formData.city ||
      !formData.district ||
      !formData.detailAddress ||
      !formData.situation || // 確保居住狀況也已選擇
      !!errors.account ||
      !!errors.username ||
      !!errors.address
    );
  };

  // --- 送出邏輯：Call API 並跳轉 ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormInvalid() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      // 這裡呼叫你的註冊 API
      // await axios.post('/api/user/signup', formData); 
      
      console.log('User 建立成功:', formData);
      
      // 跳轉至下一頁 (聯絡人資料填寫)
      navigate('/signup/contact'); 
    } catch (error) {
      console.error('註冊失敗:', error);
      // 可在此加入彈窗提示使用者錯誤
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative h-full w-full bg-white flex flex-col font-sans overflow-y-auto custom-scrollbar">
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#79c4e0]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex-shrink-0 h-12 md:h-20" />
      
      <main className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center px-8 md:px-16 lg:px-24 gap-12 lg:gap-32">
        
        <div className="w-full md:w-1/2 max-w-md space-y-8 order-2 md:order-1">
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-gray-900 tracking-tighter">基本資料</h2>
            <div className="w-12 h-1 bg-[#79c4e0] rounded-full" />
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* 帳號 */}
            <div className="grid grid-cols-[100px_1fr] items-center gap-4">
              <label className="text-sm font-bold text-gray-500 ml-1">使用者帳號</label>
              <div className="relative">
                <input 
                  type="text" 
                  name="account"
                  value={formData.account}
                  onChange={handleChange}
                  placeholder="請輸入帳號" 
                  className={`w-full px-6 py-4 bg-gray-50 border-2 rounded-2xl transition-all outline-none ${errors.account ? 'border-red-400 bg-red-50 focus:ring-red-100' : 'border-transparent focus:ring-[#79c4e0]/20'}`}
                />
                {errors.account && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-red-500 animate-pulse">{errors.account}</span>}
              </div>
            </div>

            {/* 名稱 */}
            <div className="grid grid-cols-[100px_1fr] items-center gap-4">
              <label className="text-sm font-bold text-gray-500 ml-1">使用者名稱</label>
              <div className="relative">
                <input 
                  type="text" 
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="請輸入名稱" 
                  className={`w-full px-6 py-4 bg-gray-50 border-2 rounded-2xl transition-all outline-none ${errors.username ? 'border-red-400 bg-red-50' : 'border-transparent focus:ring-[#79c4e0]/20'}`}
                />
                {errors.username && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-red-500 animate-pulse">{errors.username}</span>}
              </div>
            </div>

            {/* 生日 */}
            <div className="grid grid-cols-[100px_1fr] items-center gap-4">
              <label className="text-sm font-bold text-gray-500 ml-1">生日</label>
              <input 
                type="date" 
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-900 transition-all outline-none focus:ring-[#79c4e0]/20 focus:bg-white"
              />
            </div>

            {/* 居住地址 */}
            <div className="grid grid-cols-[100px_1fr] items-start gap-4">
              <label className="text-sm font-bold text-gray-500 ml-1 mt-4">居住地址</label>
              <div className="relative w-full">
                <AddressPicker 
                  city={formData.city}
                  district={formData.district}
                  detail={formData.detailAddress}
                  onChange={updateAddressFields}
                  error={errors.address}
                />
              </div>
            </div>

            {/* 居住狀況 */}
            <div className="grid grid-cols-[100px_1fr] items-center gap-4">
              <label className="text-sm font-bold text-gray-500 ml-1">居住狀況</label>
              <select 
                name="situation"
                value={formData.situation}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-gray-900 focus:ring-2 focus:ring-[#79c4e0]/20 outline-none appearance-none cursor-pointer"
              >
                <option value="">請選擇居住狀況</option>
                <option value="living_alone">獨居</option>
                <option value="with_parents">與家人同住</option>
                <option value="with_spouse">與配偶同住</option>
                <option value="with_children">與子女同住</option>
                <option value="with_relatives">與朋友/室友同住</option>
              </select>
            </div>

            <div className="pt-4 flex justify-center md:justify-start">
              <button 
                type="submit"
                disabled={isFormInvalid() || isSubmitting}
                className={`px-12 py-3 font-bold rounded-xl transition-all duration-300 active:scale-95 shadow-sm ${
                  (isFormInvalid() || isSubmitting)
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-[#79c4e0]/20 text-[#1a6b9a] hover:bg-[#79c4e0] hover:text-white'
                }`}
              >
                {isSubmitting ? '處理中...' : '下一步'}
              </button>
            </div>
          </form>
        </div>

        {/* 右側插圖 */}
        <div className="hidden md:flex md:w-1/2 justify-center items-center order-1 md:order-2">
          <div className="relative w-full max-w-lg group">
            <div className="absolute inset-0 bg-[#79c4e0]/5 rounded-full blur-3xl scale-110" />
            <img src={LogoImg} alt="Alive Illustration" className="relative z-10 w-full h-auto object-contain opacity-90 drop-shadow-sm" />
          </div>
        </div>
      </main>

      <div className="flex-shrink-0 h-20" />
      <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent" />
    </div>
  );
};

export default UserInfoForm;