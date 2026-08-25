import type { GalleryImage, Product, Service, SiteSettings, TeamMember, Testimonial } from "@/types/database.types";

/**
 * Contenido de muestra usado SOLO como respaldo visual cuando la base de
 * datos todavía no tiene filas (antes de conectar Supabase, o justo después
 * de correr schema.sql sin seed.sql). En cuanto haya datos reales, estos
 * dejan de mostrarse automáticamente. Coincide con supabase/seed.sql.
 */

export const DEMO_SETTINGS: SiteSettings = {
  id: 1,
  clinic_name: "Clínica Vitalis",
  tagline: "Tu sonrisa, en las mejores manos",
  hero_subtitle:
    "Odontología integral —estética dental, ortodoncia y rehabilitación oral— con tecnología de punta y atención personalizada.",
  hero_image_url: "https://images.unsplash.com/photo-1704455306251-b4634215d98f?auto=format&fit=crop&w=1600&q=80",
  about_title: "Sobre nosotros",
  about_text:
    "En Clínica Vitalis nos dedicamos exclusivamente a la odontología: desde la prevención y la estética dental hasta la ortodoncia y la rehabilitación oral compleja. Nuestro equipo está comprometido con tu bienestar, ofreciendo tratamientos seguros, personalizados y con resultados comprobables.",
  phone: "55 1234 5678",
  whatsapp_number: "525512345678",
  email: "contacto@clinicavitalis.com",
  address: "Av. Reforma 123, Col. Centro, Ciudad de México",
  schedule_text: "Lunes a viernes 9:00–19:00, Sábados 9:00–14:00",
  instagram_url: "https://instagram.com",
  facebook_url: "https://facebook.com",
  map_embed_url: null,
  primary_color: "#279e95",
  updated_at: new Date().toISOString()
};

export const DEMO_SERVICES: Service[] = [
  {
    id: "demo-s1",
    category: "Odontología general",
    name: "Limpieza dental profunda",
    description: "Eliminación de placa y sarro con tecnología ultrasónica para una boca más sana.",
    price: 900,
    duration_minutes: 45,
    image_url: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=800&h=600&q=80",
    active: true,
    sort_order: 1,
    created_at: new Date().toISOString()
  },
  {
    id: "demo-s2",
    category: "Odontología general",
    name: "Resina y obturación",
    description: "Tratamiento de caries con materiales estéticos del color natural del diente.",
    price: 750,
    duration_minutes: 40,
    image_url: "https://images.unsplash.com/photo-1758205308179-4e00e0e4060b?auto=format&fit=crop&w=800&h=600&q=80",
    active: true,
    sort_order: 2,
    created_at: new Date().toISOString()
  },
  {
    id: "demo-s3",
    category: "Estética dental",
    name: "Blanqueamiento dental",
    description: "Tratamiento profesional para una sonrisa hasta 8 tonos más blanca.",
    price: 2500,
    duration_minutes: 60,
    image_url: "https://images.unsplash.com/photo-1677026010083-78ec7f1b84ed?auto=format&fit=crop&w=800&h=600&q=80",
    active: true,
    sort_order: 3,
    created_at: new Date().toISOString()
  },
  {
    id: "demo-s4",
    category: "Estética dental",
    name: "Carillas dentales",
    description: "Diseño de sonrisa con carillas de porcelana o resina de alta duración.",
    price: 4800,
    duration_minutes: 90,
    image_url: "https://images.unsplash.com/photo-1489278353717-f64c6ee8a4d2?auto=format&fit=crop&w=800&h=600&q=80",
    active: true,
    sort_order: 4,
    created_at: new Date().toISOString()
  },
  {
    id: "demo-s5",
    category: "Ortodoncia",
    name: "Ortodoncia con brackets",
    description: "Corrección de la alineación dental con seguimiento mensual incluido.",
    price: 15000,
    duration_minutes: 40,
    image_url: "https://images.unsplash.com/photo-1770321119305-f191c09c5801?auto=format&fit=crop&w=800&h=600&q=80",
    active: true,
    sort_order: 5,
    created_at: new Date().toISOString()
  },
  {
    id: "demo-s6",
    category: "Ortodoncia",
    name: "Alineadores invisibles",
    description: "Alternativa estética y removible a los brackets tradicionales.",
    price: 22000,
    duration_minutes: 45,
    image_url: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=800&h=600&q=80",
    active: true,
    sort_order: 6,
    created_at: new Date().toISOString()
  },
  {
    id: "demo-s7",
    category: "Rehabilitación oral",
    name: "Implante dental",
    description: "Reemplazo fijo de piezas dentales perdidas con implante de titanio.",
    price: 18500,
    duration_minutes: 90,
    image_url: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&h=600&q=80",
    active: true,
    sort_order: 7,
    created_at: new Date().toISOString()
  },
  {
    id: "demo-s8",
    category: "Rehabilitación oral",
    name: "Prótesis dental",
    description: "Rehabilitación funcional y estética con prótesis fija o removible.",
    price: 9500,
    duration_minutes: 60,
    image_url: "https://images.unsplash.com/photo-1530213709681-b7e537c923cc?auto=format&fit=crop&w=800&h=600&q=80",
    active: true,
    sort_order: 8,
    created_at: new Date().toISOString()
  }
];

