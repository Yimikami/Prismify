// Links in the navbar

import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { GradientText } from '@/components/ui/gradient-text'
import { cn } from '@/utils/button-utils'
import { BadgeInfo, BookCopy, ChevronDown, type LucideIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const menuItems: Array<{
  href: string
  icon: LucideIcon
  label: string
  separateFromHere?: boolean
}> = [
  { href: '/articles', icon: BookCopy, label: 'Articles' },
  // , separateFromHere: true
  { href: '/about', icon: BadgeInfo, label: 'About' },
  // { href: '/contact', icon: Mails, label: 'Contact' },
]

export function NavLinks() {
  return (
    <nav className="flex items-center gap-8">
      {/* Can add hamburger or something here */}
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: 'noHoverGhost' }),
          ' inline-flex items-center gap-3 px-0'
        )}
      >
        <Image
          src="/images/image.webp"
          width={35}
          height={35}
          quality={80}
          alt="prismify logo"
          priority
        />
        <GradientText
          as="h1"
          className="mr-3 hidden text-lg font-semibold tracking-tight md:block"
        >
          Prismify
          <Badge className="ml-2">Beta</Badge>
        </GradientText>

        <div className="hidden h-5 w-[1.5px] bg-border md:block" />
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger className="group hidden items-center focus-visible:outline-none md:flex">
          <p className="text-sm font-medium text-dark/70 group-hover:text-dark/90">
            Resources
          </p>
          <ChevronDown
            size={16}
            className="ml-1 translate-y-0.5 text-dark/70 group-hover:text-dark/90"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          sideOffset={15}
          className="w-[180px] rounded-xl border border-border/70 bg-[#151515]/95 p-1.5 py-2 shadow-xl backdrop-blur-lg"
        >
          <DropdownMenuGroup>
            {menuItems.map((item, index) => (
              <React.Fragment key={item.label}>
                <DropdownMenuItem
                  asChild
                  className={`group cursor-pointer rounded-lg focus:bg-white ${
                    index !== menuItems.length - 1 ? 'mb-1' : ''
                  }`}
                  key={item.href + index}
                >
                  <Link
                    href={item.href}
                    className="flex w-full items-center focus:shadow-md"
                  >
                    <item.icon
                      size={18}
                      className="mr-3 h-4 w-4  text-dark/80 group-focus:text-black/90"
                    />
                    <span className="font-medium group-focus:text-black/90">
                      {item.label}
                    </span>
                  </Link>
                </DropdownMenuItem>
                {item.separateFromHere && (
                  <DropdownMenuSeparator
                    key={item.label}
                    className="mb-1 opacity-80"
                  />
                )}
              </React.Fragment>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <Link
        target="_blank"
        className="hidden md:flex"
        href="https://x.com/sls0n"
      >
        <p className="text-sm font-medium text-dark/70">Contact</p>
      </Link>
    </nav>
  )
}
