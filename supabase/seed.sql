-- =========================================================
-- Datos de ejemplo (opcional)
-- Corre esto DESPUÉS de schema.sql para que el sitio no se vea
-- vacío mientras cargas tu contenido real. Usa imágenes de
-- relleno (placehold.co) — reemplázalas desde /admin cuando
-- tengas tus propias fotos: solo edita cada elemento y sube la
-- imagen nueva, no hace falta tocar la base de datos a mano.
-- =========================================================

update public.site_settings set
  clinic_name = 'Clínica Vitalis',
  tagline = 'Tu sonrisa y tu piel, en las mejores manos',
  hero_subtitle = 'Odontología y estética facial con tecnología de punta y atención personalizada, en un solo lugar.',
  hero_image_url = 'https://placehold.co/1200x900/1c7f78/ffffff?text=Clinica+Vitalis',
  about_title = 'Sobre nosotros',
  about_text = 'En Clínica Vitalis combinamos años de experiencia en odontología y estética con tecnología de vanguardia. Nuestro equipo está comprometido con tu bienestar, ofreciendo tratamientos seguros, personalizados y con resultados comprobables.',
  phone = '55 1234 5678',
  whatsapp_number = '525512345678',
  email = 'contacto@clinicavitalis.com',
  address = 'Av. Reforma 123, Col. Centro, Ciudad de México',
  schedule_text = 'Lunes a viernes 9:00–19:00, Sábados 9:00–14:00',
  instagram_url = 'https://instagram.com',
  facebook_url = 'https://facebook.com'
where id = 1;

insert into public.services (category, name, description, price, duration_minutes, image_url, active, sort_order) values
  ('dental', 'Limpieza dental profunda', 'Eliminación de placa y sarro con tecnología ultrasónica para una boca más sana.', 900, 45, 'https://placehold.co/600x450/1c7f78/ffffff?text=Limpieza+Dental', true, 1),
  ('dental', 'Blanqueamiento dental', 'Tratamiento profesional para una sonrisa hasta 8 tonos más blanca.', 2500, 60, 'https://placehold.co/600x450/1c7f78/ffffff?text=Blanqueamiento', true, 2),
  ('dental', 'Ortodoncia con brackets', 'Corrección de la alineación dental con seguimiento mensual incluido.', 15000, 40, 'https://placehold.co/600x450/1c7f78/ffffff?text=Ortodoncia', true, 3),
  ('estetica', 'Limpieza facial profunda', 'Hidratación e higiene facial con extracción profesional de impurezas.', 1200, 50, 'https://placehold.co/600x450/d16b85/ffffff?text=Limpieza+Facial', true, 4),
  ('estetica', 'Aplicación de botox', 'Tratamiento antiedad para suavizar líneas de expresión.', 4500, 30, 'https://placehold.co/600x450/d16b85/ffffff?text=Botox', true, 5),
  ('estetica', 'Ácido hialurónico', 'Relleno facial para recuperar volumen y definición.', 5200, 40, 'https://placehold.co/600x450/d16b85/ffffff?text=Acido+Hialuronico', true, 6)
on conflict do nothing;

insert into public.products (name, description, sku, category, price, stock, low_stock_threshold, image_url, active, sort_order) values
  ('Pasta dental especializada', 'Fórmula con flúor de alta concentración para sensibilidad dental.', 'PD-001', 'Cuidado dental', 180, 24, 5, 'https://placehold.co/500x500/1c7f78/ffffff?text=Pasta+Dental', true, 1),
  ('Enjuague bucal profesional', 'Enjuague antibacterial recomendado post-tratamiento.', 'EB-002', 'Cuidado dental', 220, 18, 5, 'https://placehold.co/500x500/1c7f78/ffffff?text=Enjuague', true, 2),
  ('Sérum facial hidratante', 'Ácido hialurónico de uso diario para el cuidado en casa.', 'SF-003', 'Cuidado facial', 650, 10, 3, 'https://placehold.co/500x500/d16b85/ffffff?text=Serum+Facial', true, 3),
  ('Protector solar facial SPF50', 'Uso diario, recomendado después de tratamientos estéticos.', 'PS-004', 'Cuidado facial', 480, 2, 5, 'https://placehold.co/500x500/d16b85/ffffff?text=Protector+Solar', true, 4)
on conflict do nothing;

insert into public.team_members (name, role_title, bio, photo_url, active, sort_order) values
  ('Dra. Ana Martínez', 'Odontóloga General', 'Más de 10 años de experiencia en salud dental integral.', 'https://placehold.co/400x400/1c7f78/ffffff?text=Dra.+Martinez', true, 1),
  ('Dr. Luis Herrera', 'Ortodoncista', 'Especialista certificado en ortodoncia estética.', 'https://placehold.co/400x400/1c7f78/ffffff?text=Dr.+Herrera', true, 2),
  ('Lic. Sofía Ramos', 'Especialista en Estética Facial', 'Certificada en tratamientos faciales no invasivos.', 'https://placehold.co/400x400/d16b85/ffffff?text=Lic.+Ramos', true, 3)
on conflict do nothing;

insert into public.testimonials (author_name, content, rating, active, sort_order) values
  ('Mariana G.', 'Excelente atención, el equipo es muy profesional y las instalaciones impecables.', 5, true, 1),
  ('Roberto S.', 'Mi tratamiento de ortodoncia superó mis expectativas. Muy recomendado.', 5, true, 2),
  ('Claudia P.', 'El tratamiento facial dejó mi piel increíble, definitivamente voy a regresar.', 4, true, 3)
on conflict do nothing;

insert into public.gallery_images (image_url, caption, sort_order) values
  ('https://placehold.co/800x800/1c7f78/ffffff?text=Recepcion', 'Recepción', 1),
  ('https://placehold.co/800x800/1c7f78/ffffff?text=Consultorio+1', 'Consultorio', 2),
  ('https://placehold.co/800x800/d16b85/ffffff?text=Sala+Estetica', 'Sala de estética', 3),
  ('https://placehold.co/800x800/1c7f78/ffffff?text=Equipo+Dental', 'Equipo dental', 4),
  ('https://placehold.co/800x800/d16b85/ffffff?text=Resultado', 'Resultado de tratamiento', 5),
  ('https://placehold.co/800x800/1c7f78/ffffff?text=Clinica', 'Instalaciones', 6)
on conflict do nothing;
