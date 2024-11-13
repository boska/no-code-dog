import Image from 'next/image';
import { Check } from 'lucide-react';

export default function HomeSections() {
    return (
        <>
            {/* 射擊場展示區塊 */}
            <section className="py-20 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* 圖片區塊 */}
                        <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
                            <Image
                                src="https://placehold.co/1920x1080/1f1f1f/cccccc?text=Shooting+Range"
                                alt="布拉格射擊場內部"
                                fill
                                className="object-cover"
                                quality={100}
                            />
                        </div>

                        {/* 文字內容區塊 */}
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-foreground">專業室內射擊場</h2>
                            <p className="text-muted-foreground text-lg">
                                我們的射擊場配備完善的安全設施，提供多種射擊位置和靶位選擇。
                                無論您是初學者還是射擊愛好者，都能在這裡找到適合的挑戰。
                            </p>
                            <ul className="space-y-3">
                                {[
                                    '專業靶位設置',
                                    '完善安全設施',
                                    '多款槍型選擇',
                                    '專業教練指導',
                                    '攝影紀錄服務'
                                ].map((item, index) => (
                                    <li key={index} className="flex items-center gap-2 text-muted-foreground">
                                        <Check className="h-5 w-5 text-red-500" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <div className="pt-4">
                                <a
                                    href="/packages"
                                    className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold"
                                >
                                    查看射擊套餐
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 特色服務區塊 */}
            <section className="py-20 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-foreground mb-4">為什麼選擇我們？</h2>
                        <p className="text-muted-foreground">專業射擊場・專業教練・安全保障・一站式服務</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: '專業射擊場',
                                description: '捷克最大室內射擊場，配備完善的安全設施和專業設備',
                                image: 'https://placehold.co/800x600/1f1f1f/cccccc?text=Range'
                            },
                            {
                                title: '專業教練指導',
                                description: '經驗豐富的教練團隊，提供英文教學，確保您的射擊體驗安全順暢',
                                image: 'https://placehold.co/800x600/1f1f1f/cccccc?text=Instructor'
                            },
                            {
                                title: '便利接服務',
                                description: '提供飯店接送服務，省去交通煩惱，讓您專注享受射擊樂趣',
                                image: 'https://placehold.co/800x600/1f1f1f/cccccc?text=Transport'
                            }
                        ].map((feature, index) => (
                            <div key={index} className="bg-card/50 rounded-lg p-6 text-center">
                                <div className="relative w-full h-48 mb-6 rounded-lg overflow-hidden">
                                    <Image
                                        src={feature.image}
                                        alt={feature.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 熱門槍款展示 */}
            <section className="py-20 bg-card">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-foreground mb-4">熱門槍款展示</h2>
                        <p className="text-muted-foreground">多款經典槍型任您選擇，體驗不同射擊感受</p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { name: 'Glock 17', type: '手槍', image: 'https://placehold.co/800x600/1f1f1f/cccccc?text=Glock+17' },
                            { name: 'CZ 75', type: '手槍', image: 'https://placehold.co/800x600/1f1f1f/cccccc?text=CZ+75' },
                            { name: 'AK-47', type: '步槍', image: 'https://placehold.co/800x600/1f1f1f/cccccc?text=AK-47' },
                            { name: 'AR-15', type: '步槍', image: 'https://placehold.co/800x600/1f1f1f/cccccc?text=AR-15' }
                        ].map((gun, index) => (
                            <div key={index} className="bg-card rounded-lg overflow-hidden">
                                <div className="relative w-full h-48">
                                    <Image
                                        src={gun.image}
                                        alt={gun.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-bold text-foreground">{gun.name}</h3>
                                    <p className="text-muted-foreground">{gun.type}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 體驗流程 */}
            <section className="py-20 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-foreground mb-4">體驗流程</h2>
                        <p className="text-muted-foreground">簡單四步驟，輕鬆體驗射擊樂趣</p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { step: '1', title: '線上預約', desc: '選擇套餐並完成預約' },
                            { step: '2', title: '飯店接送', desc: '專車接送往返射擊場' },
                            { step: '3', title: '安全講解', desc: '專業教練講解安全須知' },
                            { step: '4', title: '開始體驗', desc: '在教練指導下開始射擊' }
                        ].map((item, index) => (
                            <div key={index} className="text-center">
                                <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                                <p className="text-muted-foreground">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ 區塊 */}
            <section className="py-20 bg-card">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-foreground mb-4">常見問題</h2>
                        <p className="text-muted-foreground">解答您的疑問，讓體驗更安心</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {[
                            {
                                q: '需要射擊執照嗎？',
                                a: '不需要，我們的教練會提供完整的安全指導。'
                            },
                            {
                                q: '可以拍照或錄影嗎？',
                                a: '可以，我們提供專業攝影服務，記錄精彩時刻。'
                            },
                            {
                                q: '有年齡限制嗎？',
                                a: '需要年滿18歲，並攜帶有效證件。'
                            },
                            {
                                q: '全程會有教練指導嗎？',
                                a: '是的，全程會有專業教練一對一指導。'
                            }
                        ].map((faq, index) => (
                            <div key={index} className="bg-card p-6 rounded-lg">
                                <h3 className="text-lg font-bold text-foreground mb-2">{faq.q}</h3>
                                <p className="text-muted-foreground">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA 區塊 */}
            <section className="py-20 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-foreground mb-8">準備好體驗射擊的刺激了？</h2>
                    <div className="flex gap-4 justify-center">
                        <a
                            href="/booking"
                            className="px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-bold"
                        >
                            立即預約
                        </a>
                        <a
                            href="/contact"
                            className="px-8 py-4 border border-border text-foreground rounded-lg hover:bg-accent transition"
                        >
                            聯絡我們
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
} 