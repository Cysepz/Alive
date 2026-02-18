// import React, { useState, useEffect } from 'react';
// import LogoImg from '../../assets/logo.png';

// const ContactInfoForm: React.FC = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     email: '',
//     relation: ''
//   });

//   const [errors, setErrors] = useState({
//     name: '',
//     phone: '',
//     email: '',
//     relation: ''
//   });

//   // 正則表達式與驗證規則
//   const phoneRegex = /^09\d{2}-\d{3}-\d{3}$/;
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   const forbiddenChars = /[!@#$%^&*(),.?":{}|<>/]/;

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));

//     // 姓名驗證 (min=1, max=10)
//     if (name === 'name') {
//       if (value.length < 1) setErrors(prev => ({ ...prev, name: '姓名不能為空' }));
//       else if (value.length > 10) setErrors(prev => ({ ...prev, name: '字數超出上限' }));
//       else if (forbiddenChars.test(value)) setErrors(prev => ({ ...prev, name: '禁止輸入特殊字元' }));
//       else setErrors(prev => ({ ...prev, name: '' }));
//     }

//     // 電話驗證 (09xx-xxx-xxx)
//     if (name === 'phone') {
//       if (!phoneRegex.test(value)) setErrors(prev => ({ ...prev, phone: '格式: 09xx-xxx-xxx' }));
//       else setErrors(prev => ({ ...prev, phone: '' }));
//     }

//     // Email 驗證
//     if (name === 'email') {
//       if (value && !emailRegex.test(value)) setErrors(prev => ({ ...prev, email: 'Email 格式錯誤' }));
//       else setErrors(prev => ({ ...prev, email: '' }));
//     }
//   };

//   const isFormValid = 
//     formData.name && formData.phone && formData.relation && 
//     !errors.name && !errors.phone && !errors.email;

//   return (
//     <div className="relative h-full w-full bg-white flex flex-col font-sans overflow-y-auto custom-scrollbar">
//       {/* 背景裝飾 */}
//       <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#79c4e0]/5 rounded-full blur-3xl pointer-events-none" />

//       <div className="flex-shrink-0 h-12 md:h-20" />
      
//       <main className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center px-8 md:px-16 lg:px-24 gap-12 lg:gap-32">
        
//         <div className="w-full md:w-1/2 max-w-md space-y-8 order-2 md:order-1">
//           <div className="space-y-2">
//             <h2 className="text-3xl font-black text-gray-900 tracking-tighter">信任聯絡人資料</h2>
//             <p className="text-xs text-gray-400 font-medium leading-relaxed">
//               註：系統僅會在使用者超過設定之未打卡天數時發送簡訊通知信任聯絡人。
//             </p>
//             <div className="w-12 h-1 bg-[#79c4e0] rounded-full" />
//           </div>

//           <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
//             {/* 聯絡人名稱 */}
//             <div className="grid grid-cols-[100px_1fr] items-center gap-4">
//               <label className="text-sm font-bold text-gray-500 ml-1">聯絡人名稱</label>
//               <div className="relative">
//                 <input 
//                   type="text" name="name" value={formData.name} onChange={handleChange} placeholder="請輸入" 
//                   className={`w-full px-6 py-4 bg-gray-50 border-2 rounded-2xl transition-all outline-none ${errors.name ? 'border-red-400 bg-red-50' : 'border-transparent focus:ring-[#79c4e0]/20'}`}
//                 />
//                 {errors.name && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-red-500 animate-pulse">{errors.name}</span>}
//               </div>
//             </div>

//             {/* 聯絡人電話 */}
//             <div className="grid grid-cols-[100px_1fr] items-center gap-4">
//               <label className="text-sm font-bold text-gray-500 ml-1">聯絡人電話</label>
//               <div className="relative">
//                 <input 
//                   type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="09xx-xxx-xxx" 
//                   className={`w-full px-6 py-4 bg-gray-50 border-2 rounded-2xl transition-all outline-none ${errors.phone ? 'border-red-400 bg-red-50' : 'border-transparent focus:ring-[#79c4e0]/20'}`}
//                 />
//                 {errors.phone && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-red-500 animate-pulse">{errors.phone}</span>}
//               </div>
//             </div>

