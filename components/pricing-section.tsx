import Image from 'next/image';
import { Package } from 'lucide-react';

export default function PricingSection() {
    return (
        <section className="py-20 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-white mb-4">射擊套餐方案</h2>
                    <p className="text-gray-400">
                        提供多種套餐選擇，含接送服務・專業教練指導・全程攝影
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* 基礎套餐 */}
                    <div className="bg-zinc-900 rounded-xl p-8 border border-zinc-800 hover:border-red-500/50 transition">
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-white">基礎套餐</h3>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-bold text-white">NT$ 5,500</span>
                                <span className="text-gray-400">/人起</span>
                            </div>

                            <div className="space-y-4 pt-6 border-t border-zinc-800">
                                <p className="text-gray-300">4種槍型・40發子彈</p>
                                <ul className="space-y-3 text-gray-400">
                                    <li>• Glock 17 手槍 (10發)</li>
                                    <li>• .357 Mag 左輪手槍 (10發)</li>
                                    <li>• AR-15 步槍 (10發)</li>
                                    <li>• AK-47 步槍 (10發)</li>
                                </ul>
                            </div>

                            <button className="w-full py-3 bg-zinc-800 text-white rounded-lg hover:bg-red-600 transition">
                                立即預約
                            </button>
                        </div>
                    </div>

                    {/* 標準套餐 */}
                    <div className="bg-zinc-900 rounded-xl p-8 border border-red-500 relative">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-red-500 text-white text-sm rounded-full">
                            最受歡迎
                        </div>
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-white">標準套餐</h3>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-bold text-white">NT$ 6,900</span>
                                <span className="text-gray-400">/人起</span>
                            </div>

                            <div className="space-y-4 pt-6 border-t border-zinc-800">
                                <p className="text-gray-300">6種槍型・50發子彈</p>
                                <ul className="space-y-3 text-gray-400">
                                    <li>• 包含基礎套餐全部槍型</li>
                                    <li>• FABARM SDASS 霰彈槍 (5發)</li>
                                    <li>• SVD Dragunov 狙擊槍 (5發)</li>
                                </ul>
                            </div>

                            <button className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                                立即預約
                            </button>
                        </div>
                    </div>

                    {/* 尊榮套餐 */}
                    <div className="bg-zinc-900 rounded-xl p-8 border border-zinc-800 hover:border-red-500/50 transition">
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-white">尊榮套餐</h3>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-bold text-white">NT$ 7,700</span>
                                <span className="text-gray-400">/人起</span>
                            </div>

                            <div className="space-y-4 pt-6 border-t border-zinc-800">
                                <p className="text-gray-300">8種槍型・70發子彈</p>
                                <ul className="space-y-3 text-gray-400">
                                    <li>• 包含標準套餐全部槍型</li>
                                    <li>• CZ Scorpion EVO3 衝鋒槍 (10發)</li>
                                    <li>• CZ 805 BREN S1 突擊步槍 (10發)</li>
                                </ul>
                            </div>

                            <button className="w-full py-3 bg-zinc-800 text-white rounded-lg hover:bg-red-600 transition">
                                立即預約
                            </button>
                        </div>
                    </div>
                </div>

                {/* 套餐包含項目 */}
                <div className="mt-20 grid md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <div className="w-12 h-12 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Package className="w-6 h-6 text-red-500" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">全程接送</h3>
                        <p className="text-gray-400">提供布拉格市區飯店接送服務，無需擔心交通問題</p>
                    </div>
                    <div className="text-center">
                        <div className="w-12 h-12 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Package className="w-6 h-6 text-red-500" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">專業指導</h3>
                        <p className="text-gray-400">經驗豐富的教練全程英文指導，確保安全與樂趣</p>
                    </div>
                    <div className="text-center">
                        <div className="w-12 h-12 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Package className="w-6 h-6 text-red-500" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">專屬體驗</h3>
                        <p className="text-gray-400">不與其他團體併團，提供私密專屬的射擊體驗</p>
                    </div>
                </div>
            </div>
        </section>
    );
} 