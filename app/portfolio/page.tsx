'use client'

import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { ExternalLink, Github, ChevronLeft, ChevronRight, Apple, Mail, Linkedin, MapPin } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface Screenshot {
  url: string
  alt: string
}

interface PortfolioItem {
  id: number
  title: string
  description: string
  descriptionZh: string
  screenshots: Screenshot[]
  tags: string[]
  liveUrl?: string
  githubUrl?: string
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 0,
    title: "Yang Lee",
    description: "Experienced mobile developer specializing in iOS development with a strong track record of delivering high-quality applications. Passionate about creating intuitive user experiences and solving complex technical challenges.",
    descriptionZh: "軟體工程師，蘋果與手機為主",
    screenshots: [
      { url: '/avatar.png', alt: 'Profile Photo' }
    ],
    tags: ["iOS Development", "Swift", "SwiftUI", "Objective-C", "React", "TypeScript", "Next.js"],
    githubUrl: "https://github.com/boska",
    liveUrl: "https://linkedin.com/in/yangleetw"
  },
  {
    id: 1,
    title: 'Bonder iOS',
    description: 'Modern social networking app with real-time chat using Firebase. Features location-based discovery and rich push notifications.',
    descriptionZh: '現代化社群應用程式，使用 Firebase 實現即時聊天。具備位置探索功能和豐富推送通知。',
    screenshots: [
      { url: '/portfolio/bonder/1.jpeg', alt: 'Social Feed' },
      { url: '/portfolio/bonder/2.jpeg', alt: 'Chat Interface' },
      { url: '/portfolio/bonder/3.jpeg', alt: 'Location Discovery' },
      { url: '/portfolio/bonder/4.jpeg', alt: 'Profile View' }
    ],
    tags: ['Swift', 'RxSwift', 'MapKit', 'Core Location', 'Push Notifications', 'Firebase', 'Core Animation', 'Realm'],
    liveUrl: 'https://apps.apple.com/app/bonder-social/id1234567890',
  },
  {
    id: 2,
    title: 'EZTABLE iOS + iPadOS',
    description: 'Restaurant booking app. Features vouchers and EZCASH and Apple Pay integration.',
    descriptionZh: '餐廳訂位應用程式，餐券 EZCASH 和 Apple Pay 整合。',
    screenshots: [
      { url: '/portfolio/eztable/1.jpeg', alt: 'Restaurant Discovery' },
      { url: '/portfolio/eztable/2.jpeg', alt: 'Booking Flow' },
      { url: '/portfolio/eztable/3.jpeg', alt: 'AR Menu Preview' },
      { url: '/portfolio/eztable/4.jpeg', alt: 'Payment Integration' }
    ],
    tags: ['Objective-C', 'MapKit', 'Core Location', 'PassKit', 'Core Animation', 'Core Data', 'StoreKit'],
    liveUrl: 'https://apps.apple.com/tw/app/eztable/id858841159',
  },
  {
    id: 3,
    title: 'Mobile01',
    description: 'Feature-rich forum app with WidgetKit. Includes native rich text editor and member chating functionality.',
    descriptionZh: '功能豐富的論壇應用程式。包含原生富文本編輯器和進階搜尋功能。',
    screenshots: [
      { url: '/portfolio/mobile01/1.jpeg', alt: 'Forum Browser' },
      { url: '/portfolio/mobile01/2.jpeg', alt: 'Rich Text Editor' },
      { url: '/portfolio/mobile01/3.jpeg', alt: 'Search Interface' },
      { url: '/portfolio/mobile01/4.jpeg', alt: 'Widget Preview' }
    ],
    tags: ['Objective-C', 'UIKit'],
    liveUrl: 'https://apps.apple.com/tw/app/mobile01/id1234567890',
  },
  {
    id: 5,
    title: 'SAP Concur iOS',
    description: 'Enterprise expense management app with Vision-based receipt scanning. Built with offline-first architecture and SiriKit integration.',
    descriptionZh: '企業費用管理應用程式，具備 Vision 收據掃描功能。採用離線優先架構，整合 SiriKit。',
    screenshots: [
      { url: '/portfolio/sap-concur/1.jpeg', alt: 'Receipt Scanner' },
    ],
    tags: ['Swift', 'Objective-C', 'Core Data', 'Vision', 'LocalAuthentication', 'Combine', 'SwiftUI', 'RxSwift'],
    liveUrl: 'https://apps.apple.com/us/app/sap-concur/id335023774',
  },
  {
    id: 6,
    title: 'Opkix',
    description: 'Companion app for wearable cameras with low-latency streaming. Features AVFoundation for video effects and BLE videos sync.',
    descriptionZh: '穿戴式相機配套應用程式，具備低延遲串流。使用 AVFoundation 實現影片特效，支援 BLE 同步。',
    screenshots: [
      { url: '/portfolio/opkix/1.jpeg', alt: 'Camera Control' },
    ],
    tags: ['Swift', 'RxSwift', 'AVFoundation', 'Core Bluetooth', 'Core Image', 'PhotoKit', 'CloudKit', 'Core Motion', 'Core Audio'],
    liveUrl: 'https://apps.apple.com/us/app/opkix/id1442645369',
  }
]

