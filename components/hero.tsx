import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative w-full min-h-[800px] lg:min-h-[900px] bg-zinc-900">
      {/* 背景圖片預留位置 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70">
        {/* 之後在這裡添加 Image 組件 */}
      </div>

      {/* 內容層 - 調整上下間距 */}
      <div className="relative flex items-center py-20 lg:py-32">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="flex items-center justify-center gap-2 text-sm">
              <span className="px-4 py-1 bg-red-500/80 rounded-full text-white">
                布拉格射擊場
              </span>
              <span className="px-4 py-1 bg-zinc-500/80 rounded-full text-white">
                含飯店接送
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              布拉格實彈射擊體驗
            </h1>

            <p className="text-lg lg:text-xl text-gray-200 max-w-3xl mx-auto">
              體驗捷克最大室內射擊場
              <br />
              專業教練指導・無需執照・含接送服務
            </p>

            {/* 統計數據 - 調整間距和大小 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto text-white">
              <div>
                <div className="text-3xl lg:text-4xl font-bold">25+</div>
                <div className="text-sm text-gray-300">槍款選擇</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-bold">100+</div>
                <div className="text-sm text-gray-300">發子彈</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-bold">2hr</div>
                <div className="text-sm text-gray-300">體驗時間</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-bold">5⭐</div>
                <div className="text-sm text-gray-300">顧客評價</div>
              </div>
            </div>

            {/* 槍款預覽 - 改善響應式設計 */}
            <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 text-white text-sm">
              <div className="space-y-1">
                <div className="font-semibold">手槍</div>
                <div className="text-gray-400">Glock 17, CZ 75</div>
              </div>
              <div className="space-y-1">
                <div className="font-semibold">步槍</div>
                <div className="text-gray-400">AK-47, AR-15</div>
              </div>
              <div className="space-y-1">
                <div className="font-semibold">狙擊槍</div>
                <div className="text-gray-400">Dragunov SVD</div>
              </div>
            </div>

            {/* CTA 按鈕 - 調整大小和間距 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/booking"
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-bold text-lg"
              >
                立即預約
              </Link>
              <Link
                href="/packages"
                className="px-6 py-3 border border-white text-white rounded-lg hover:bg-white/10 transition text-lg"
              >
                套餐方案
              </Link>
            </div>

            {/* 補充資訊 */}
            <p className="text-sm text-gray-400 pt-4">
              提供中文/英文服務・無需執照・含飯店接送・專業攝影
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
