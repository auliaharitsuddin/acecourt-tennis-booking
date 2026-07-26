import Link from "next/link";
import { Trophy, Share2, MapPin, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-2 font-heading text-lg font-bold tracking-tight">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Trophy className="size-4" />
            </span>
            AceCourt
          </Link>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Platform booking lapangan tenis online tepercaya. Pesan lapangan, pilih
            jam favoritmu, dan bayar langsung tanpa antre.
          </p>
          <div className="mt-4 flex items-center gap-3 text-muted-foreground">
            <a href="#" aria-label="Bagikan AceCourt" className="flex size-9 items-center justify-center rounded-full border border-border hover:bg-muted hover:text-foreground transition-colors">
              <Share2 className="size-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold text-foreground">Navigasi</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li><Link href="/#lapangan" className="hover:text-foreground">Lapangan</Link></li>
            <li><Link href="/#cara-kerja" className="hover:text-foreground">Cara Kerja</Link></li>
            <li><Link href="/booking" className="hover:text-foreground">Booking Sekarang</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold text-foreground">Kontak</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              Jl. Ace Serve No. 15, Jakarta Selatan
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 shrink-0" />
              +62 21 1234 5678
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} AceCourt. Semua hak dilindungi.
      </div>
    </footer>
  );
}
