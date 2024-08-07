'use client'

import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { scrollToTop } from '@/lib/scrollToTop'

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  // Show button when user scrolls down 100px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 ${isVisible ? 'block' : 'hidden'}`}
    >
      <Button variant={'outline'} onClick={scrollToTop} className="px-2">
        <ArrowUp />
      </Button>
    </div>
  )
}
