import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
export function Footer() {
  const { t } = useLanguage();
  const columns = [{
    title: t('footer.ecosystem'),
    links: ['AIHUBOS.com', 'GiaiphapSo.com', 'ReBooking365', 'RealSpaSalon.com', 'AIHUBStore']
  }, {
    title: t('footer.partnerProgram'),
    links: ['Chương Trình Affiliate', 'Chương Trình Reseller', 'Gói Tin Agency', 'Chế Độ Invite']
  }, {
    title: t('footer.resources'),
    links: ['AIHUB Academy', 'Tài Liệu', 'Tài Liệu API', 'Trung Tâm Hỗ Trợ']
  }, {
    title: t('footer.connect'),
    links: ['Cộng Đồng Telegram', 'Cộng Đồng Zalo', 'Liên Hệ']
  }];
  return <footer className="border-t border-white/5 bg-[#0B0F17] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {columns.map((col, index) => <motion.div key={index} initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: index * 0.1
        }}>
              <h4 className="text-white font-bold mb-4 text-sm">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link, idx) => <li key={idx}>
                    <a href="#" className="text-gray-400 hover:text-blue-400 text-xs transition-colors">
                      {link}
                    </a>
                  </li>)}
              </ul>
            </motion.div>)}
        </div>

        <div className="border-t border-white/5 pt-8 text-center">
          <p className="text-gray-500 text-xs">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>;
}