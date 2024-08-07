'use client'

import { ResourceContent } from '@/components/resource-content'
import { ResourceMenu } from '@/components/resource-menu'

export default function Page({
  params: { resource, media, service },
}: {
  params: { resource: string; media: string; service: string }
}) {
  return (
    <div className="flex mt-[60px] min-h-[100dvh]">
      {/* Sidebar Column */}
      <ResourceMenu resource={resource} media={media} service={service} />

      {/* Content Column */}
      <div className="flex-1 p-6">
        <ResourceContent resource={resource} media={media} service={service} />
      </div>
    </div>
  )
}
