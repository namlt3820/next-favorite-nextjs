'use client'

import { ResourceContent } from '@/components/resource-content'
import { ResourceMenu } from '@/components/resource-menu'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export default function Page({
  params: { resource, media, service },
}: {
  params: { resource: string; media: string; service: string }
}) {
  const isDesktop = useMediaQuery('(min-width: 1280px)')

  return (
    <div className="flex mt-[60px] min-h-[100dvh]">
      {/* Sidebar Column */}
      {isDesktop ? (
        <ResourceMenu resource={resource} media={media} service={service} />
      ) : null}

      {/* Content Column */}
      <div className="flex-1 px-2 py-6 md:p-6">
        <ResourceContent resource={resource} media={media} service={service} />
      </div>
    </div>
  )
}
