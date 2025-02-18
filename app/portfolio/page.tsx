'use client'

import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { ExternalLink, Github, ChevronLeft, ChevronRight, Apple } from 'lucide-react'
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {portfolioItems.map((item) => (
        <div
          key={item.id}
          className="bg-card rounded-lg shadow-sm overflow-hidden"
        >
          <div className="p-3">
            <ProjectGallery screenshots={item.screenshots} />
          </div>

          <div className="px-5 pb-5">
            <div className="mb-4">
              <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
              <p className="text-base text-muted-foreground leading-relaxed">{item.description}</p>
              <p className="text-base text-muted-foreground leading-relaxed mt-2">{item.descriptionZh}</p>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {item.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-sm px-2 py-0.5">{tag}</Badge>
              ))}
            </div>

            <div className="flex gap-3">
              {item.githubUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-sm h-10 font-medium"
                  asChild
                >
                  <a href={item.githubUrl} target="_blank">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </a>
                </Button>
              )}
              {item.liveUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-sm h-10 font-medium"
                  asChild
                >
                  <a href={item.liveUrl} target="_blank">
                    {item.liveUrl.includes('apps.apple.com') ? (
                      <>
                        <Apple className="mr-2 h-4 w-4" />
                        Download on the AppStore
                      </>
                    ) : (
                      <>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Visit Website
                      </>
                    )}
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
