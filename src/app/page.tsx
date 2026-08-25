import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { formatPrice, whatsappLink } from "@/lib/utils";
import Navbar from "@/components/public/Navbar";
import WhatsAppButton from "@/components/public/WhatsAppButton";
import ContactForm from "@/components/public/ContactForm";
import Footer from "@/components/public/Footer";
import { ToothIcon, SparkleIcon, ShieldIcon, ClockIcon, HeartHandIcon } from "@/components/public/Icons";
import {
  DEMO_SETTINGS,
  DEMO_SERVICES,
  DEMO_PRODUCTS,
  DEMO_TEAM,
  DEMO_TESTIMONIALS,
  DEMO_GALLERY
} from "@/lib/demoContent";

export const revalidate = 0;

export default async function Home() {
  const supabase = await createClient();

  const [
    { data: settingsRow },
    { data: servicesRows },
    { data: productsRows },
    { data: teamRows },
    { data: testimonialsRows },
    { data: galleryRows }
  ] = await Promise.all([
    supabase.from("site_settings").select("*").eq("id", 1).single(),
    supabase.from("services").select("*").eq("active", true).order("sort_order"),
    supabase.from("products").select("*").eq("active", true).order("sort_order"),
    supabase.from("team_members").select("*").eq("active", true).order("sort_order"),
    supabase.from("testimonials").select("*").eq("active", true).order("sort_order"),
    supabase.from("gallery_images").select("*").order("sort_order")
  ]);

  // Mientras la base de datos no tenga contenido propio (antes de conectar
  // Supabase, o justo después de correr schema.sql sin cargar datos), el
  // sitio muestra contenido de ejemplo para que nunca se vea vacío. En
  // cuanto haya datos reales, estos se usan automáticamente en su lugar.
  const isDemo = !settingsRow && (!servicesRows || servicesRows.length === 0);
  const s = settingsRow ?? DEMO_SETTINGS;
  const services = servicesRows && servicesRows.length > 0 ? servicesRows : DEMO_SERVICES;
  const products = productsRows && productsRows.length > 0 ? productsRows : DEMO_PRODUCTS;
  const team = teamRows && teamRows.length > 0 ? teamRows : DEMO_TEAM;
  const testimonials = testimonialsRows && testimonialsRows.length > 0 ? testimonialsRows : DEMO_TESTIMONIALS;
  const gallery = galleryRows && galleryRows.length > 0 ? galleryRows : DEMO_GALLERY;

  const dentalServices = services.filter((sv) => sv.category === "dental");
  const estServices = services.filter((sv) => sv.category === "estetica");
  const avgRating =
    testimonials && testimonials.length > 0
      ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)
      : null;

  const features = [
    { icon: ShieldIcon, title: "Tecnología certificada", desc: "Equipos y protocolos de higiene de primer nivel." },
    { icon: HeartHandIcon, title: "Atención personalizada", desc: "Planes de tratamiento pensados para ti." },
    { icon: ClockIcon, title: "Citas puntuales", desc: "Respetamos tu tiempo, sin esperas innecesarias." },
    { icon: SparkleIcon, title: "Resultados visibles", desc: "Tratamientos con seguimiento y garantía de calidad." }
  ];

  return (
    <main className="bg-white">
      {isDemo && (
        <div className="bg-amber-400 px-5 py-2 text-center text-xs font-medium text-amber-950">
          Estás viendo contenido de ejemplo. Conecta Supabase y entra a{" "}
          <a href="/admin" className="underline underline-offset-2">
            /admin
          </a>{" "}
          para cargar tu información real.
        </div>
      )}
      <Navbar clinicName={s.clinic_name} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-clinic-50 via-white to-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-blush-400/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 top-40 h-72 w-72 rounded-full bg-clinic-300/20 blur-3xl"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:py-24">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="badge">
                <ShieldIcon className="h-3.5 w-3.5 text-clinic-500" /> Clínica certificada
              </span>
              {avgRating && (
                <span className="badge">
                  <span className="text-blush-500">★</span> {avgRating} de pacientes
                </span>
              )}
            </div>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-clinic-900 md:text-5xl">
              {s.tagline}
            </h1>
            {s.hero_subtitle && <p className="mt-4 max-w-lg text-lg text-slate-600">{s.hero_subtitle}</p>}
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contacto" className="btn-primary">
                Agendar cita
              </a>
              {s.whatsapp_number && (
                <a
                  href={whatsappLink(s.whatsapp_number, `Hola ${s.clinic_name}, quisiera más información.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  Escribir por WhatsApp
                </a>
              )}
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] bg-clinic-100 shadow-2xl shadow-clinic-900/10 ring-1 ring-black/5">
            {s.hero_image_url ? (
              <Image src={s.hero_image_url} alt={s.clinic_name} fill className="object-cover" priority />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-clinic-300">
                <SparkleIcon className="h-16 w-16" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FEATURES / POR QUÉ ELEGIRNOS */}
      <section className="border-y border-slate-100 bg-slate-50/60 py-14">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-clinic-600 text-white">
                <f.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-clinic-900">{f.title}</p>
                <p className="mt-1 text-sm text-slate-500">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="mx-auto max-w-6xl px-5 py-20">
        <SectionHeading eyebrow="Servicios" title="Tratamientos dentales y estéticos" />

        {dentalServices.length > 0 && (
          <div className="mt-12">
            <div className="mb-5 flex items-center gap-2">
              <ToothIcon className="h-6 w-6 text-clinic-600" />
              <h3 className="font-display text-2xl font-semibold text-clinic-800">Odontología</h3>
            </div>
            <ServiceGrid items={dentalServices} />
          </div>
        )}
        {estServices.length > 0 && (
          <div className="mt-14">
            <div className="mb-5 flex items-center gap-2">
              <SparkleIcon className="h-6 w-6 text-blush-500" />
              <h3 className="font-display text-2xl font-semibold text-clinic-800">Estética</h3>
            </div>
            <ServiceGrid items={estServices} />
          </div>
        )}
        {services.length === 0 && (
          <p className="mt-6 text-slate-500">Próximamente publicaremos nuestros tratamientos.</p>
        )}
      </section>

      {/* PRODUCTOS */}
      {products.length > 0 && (
        <section id="productos" className="bg-slate-50 py-20">
          <div className="mx-auto max-w-6xl px-5">
            <SectionHeading eyebrow="Tienda" title="Productos recomendados" />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((p) => (
                <div key={p.id} className="card flex flex-col">
                  <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-xl bg-clinic-100">
                    {p.image_url ? (
                      <Image src={p.image_url} alt={p.name} fill className="object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-clinic-300">
                        <SparkleIcon className="h-10 w-10" />
                      </div>
                    )}
                    {p.stock === 0 && (
                      <span className="absolute right-2 top-2 rounded-full bg-slate-900/80 px-2 py-0.5 text-xs font-medium text-white">
                        Agotado
                      </span>
                    )}
                  </div>
                  {p.category && <p className="text-xs font-semibold uppercase tracking-wide text-clinic-500">{p.category}</p>}
                  <h4 className="mt-1 font-display text-lg font-semibold text-clinic-900">{p.name}</h4>
                  {p.description && <p className="mt-2 flex-1 text-sm text-slate-500">{p.description}</p>}
                  <p className="mt-4 text-sm font-semibold text-clinic-600">{formatPrice(p.price)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SOBRE NOSOTROS */}
      {s.about_text && (
        <section id="nosotros" className="bg-clinic-950 py-20 text-white">
          <div className="mx-auto max-w-3xl px-5 text-center">
            <SectionHeading eyebrow="Nosotros" title={s.about_title} dark />
            <p className="mt-6 whitespace-pre-line text-lg text-clinic-100">{s.about_text}</p>
          </div>
        </section>
      )}

      {/* EQUIPO */}
      {team.length > 0 && (
        <section id="equipo" className="mx-auto max-w-6xl px-5 py-20">
          <SectionHeading eyebrow="Equipo" title="Especialistas que te van a atender" />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {team.map((member) => (
              <div key={member.id} className="text-center">
                <div className="relative mx-auto aspect-square w-40 overflow-hidden rounded-full bg-clinic-100 shadow-lg ring-4 ring-white">
                  {member.photo_url && (
                    <Image src={member.photo_url} alt={member.name} fill className="object-cover" />
                  )}
                </div>
                <h4 className="mt-4 font-display text-lg font-semibold text-clinic-900">{member.name}</h4>
                <p className="text-sm font-medium text-clinic-600">{member.role_title}</p>
                {member.bio && <p className="mt-2 text-sm text-slate-500">{member.bio}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* GALERIA */}
      {gallery.length > 0 && (
        <section id="galeria" className="bg-slate-50 py-20">
          <div className="mx-auto max-w-6xl px-5">
            <SectionHeading eyebrow="Galería" title="Nuestras instalaciones y resultados" />
            <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
              {gallery.map((img) => (
                <div
                  key={img.id}
                  className="relative aspect-square overflow-hidden rounded-xl bg-clinic-100 shadow-sm transition hover:shadow-lg"
                >
                  <Image src={img.image_url} alt={img.caption} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TESTIMONIOS */}
      {testimonials.length > 0 && (
        <section id="testimonios" className="mx-auto max-w-6xl px-5 py-20">
          <SectionHeading eyebrow="Testimonios" title="Lo que dicen nuestros pacientes" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.id} className="card">
                <div className="text-blush-500">{"★".repeat(t.rating)}</div>
                <p className="mt-3 text-sm text-slate-600">&ldquo;{t.content}&rdquo;</p>
                <p className="mt-4 text-sm font-semibold text-clinic-800">{t.author_name}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CONTACTO */}
      <section id="contacto" className="bg-clinic-50 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Contacto" title="Agenda tu cita" />
            <div className="mt-6 space-y-3 text-sm text-slate-600">
              {s.address && <p>📍 {s.address}</p>}
              {s.phone && <p>📞 {s.phone}</p>}
              {s.email && <p>✉️ {s.email}</p>}
              {s.schedule_text && <p>🕐 {s.schedule_text}</p>}
            </div>
            {s.map_embed_url && (
              <div className="mt-6 aspect-video w-full overflow-hidden rounded-2xl shadow-md">
                <iframe src={s.map_embed_url} className="h-full w-full border-0" loading="lazy" />
              </div>
            )}
          </div>
          <ContactForm services={services} />
        </div>
      </section>

      <Footer
        clinicName={s.clinic_name}
        tagline={s.tagline}
        address={s.address}
        phone={s.phone}
        email={s.email}
        scheduleText={s.schedule_text}
        instagramUrl={s.instagram_url}
        facebookUrl={s.facebook_url}
      />

      <WhatsAppButton number={s.whatsapp_number} clinicName={s.clinic_name} />
    </main>
  );
}

function SectionHeading({ eyebrow, title, dark }: { eyebrow: string; title: string; dark?: boolean }) {
  return (
    <div className="text-center md:text-left">
      <p className={`text-sm font-semibold uppercase tracking-wide ${dark ? "text-blush-400" : "text-clinic-500"}`}>
        {eyebrow}
      </p>
      <h2 className={`mt-1 font-display text-3xl font-bold ${dark ? "text-white" : "text-clinic-900"}`}>{title}</h2>
    </div>
  );
}

function ServiceGrid({
  items
}: {
  items: {
    id: string;
    name: string;
    description: string;
    price: number | null;
    image_url: string | null;
  }[];
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((service) => (
        <div key={service.id} className="card flex flex-col">
          {service.image_url && (
            <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-xl bg-clinic-100">
              <Image src={service.image_url} alt={service.name} fill className="object-cover" />
            </div>
          )}
          <h4 className="font-display text-lg font-semibold text-clinic-900">{service.name}</h4>
          {service.description && <p className="mt-2 flex-1 text-sm text-slate-500">{service.description}</p>}
          <p className="mt-4 text-sm font-semibold text-clinic-600">{formatPrice(service.price)}</p>
        </div>
      ))}
    </div>
  );
}
