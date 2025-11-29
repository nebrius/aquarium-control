'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type ComponentProps } from 'react';

import { cn } from '@/lib/utils.ts';

export function NavTabs({ className, ...props }: ComponentProps<'nav'>) {
  return (
    <nav
      data-slot="nav-tabs"
      className={cn(
        'bg-muted text-muted-foreground inline-flex w-fit items-center justify-center rounded-lg p-2',
        className
      )}
      {...props}
    />
  );
}

type NavTabLinkProps = ComponentProps<typeof Link> & {
  activeOnExactMatch?: boolean;
};

export function NavTabLink({
  className,
  href,
  activeOnExactMatch = true,
  ...props
}: NavTabLinkProps) {
  const pathname = usePathname();
  const hrefString = typeof href === 'string' ? href : (href.pathname ?? '');
  const isActive = activeOnExactMatch
    ? pathname === hrefString
    : pathname.startsWith(hrefString);

  return (
    <Link
      data-slot="nav-tab-link"
      data-state={isActive ? 'active' : 'inactive'}
      href={href}
      className={cn(
        'data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 data-[state=active]:shadow-sm',
        className
      )}
      {...props}
    />
  );
}