//             {/* Email (選填) */}
//             <div className="grid grid-cols-[100px_1fr] items-center gap-4">
//               <label className="text-sm font-bold text-gray-500 ml-1">Email</label>
//               <div className="relative">
//                 <input 
//                   type="email" name="email" value={formData.email} onChange={handleChange} placeholder="選填" 
//                   className={`w-full px-6 py-4 bg-gray-50 border-2 rounded-2xl transition-all outline-none ${errors.email ? 'border-red-400 bg-red-50' : 'border-transparent focus:ring-[#79c4e0]/20'}`}
//                 />
//                 {errors.email && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-red-500 animate-pulse">{errors.email}</span>}
//               </div>
//             </div>

//             {/* 雙方關係 */}
//             <div className="grid grid-cols-[100px_1fr] items-center gap-4">
//               <label className="text-sm font-bold text-gray-500 ml-1">雙方關係</label>
//               <select 
//                 name="relation" value={formData.relation} onChange={handleChange}
//                 className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-gray-900 focus:ring-2 focus:ring-[#79c4e0]/20 outline-none appearance-none cursor-pointer"
//               >
//                 <option value="">請選擇</option>
//                 <option value="PARENTS">父母</option>
//                 <option value="SPOUSE">配偶</option>
//                 <option value="CHILDREN">子女</option>
//                 <option value="RELATIVES">親戚/朋友</option>
//               </select>
//             </div>

//             <div className="pt-4 flex justify-center md:justify-start">
//               <button 
//                 type="submit"
//                 disabled={!isFormValid}
//                 className={`px-12 py-3 font-bold rounded-xl transition-all duration-300 active:scale-95 shadow-sm ${
//                   !isFormValid ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-[#79c4e0]/20 text-[#1a6b9a] hover:bg-[#79c4e0] hover:text-white'
//                 }`}
//               >
//                 下一步
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* 右側插圖 */}
//         <div className="hidden md:flex md:w-1/2 justify-center items-center order-1 md:order-2">
//           <div className="relative w-full max-w-lg group">
//             <div className="absolute inset-0 bg-[#79c4e0]/5 rounded-full blur-3xl scale-110" />
//             <img src={LogoImg} alt="Alive Illustration" className="relative z-10 w-full h-auto object-contain opacity-90 drop-shadow-sm" />
//           </div>
//         </div>
//       </main>

//       <div className="flex-shrink-0 h-20" />
//     </div>
//   );
// };

// export default ContactInfoForm;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. 引入 useNavigate
import LogoImg from '../../assets/logo.png';

