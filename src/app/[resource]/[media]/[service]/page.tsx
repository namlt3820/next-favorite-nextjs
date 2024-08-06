'use client'

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
        <h1 className="text-2xl font-bold mb-4">Title</h1>
        <p className="text-lg">
          This is where you can add the description or content related to the
          selected category or action.
        </p>
      </div>
    </div>
  )
}
