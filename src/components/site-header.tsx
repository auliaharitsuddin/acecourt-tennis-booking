"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LangToggle } from "@/components/lang-toggle";
import { useLanguage } from "@/lib/language";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const NAV_LINKS = [
    { href: "/#lapangan", label: t.header.nav.courts },
    { href: "/#cara-kerja", label: t.header.nav.howItWorks },
    { href: "/#kenapa-kami", label: t.header.nav.whyUs },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border/80 bg-background/85 backdrop-blur-lg shadow-sm"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-heading text-lg font-bold tracking-tight">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Trophy className="size-4" />
          </span>
          AceCourt
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LangToggle className="mr-1" />
          <Button
            variant="ghost"
            render={<Link href="tel:+622112345678" />}
            nativeButton={false}
          >
            {t.header.contact}
          </Button>
          <Button
            className="cursor-pointer"
            render={<Link href="/booking" />}
            nativeButton={false}
          >
            {t.header.bookNow}
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LangToggle />
          <button
            type="button"
            aria-label={mobileOpen ? t.header.closeMenu : t.header.openMenu}
            onClick={() => setMobileOpen((v) => !v)}
            className="flex size-10 items-center justify-center rounded-lg text-foreground cursor-pointer"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-border bg-background md:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-muted"
                >
                  {link.label}
                </Link>
              ))}
              <Button
                className="mt-2 w-full cursor-pointer"
                render={<Link href="/booking" onClick={() => setMobileOpen(false)} />}
                nativeButton={false}
              >
                {t.header.bookNow}
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
