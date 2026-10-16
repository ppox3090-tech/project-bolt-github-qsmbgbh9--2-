import './globals.css';
import 'leaflet/dist/leaflet.css';
import type { Metadata } from 'next';
import { Noto_Sans_Thai } from 'next/font/google';

const notoSansThai = Noto_Sans_Thai({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'กว๊านพะเยา | แนะนำร้านอาหารและสถานที่ท่องเที่ยว',
  description: 'ระบบแนะนำร้านอาหาร คาเฟ่ และสถานที่ท่องเที่ยวรอบกว๊านพะเยา พะเยา',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className={notoSansThai.className}>{children}</body>
    </html>
  );
}