export const DEMO_PRODUCTS: Product[] = [
  {
    id: "demo-p1",
    name: "Pasta dental especializada",
    description: "Fórmula con flúor de alta concentración para sensibilidad dental.",
    sku: "PD-001",
    category: "Higiene dental",
    price: 180,
    stock: 24,
    low_stock_threshold: 5,
    image_url: "https://images.unsplash.com/photo-1530213709681-b7e537c923cc?auto=format&fit=crop&w=600&h=600&q=80",
    active: true,
    sort_order: 1,
    created_at: new Date().toISOString()
  },
  {
    id: "demo-p2",
    name: "Enjuague bucal profesional",
    description: "Enjuague antibacterial recomendado post-tratamiento.",
    sku: "EB-002",
    category: "Higiene dental",
    price: 220,
    stock: 18,
    low_stock_threshold: 5,
    image_url: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=600&h=600&q=80",
    active: true,
    sort_order: 2,
    created_at: new Date().toISOString()
  },
  {
    id: "demo-p3",
    name: "Cepillo eléctrico recargable",
    description: "Recomendado para pacientes con ortodoncia y encías sensibles.",
    sku: "CE-003",
    category: "Higiene dental",
    price: 890,
    stock: 8,
    low_stock_threshold: 3,
    image_url: "https://images.unsplash.com/photo-1758205308179-4e00e0e4060b?auto=format&fit=crop&w=600&h=600&q=80",
    active: true,
    sort_order: 3,
    created_at: new Date().toISOString()
  },
  {
    id: "demo-p4",
    name: "Kit de limpieza para ortodoncia",
    description: "Cepillos interdentales y cera para brackets, uso diario.",
    sku: "KO-004",
    category: "Ortodoncia",
    price: 260,
    stock: 2,
    low_stock_threshold: 5,
    image_url: "https://images.unsplash.com/photo-1770321119305-f191c09c5801?auto=format&fit=crop&w=600&h=600&q=80",
    active: true,
    sort_order: 4,
    created_at: new Date().toISOString()
  }
];

export const DEMO_TEAM: TeamMember[] = [
  {
    id: "demo-t1",
    name: "Dra. Ana Martínez",
    role_title: "Odontóloga General",
    bio: "Más de 10 años de experiencia en salud dental integral.",
    photo_url: "https://images.unsplash.com/photo-1569925444984-9e2e5fc3d1fb?auto=format&fit=crop&w=500&h=500&q=80",
    active: true,
    sort_order: 1,
    created_at: new Date().toISOString()
  },
  {
    id: "demo-t2",
    name: "Dr. Luis Herrera",
    role_title: "Ortodoncista",
    bio: "Especialista certificado en ortodoncia y alineadores invisibles.",
    photo_url: "https://images.unsplash.com/photo-1758691463333-c79215e8bc3b?auto=format&fit=crop&w=500&h=500&q=80",
    active: true,
    sort_order: 2,
    created_at: new Date().toISOString()
  },
  {
    id: "demo-t3",
    name: "Lic. Sofía Ramos",
    role_title: "Especialista en Rehabilitación Oral",
    bio: "Certificada en implantología y prótesis dental.",
    photo_url: "https://images.unsplash.com/photo-1758518727888-ffa196002e59?auto=format&fit=crop&w=500&h=500&q=80",
    active: true,
    sort_order: 3,
    created_at: new Date().toISOString()
  }
];

export const DEMO_TESTIMONIALS: Testimonial[] = [
  {
    id: "demo-r1",
    author_name: "Mariana G.",
    content: "Excelente atención, el equipo es muy profesional y las instalaciones impecables.",
    rating: 5,
    active: true,
    sort_order: 1,
    created_at: new Date().toISOString()
  },
  {
    id: "demo-r2",
    author_name: "Roberto S.",
    content: "Mi tratamiento de ortodoncia superó mis expectativas. Muy recomendado.",
    rating: 5,
    active: true,
    sort_order: 2,
    created_at: new Date().toISOString()
  },
  {
    id: "demo-r3",
    author_name: "Claudia P.",
    content: "El implante quedó perfecto y la recuperación fue mucho más rápida de lo que esperaba.",
    rating: 4,
    active: true,
    sort_order: 3,
    created_at: new Date().toISOString()
  }
];

export const DEMO_GALLERY: GalleryImage[] = [
  {
    id: "demo-g1",
    image_url: "https://images.unsplash.com/photo-1746173098661-45ae0ccb6030?auto=format&fit=crop&w=800&h=800&q=80",
    caption: "Recepción",
    sort_order: 1,
    created_at: new Date().toISOString()
  },
  {
    id: "demo-g2",
    image_url: "https://images.unsplash.com/photo-1770321119305-f191c09c5801?auto=format&fit=crop&w=800&h=800&q=80",
    caption: "Consultorio",
    sort_order: 2,
    created_at: new Date().toISOString()
  },
  {
    id: "demo-g3",
    image_url: "https://images.unsplash.com/photo-1677026010083-78ec7f1b84ed?auto=format&fit=crop&w=800&h=800&q=80",
    caption: "Sala de estética dental",
    sort_order: 3,
    created_at: new Date().toISOString()
  },
  {
    id: "demo-g4",
    image_url: "https://images.unsplash.com/photo-1758205308179-4e00e0e4060b?auto=format&fit=crop&w=800&h=800&q=80",
    caption: "Equipo dental",
    sort_order: 4,
    created_at: new Date().toISOString()
  },
  {
    id: "demo-g5",
    image_url: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=800&h=800&q=80",
    caption: "Detalle de tratamiento",
    sort_order: 5,
    created_at: new Date().toISOString()
  },
  {
    id: "demo-g6",
    image_url: "https://images.unsplash.com/photo-1704455306251-b4634215d98f?auto=format&fit=crop&w=800&h=800&q=80",
    caption: "Instalaciones",
    sort_order: 6,
    created_at: new Date().toISOString()
  }
];