const ContactInfoForm: React.FC = () => {
  const navigate = useNavigate(); // 2. 初始化導航函式
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    relation: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // 3. 提交狀態控制

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    email: '',
    relation: ''
  });

  // 正則表達式與驗證規則
  const phoneRegex = /^09\d{2}-\d{3}-\d{3}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const forbiddenChars = /[!@#$%^&*(),.?":{}|<>/]/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // 姓名驗證 (min=1, max=10)
    if (name === 'name') {
      if (value.length < 1) setErrors(prev => ({ ...prev, name: '姓名不能為空' }));
      else if (value.length > 10) setErrors(prev => ({ ...prev, name: '字數超出上限' }));
      else if (forbiddenChars.test(value)) setErrors(prev => ({ ...prev, name: '禁止輸入特殊字元' }));
      else setErrors(prev => ({ ...prev, name: '' }));
    }

    // 電話驗證 (09xx-xxx-xxx)
    if (name === 'phone') {
      if (!phoneRegex.test(value)) setErrors(prev => ({ ...prev, phone: '格式: 09xx-xxx-xxx' }));
      else setErrors(prev => ({ ...prev, phone: '' }));
    }

    // Email 驗證
    if (name === 'email') {
      if (value && !emailRegex.test(value)) setErrors(prev => ({ ...prev, email: 'Email 格式錯誤' }));
      else setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  // 4. 修改後的送出處理邏輯
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);
    try {
      // 這裡呼叫新增聯絡人的 API (例如使用 axios)
      // const response = await axios.post('/api/user/contact', formData);
      
      console.log('聯絡人建立成功，準備進入主頁:', formData);
      
      // 5. 成功後導向 /home
      navigate('/home'); 
    } catch (error) {
      console.error('聯絡人建立失敗:', error);
      // 可在此加入錯誤提示彈窗
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = 
    formData.name && formData.phone && formData.relation && 
    !errors.name && !errors.phone && !errors.email;

  return (
    <div className="relative h-full w-full bg-white flex flex-col font-sans overflow-y-auto custom-scrollbar">
      {/* 背景裝飾 */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#79c4e0]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex-shrink-0 h-12 md:h-20" />
      
      <main className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center px-8 md:px-16 lg:px-24 gap-12 lg:gap-32">
        
        <div className="w-full md:w-1/2 max-w-md space-y-8 order-2 md:order-1">
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-gray-900 tracking-tighter">信任聯絡人資料</h2>
            <p className="text-xs text-gray-400 font-medium leading-relaxed">
              註：系統僅會在使用者超過設定之未打卡天數時發送簡訊通知信任聯絡人。
            </p>
            <div className="w-12 h-1 bg-[#79c4e0] rounded-full" />
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* 聯絡人名稱 */}
            <div className="grid grid-cols-[100px_1fr] items-center gap-4">
              <label className="text-sm font-bold text-gray-500 ml-1">聯絡人名稱</label>
              <div className="relative">
                <input 
                  type="text" name="name" value={formData.name} onChange={handleChange} placeholder="請輸入" 
                  className={`w-full px-6 py-4 bg-gray-50 border-2 rounded-2xl transition-all outline-none ${errors.name ? 'border-red-400 bg-red-50' : 'border-transparent focus:ring-[#79c4e0]/20'}`}
                />
                {errors.name && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-red-500 animate-pulse">{errors.name}</span>}
              </div>
            </div>

            {/* 聯絡人電話 */}
            <div className="grid grid-cols-[100px_1fr] items-center gap-4">
              <label className="text-sm font-bold text-gray-500 ml-1">聯絡人電話</label>
              <div className="relative">
                <input 
                  type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="09xx-xxx-xxx" 
                  className={`w-full px-6 py-4 bg-gray-50 border-2 rounded-2xl transition-all outline-none ${errors.phone ? 'border-red-400 bg-red-50' : 'border-transparent focus:ring-[#79c4e0]/20'}`}
                />
                {errors.phone && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-red-500 animate-pulse">{errors.phone}</span>}
              </div>
            </div>

            {/* Email (選填) */}
            <div className="grid grid-cols-[100px_1fr] items-center gap-4">
              <label className="text-sm font-bold text-gray-500 ml-1">Email</label>
              <div className="relative">
                <input 
                  type="email" name="email" value={formData.email} onChange={handleChange} placeholder="選填" 
                  className={`w-full px-6 py-4 bg-gray-50 border-2 rounded-2xl transition-all outline-none ${errors.email ? 'border-red-400 bg-red-50' : 'border-transparent focus:ring-[#79c4e0]/20'}`}
                />
                {errors.email && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-red-500 animate-pulse">{errors.email}</span>}
              </div>
            </div>

            {/* 雙方關係 */}
            <div className="grid grid-cols-[100px_1fr] items-center gap-4">
              <label className="text-sm font-bold text-gray-500 ml-1">雙方關係</label>
              <select 
                name="relation" value={formData.relation} onChange={handleChange}
                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-gray-900 focus:ring-2 focus:ring-[#79c4e0]/20 outline-none appearance-none cursor-pointer"
              >
                <option value="">請選擇</option>
                <option value="PARENTS">父母</option>
                <option value="SPOUSE">配偶</option>
                <option value="CHILDREN">子女</option>
                <option value="RELATIVES">親戚/朋友</option>
              </select>
            </div>

            <div className="pt-4 flex justify-center md:justify-start">
              <button 
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className={`px-12 py-3 font-bold rounded-xl transition-all duration-300 active:scale-95 shadow-sm ${
                  (!isFormValid || isSubmitting) ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-[#79c4e0]/20 text-[#1a6b9a] hover:bg-[#79c4e0] hover:text-white'
                }`}
              >
                {isSubmitting ? '處理中...' : '完成並進入主頁'}
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
    </div>
  );
};

export default ContactInfoForm;