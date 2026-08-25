import { MapPinIcon, PhoneIcon, MailIcon, InstagramIcon, FacebookIcon } from "./Icons";

interface Props {
  clinicName: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  scheduleText: string;
  instagramUrl: string | null;
  facebookUrl: string | null;
}

const LINKS = [
  { href: "#servicios", label: "Servicios" },
  { href: "#productos", label: "Productos" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#equipo", label: "Equipo" },
  { href: "#contacto", label: "Contacto" }
];

export default function Footer({
  clinicName,
  tagline,
  address,
  phone,
  email,
  scheduleText,
  instagramUrl,
  facebookUrl
}: Props) {
  return (
    <footer className="bg-clinic-950 text-clinic-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-xl font-bold text-white">{clinicName}</p>
          {tagline && <p className="mt-3 text-sm text-clinic-300">{tagline}</p>}
          {(instagramUrl || facebookUrl) && (
            <div className="mt-5 flex gap-3">
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white transition hover:bg-white/10"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="h-4 w-4" />
                </a>
              )}
              {facebookUrl && (
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white transition hover:bg-white/10"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="h-4 w-4" />
                </a>
              )}
            </div>
          )}
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-clinic-400">Navegación</p>
          <ul className="mt-4 space-y-2 text-sm">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-clinic-200 hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="sm:col-span-2 lg:col-span-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-clinic-400">Contacto</p>
          <ul className="mt-4 space-y-3 text-sm text-clinic-200">
            {address && (
              <li className="flex items-start gap-2">
                <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-blush-400" />
                {address}
              </li>
            )}
            {phone && (
              <li className="flex items-center gap-2">
                <PhoneIcon className="h-4 w-4 shrink-0 text-blush-400" />
                {phone}
              </li>
            )}
            {email && (
              <li className="flex items-center gap-2">
                <MailIcon className="h-4 w-4 shrink-0 text-blush-400" />
                {email}
              </li>
            )}
            {scheduleText && <li className="text-clinic-300">{scheduleText}</li>}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-clinic-400">
        © {new Date().getFullYear()} {clinicName}. Todos los derechos reservados.
      </div>
    </footer>
  );
}
