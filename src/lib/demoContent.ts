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
  tagline: "Tu sonrisa y tu piel, en las mejores manos",
  hero_subtitle:
    "Odontología y estética facial con tecnología de punta y atención personalizada, en un solo lugar.",
  hero_image_url: "https://images.unsplash.com/photo-1704455306251-b4634215d98f?auto=format&fit=crop&w=1600&q=80",
  about_title: "Sobre nosotros",
  about_text:
    "En Clínica Vitalis combinamos años de experiencia en odontología y estética con tecnología de vanguardia. Nuestro equipo está comprometido con tu bienestar, ofreciendo tratamientos seguros, personalizados y con resultados comprobables.",
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
    category: "dental",
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
    category: "dental",
    name: "Blanqueamiento dental",
    description: "Tratamiento profesional para una sonrisa hasta 8 tonos más blanca.",
    price: 2500,
    duration_minutes: 60,
    image_url: "https://images.unsplash.com/photo-1758205308179-4e00e0e4060b?auto=format&fit=crop&w=800&h=600&q=80",
    active: true,
    sort_order: 2,
    created_at: new Date().toISOString()
  },
  {
    id: "demo-s3",
    category: "dental",
    name: "Ortodoncia con brackets",
    description: "Corrección de la alineación dental con seguimiento mensual incluido.",
    price: 15000,
    duration_minutes: 40,
    image_url: "https://images.unsplash.com/photo-1770321119305-f191c09c5801?auto=format&fit=crop&w=800&h=600&q=80",
    active: true,
    sort_order: 3,
    created_at: new Date().toISOString()
  },
  {
    id: "demo-s4",
    category: "estetica",
    name: "Limpieza facial profunda",
    description: "Hidratación e higiene facial con extracción profesional de impurezas.",
    price: 1200,
    duration_minutes: 50,
    image_url: "https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&w=800&h=600&q=80",
    active: true,
    sort_order: 4,
    created_at: new Date().toISOString()
  },
  {
    id: "demo-s5",
    category: "estetica",
    name: "Aplicación de botox",
    description: "Tratamiento antiedad para suavizar líneas de expresión.",
    price: 4500,
    duration_minutes: 30,
    image_url: "https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&w=800&h=600&q=80",
    active: true,
    sort_order: 5,
    created_at: new Date().toISOString()
  },
  {
    id: "demo-s6",
    category: "estetica",
    name: "Ácido hialurónico",
    description: "Relleno facial para recuperar volumen y definición.",
    price: 5200,
    duration_minutes: 40,
    image_url: "https://images.unsplash.com/photo-1631050165423-3f29788b977b?auto=format&fit=crop&w=800&h=600&q=80",
    active: true,
    sort_order: 6,
    created_at: new Date().toISOString()
  }
];

export const DEMO_PRODUCTS: Product[] = [
  {
    id: "demo-p1",
    name: "Pasta dental especializada",
    description: "Fórmula con flúor de alta concentración para sensibilidad dental.",
    sku: "PD-001",
    category: "Cuidado dental",
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
    category: "Cuidado dental",
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
    name: "Sérum facial hidratante",
    description: "Ácido hialurónico de uso diario para el cuidado en casa.",
    sku: "SF-003",
    category: "Cuidado facial",
    price: 650,
    stock: 10,
    low_stock_threshold: 3,
    image_url: "https://images.unsplash.com/photo-1631050165423-3f29788b977b?auto=format&fit=crop&w=600&h=600&q=80",
    active: true,
    sort_order: 3,
    created_at: new Date().toISOString()
  },
  {
    id: "demo-p4",
    name: "Protector solar facial SPF50",
    description: "Uso diario, recomendado después de tratamientos estéticos.",
    sku: "PS-004",
    category: "Cuidado facial",
    price: 480,
    stock: 2,
    low_stock_threshold: 5,
    image_url: "https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&w=600&h=600&q=80",
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
    bio: "Especialista certificado en ortodoncia estética.",
    photo_url: "https://images.unsplash.com/photo-1758691463333-c79215e8bc3b?auto=format&fit=crop&w=500&h=500&q=80",
    active: true,
    sort_order: 2,
    created_at: new Date().toISOString()
  },
  {
    id: "demo-t3",
    name: "Lic. Sofía Ramos",
    role_title: "Especialista en Estética Facial",
    bio: "Certificada en tratamientos faciales no invasivos.",
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
    content: "El tratamiento facial dejó mi piel increíble, definitivamente voy a regresar.",
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
    image_url: "https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&w=800&h=800&q=80",
    caption: "Sala de estética",
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