const ProjectGallery = ({ screenshots }: { screenshots: Screenshot[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % screenshots.length)
  }

  const previous = () => {
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length)
  }

  return (
    <div className="relative group">
      <div className="relative w-full max-w-[300px] h-[633px] mx-auto overflow-hidden rounded-2xl shadow-lg bg-gray-100">
        {screenshots.map((screenshot, index) => (
          <div
            key={screenshot.url}
            style={{ display: index === currentIndex ? 'block' : 'none' }}
            className="relative w-full h-full"
          >
            <Image
              src={screenshot.url}
              alt={screenshot.alt}
              fill
              style={{ objectFit: 'contain' }}
              sizes="300px"
              priority
            />
          </div>
        ))}

        {/* Navigation buttons */}
        <button
          onClick={previous}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Next image"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        {/* Dots indicator */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-1">
          {screenshots.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-all",
                index === currentIndex ? "bg-primary w-3" : "bg-primary/50"
              )}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function PortfolioPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
      {portfolioItems.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: item.id * 0.1,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="group bg-card hover:bg-[#419388]/5 rounded-xl shadow-sm hover:shadow-md overflow-hidden transition-all duration-300"
        >
          <div className="p-3 sm:p-4">
            {item.id === 0 ? (
              <div className="relative w-full h-[200px] sm:h-[240px] rounded-lg overflow-hidden bg-gradient-to-br from-[#419388]/10 via-[#419388]/5 to-background">
                <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-black/10" />
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36">
                    <Image
                      src={item.screenshots[0].url}
                      alt={item.screenshots[0].alt}
                      fill
                      className="rounded-full object-cover border-4 border-background shadow-md"
                      priority
                    />
                  </div>
                </motion.div>
              </div>
            ) : (
              <motion.div
                className="relative rounded-lg overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectGallery screenshots={item.screenshots} />
              </motion.div>
            )}
          </div>

          <div className="px-3 sm:px-6 pb-4 sm:pb-6">
            <div className="mb-3 sm:mb-4">
              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 group-hover:text-[#419388] transition-colors">{item.title}</h3>
              <p className="text-sm sm:text-base text-muted-foreground/90 leading-relaxed">{item.description}</p>
              <p className="text-sm sm:text-base text-muted-foreground/80 leading-relaxed mt-2">{item.descriptionZh}</p>
            </div>

            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5">
              {item.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs px-2 sm:px-2.5 py-0.5 bg-muted/50 hover:bg-[#419388]/10 transition-colors"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex gap-2 sm:gap-3">
              {item.id === 0 ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs sm:text-sm h-9 sm:h-10 font-medium hover:bg-[#333333] hover:text-white transition-all duration-300"
                    asChild
                  >
                    <a href={item.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-1.5 sm:mr-2 h-3.5 sm:h-4 w-3.5 sm:w-4" />
                      GitHub
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs sm:text-sm h-9 sm:h-10 font-medium hover:bg-[#419388] hover:text-white transition-all duration-300"
                    asChild
                  >
                    <a href={item.liveUrl} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="mr-1.5 sm:mr-2 h-3.5 sm:h-4 w-3.5 sm:w-4" />
                      LinkedIn
                    </a>
                  </Button>
                </>
              ) : (
                <>
                  {item.githubUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs sm:text-sm h-9 sm:h-10 font-medium hover:bg-[#333333] hover:text-white transition-all duration-300"
                      asChild
                    >
                      <a href={item.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-1.5 sm:mr-2 h-3.5 sm:h-4 w-3.5 sm:w-4" />
                        GitHub
                      </a>
                    </Button>
                  )}
                  {item.liveUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs sm:text-sm h-9 sm:h-10 font-medium hover:bg-[#419388] hover:text-white transition-all duration-300"
                      asChild
                    >
                      <a href={item.liveUrl} target="_blank" rel="noopener noreferrer">
                        {item.liveUrl.includes('apps.apple.com') ? (
                          <>
                            <Apple className="mr-1.5 sm:mr-2 h-3.5 sm:h-4 w-3.5 sm:w-4" />
                            App Store
                          </>
                        ) : (
                          <>
                            <ExternalLink className="mr-1.5 sm:mr-2 h-3.5 sm:h-4 w-3.5 sm:w-4" />
                            Website
                          </>
                        )}
                      </a>
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

const gridClassName = "relative w-full h-full [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] before:absolute before:inset-0 before:bg-grid-slate-900/[0.04] before:content-[''] dark:before:bg-grid-slate-100/[0.03] dark:before:bg-[size:7px_7px]"
