import { ExternalLink } from 'lucide-react'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary py-6 text-white relative z-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between">
          {/* Company Info */}
          <div className="mb-2 w-full md:mb-0 md:w-1/3">
            <h2 className="mb-2 text-base font-bold">
              {' '}
              &copy; {currentYear} NextFavorite
            </h2>
            <p className="text-sm text-gray-400 md:text-base">
              Email: namlt3820@gmail.com
            </p>
          </div>

          {/* Social Media Icons */}
          <div className="flex h-full w-full gap-3 md:w-1/3 md:justify-end md:justify-items-stretch">
            <a
              href="https://github.com/namlt3820"
              className="flex items-center gap-1 text-sm text-gray-400 hover:text-white md:text-base"
            >
              Github <ExternalLink width={16} height={16} />
            </a>
            <a
              href="#"
              className="flex items-center gap-1 text-sm text-gray-400 hover:text-white md:text-base"
            >
              Discord <ExternalLink width={16} height={16} />
            </a>
            <a
              href="#"
              className="flex items-center gap-1 text-sm text-gray-400 hover:text-white md:text-base"
            >
              Facebook <ExternalLink width={16} height={16} />
            </a>
            <a
              href="#"
              className="flex items-center gap-1 text-sm text-gray-400 hover:text-white md:text-base"
            >
              X <ExternalLink width={16} height={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
