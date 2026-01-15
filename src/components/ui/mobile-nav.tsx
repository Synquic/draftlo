'use client'

import React from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'
import * as Accordion from '@radix-ui/react-accordion'

type MobileNavProps = {
  nav: {
    name: string
    items: {
      label: string
      href: string
    }[]
  }[]
}

export function MobileNav({ nav }: MobileNavProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      {/* HAMBURGER */}
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden hover:bg-transparent focus-visible:ring-0"
        >
          <Menu className="h-6 w-6 text-white" />
          <span className="sr-only">Open Menu</span>
        </Button>
      </PopoverTrigger>

      {/* FULLSCREEN DRAWER */}
      <PopoverContent
        align="start"
        side="bottom"
        sideOffset={0}
        className="
          fixed inset-0 z-50
          h-screen w-screen
          bg-[hsl(220,30%,12%)]/95
          border-none rounded-none
          p-0
          overflow-y-auto
          overscroll-contain
          backdrop-blur
        "
      >
        {/* HEADER */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[hsl(220,30%,12%)]/95">
          {/* Removed "Menu" title */}
          <span></span>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(false)}
            className="hover:bg-white/10"
          >
            <X className="h-6 w-6 text-white" />
          </Button>
        </div>

        {/* ACCORDION CONTENT */}
        <div className="px-6 py-6 pb-24">
          <Accordion.Root
            type="multiple"
            className="flex flex-col gap-4"
          >
            {/* Add Home link without hamburger */}
            <div className="border-b border-white/10 pb-4">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="
                  block py-3 text-left
                  text-white text-lg font-medium
                  hover:text-blue-400
                  transition-colors
                "
              >
                Home
              </Link>
            </div>

            {/* Filter out the "Home" category from the nav array */}
            {nav
              .filter(category => category.name !== "Home")
              .map((category, index) => (
                <Accordion.Item
                  key={index}
                  value={category.name}
                  className="border-b border-white/10 pb-2"
                >
                  {/* CATEGORY */}
                  <Accordion.Header>
                    <Accordion.Trigger
                      className="
                        flex w-full items-center justify-between
                        py-3 text-left
                        text-white text-lg font-medium
                      "
                    >
                      {category.name}
                      <ChevronDown className="h-5 w-5 transition-transform data-[state=open]:rotate-180" />
                    </Accordion.Trigger>
                  </Accordion.Header>

                  {/* SUB TYPES */}
                  <Accordion.Content
                    className="
                      overflow-hidden
                      data-[state=open]:animate-accordion-down
                      data-[state=closed]:animate-accordion-up
                    "
                  >
                    <div className="mt-2 flex flex-col gap-3 pl-3">
                      {category.items.map((item, idx) => (
                        <Link
                          key={idx}
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="
                            text-base text-white/90
                            hover:text-blue-400
                            transition-colors
                          "
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
          </Accordion.Root>
        </div>
      </PopoverContent>
    </Popover>
  )
}