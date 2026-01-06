'use client'

import { buttonVariants } from '@/components/ui/button'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuContent,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import { MobileNav } from '@/components/ui/mobile-nav'
import Link from 'next/link'
import type { AppData } from "@/lib/api"
import { ShoppingBag, FileText } from 'lucide-react'

interface NewNavbarProps {
  data: AppData
}

export default function NewNavbar({ data }: NewNavbarProps) {
    // Transform data.menu into the format needed for mobile nav
    const mobileNavData = data?.menu
        .filter(item => item.items && item.items.length > 0)
        .map(item => ({
            name: item.name,
            items: item.items!.map(subItem => ({
                label: subItem.name,
                href: subItem.href
            }))
        })) || []

    // Get category icon for dropdown items
    const getCategoryIcon = (categoryName: string) => {
        const category = data?.categories.find(cat =>
            cat.name.toLowerCase().includes(categoryName.toLowerCase()) ||
            categoryName.toLowerCase().includes(cat.name.toLowerCase())
        );
        return category?.icon || null;
    };

    // Transform data.menu for desktop navigation
    const desktopNavData = data?.menu.map(item => {
        if (item.items && item.items.length > 0) {
            return {
                label: item.name,
                gridCols: 1,
                categories: [
                    {
                        name: item.name,
                        id: item.name.toLowerCase().replace(/\s+/g, '-'),
                        items: item.items.map(subItem => ({
                            title: subItem.name,
                            href: subItem.href,
                            description: '',
                            icon: getCategoryIcon(subItem.name)
                        }))
                    }
                ]
            }
        } else if (item.href) {
            return {
                href: item.href,
                label: item.name,
                active: false
            }
        }
        return null
    }).filter(Boolean) || []

    return (
        <header className="sticky top-0 z-50 bg-[hsl(220,30%,12%)] border-b border-white/10">
            <div className="container mx-auto flex h-20 items-center justify-between gap-4 px-4">
                <div className="flex items-center justify-start gap-2">
                    <MobileNav nav={mobileNavData} />

                    <Link
                        href="/"
                        className={cn(
                            "flex items-center"
                        )}
                    >
                        <img
                            src="/logoimage.png"
                            alt="Draftlo Logo"
                            className="h-14 w-auto object-contain"
                        />
                    </Link>
                </div>

                <NavigationMenu className="max-md:hidden">
                    <NavigationMenuList>
                        {desktopNavData.map((link, index) => {
                            if (link && link.categories && link.categories?.length > 0) {
                                return (
                                    <NavigationMenuItem key={index}>
                                        <NavigationMenuTrigger className="h-auto rounded-md px-3 py-1.5 font-semibold text-white bg-transparent hover:bg-white/10 data-[state=open]:bg-white/10">
                                            {link.label}
                                        </NavigationMenuTrigger>
                                        <NavigationMenuContent
                                            className={cn(
                                                'z-50 p-4 bg-[hsl(220,30%,15%)] border-white/10 rounded-xl shadow-2xl',
                                                'lg:w-[700px] max-h-[80vh] overflow-y-auto'
                                            )}
                                        >
                                            {link.categories.map((category) => (
                                                <div
                                                    key={category.id}
                                                    className="mb-3"
                                                >
                                                    <ul className="grid grid-cols-2 gap-3">
                                                        {category.items.map(
                                                            (item) => (
                                                                <ListItem
                                                                    key={item.title}
                                                                    title={item.title}
                                                                    href={item.href}
                                                                    icon={item.icon}
                                                                >
                                                                    {item.description}
                                                                </ListItem>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                            ))}
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                )
                            }

                            return (
                                <NavigationMenuItem key={index}>
                                    <NavigationMenuLink
                                        href={link!.href!}
                                        asChild
                                        data-active={link!.active}
                                        className="rounded-md px-3 py-1.5 font-semibold text-white hover:bg-white/10 transition-colors"
                                    >
                                        <Link href={link!.href!}>{link!.label}</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            )
                        })}
                    </NavigationMenuList>
                </NavigationMenu>

                <div className="flex flex-1 items-center justify-end gap-2">
                    <button className="p-2 text-white hover:bg-white/10 rounded-md transition-colors">
                        <ShoppingBag className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </header>
    )
}

function ListItem({
    title,
    children,
    href,
    icon,
    ...props
}: React.ComponentPropsWithoutRef<'li'> & { href: string; icon?: string | null }) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link
                    href={href}
                    className="flex items-start gap-3 select-none rounded-lg p-3 leading-none no-underline outline-none transition-all hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white group"
                >
                    {/* Icon */}
                    <div className="flex-shrink-0 w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                        {icon ? (
                            <img
                                src={icon}
                                alt=""
                                className="w-6 h-6 brightness-0 invert"
                            />
                        ) : (
                            <FileText className="w-6 h-6 text-white" />
                        )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-1">
                        <div className="text-sm leading-tight font-medium text-white">
                            {title}
                        </div>
                        {children && (
                            <p className="text-white/60 line-clamp-2 text-xs leading-snug">
                                {children}
                            </p>
                        )}
                    </div>
                </Link>
            </NavigationMenuLink>
        </li>
    )
}
