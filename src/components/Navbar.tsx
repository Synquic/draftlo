'use client'

import Link from 'next/link'
import type { AppData } from '@/lib/api'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu'

import { MobileNav } from '@/components/ui/mobile-nav'
import { FileText } from 'lucide-react'

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

interface NewNavbarProps {
  data: AppData
}

/* -------------------------------------------------------------------------- */
/*                                   NAVBAR                                   */
/* -------------------------------------------------------------------------- */

export default function Navbar({ data }: NewNavbarProps) {
  const getCategoryIcon = (categoryName: string) => {
    const category = data?.categories.find(
      (cat) =>
        cat.name.toLowerCase().includes(categoryName.toLowerCase()) ||
        categoryName.toLowerCase().includes(cat.name.toLowerCase())
    )
    return category?.icon || null
  }

  const desktopNavData =
    data?.menu
      .map((item) => {
        if (item.items && item.items.length > 0) {
          return {
            label: item.name,
            categories: [
              {
                id: item.name.toLowerCase().replace(/\s+/g, '-'),
                items: item.items.map((sub) => ({
                  title: sub.name,
                  href: sub.href!,
                  icon: getCategoryIcon(sub.name),
                })),
              },
            ],
          }
        }

        if (item.href) {
          return {
            label: item.name,
            href: item.href,
          }
        }

        return null
      })
      .filter(Boolean) || []

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[hsl(220,30%,12%)]">
      <div className="container mx-auto flex h-20 items-center justify-start px-4">
        {/* LEFT */}
        <div className="flex items-center gap-2">
          {/* MOBILE NAV */}
          <MobileNav
            nav={data.menu.map((item) => ({
              name: item.name,
              items: (item.items || []).map((sub) => ({
                label: sub.name,
                href: sub.href || '',
              })),
            }))}
          />

          {/* LOGO */}
          <Link href="/" className="flex items-center">
            <img
              src="/logoimage.png"
              alt="Draftlo"
              className="h-14 w-auto object-contain"
            />
          </Link>
        </div>

        {/* DESKTOP NAV */}
        <NavigationMenu className="ml-10 max-md:hidden">
          <NavigationMenuList>
          <div className="absolute left-0 top-full flex w-full justify-center">
            <NavigationMenuViewport
              className="
                relative
                mt-3
                w-full
                max-w-[900px]
                rounded-xl
                border border-white/10
                bg-[hsl(220,30%,15%)]
                shadow-2xl
              "
            />
          </div>
            {desktopNavData.map((link: any, index: number) => {
              if (link.categories) {
                return (
                  <NavigationMenuItem key={index} className="relative">
                    <NavigationMenuTrigger className="rounded-md bg-transparent px-3 py-1.5 font-semibold text-white hover:bg-white/10 data-[state=open]:bg-white/10">
                      {link.label}
                    </NavigationMenuTrigger>

                    <NavigationMenuContent
                        className="
                          z-40
                          mt-3
                          rounded-xl
                          border border-white/10
                          bg-[hsl(220,30%,15%)]
                          p-4
                          shadow-2xl
                          lg:w-[700px]
                        "
                      >
                      {link.categories.map((category: any) => (
                        <ul key={category.id} className="grid grid-cols-2 gap-3">
                          {category.items.map((item: any) => (
                            <li key={item.title}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={item.href}
                                  className="group flex items-center gap-3 rounded-lg p-3 hover:bg-white/10"
                                >
                                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800 group-hover:bg-blue-600">
                                    {item.icon ? (
                                      <img
                                        src={item.icon}
                                        className="h-6 w-6 brightness-0 invert"
                                        alt=""
                                      />
                                    ) : (
                                      <FileText className="h-6 w-6 text-white" />
                                    )}
                                  </div>

                                  <span className="text-sm font-medium text-white">
                                    {item.title}
                                  </span>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      ))}
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                )
              }

              return (
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={link.href}
                      className="rounded-md px-3 py-1.5 font-semibold text-white hover:bg-white/10"
                    >
                      {link.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )
            })}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  )
}