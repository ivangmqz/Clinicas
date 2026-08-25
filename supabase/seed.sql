-- =========================================================
-- Datos de ejemplo (opcional)
-- Corre esto DESPUÉS de schema.sql para que el sitio no se vea
-- vacío mientras cargas tu contenido real. Las fotos son de
-- Unsplash (uso libre, con fines ilustrativos) — reemplázalas
-- desde /admin cuando tengas tus propias fotos: solo edita cada
-- elemento y sube la imagen nueva, no hace falta tocar la base
-- de datos a mano.
-- =========================================================

update public.site_settings set
  clinic_name = 'Clínica Vitalis',
  tagline = 'Tu sonrisa y tu piel, en las mejores manos',
  hero_subtitle = 'Odontología y estética facial con tecnología de punta y atención personalizada, en un solo lugar.',
  hero_image_url = 'https://images.unsplash.com/photo-1704455306251-b4634215d98f?auto=format&fit=crop&w=1600&q=80',
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
  ('dental', 'Limpieza dental profunda', 'Eliminación de placa y sarro con tecnología ultrasónica para una boca más sana.', 900, 45, 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=800&h=600&q=80', true, 1),
  ('dental', 'Blanqueamiento dental', 'Tratamiento profesional para una sonrisa hasta 8 tonos más blanca.', 2500, 60, 'https://images.unsplash.com/photo-1758205308179-4e00e0e4060b?auto=format&fit=crop&w=800&h=600&q=80', true, 2),
  ('dental', 'Ortodoncia con brackets', 'Corrección de la alineación dental con seguimiento mensual incluido.', 15000, 40, 'https://images.unsplash.com/photo-1770321119305-f191c09c5801?auto=format&fit=crop&w=800&h=600&q=80', true, 3),
  ('estetica', 'Limpieza facial profunda', 'Hidratación e higiene facial con extracción profesional de impurezas.', 1200, 50, 'https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&w=800&h=600&q=80', true, 4),
  ('estetica', 'Aplicación de botox', 'Tratamiento antiedad para suavizar líneas de expresión.', 4500, 30, 'https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&w=800&h=600&q=80', true, 5),
  ('estetica', 'Ácido hialurónico', 'Relleno facial para recuperar volumen y definición.', 5200, 40, 'https://images.unsplash.com/photo-1631050165423-3f29788b977b?auto=format&fit=crop&w=800&h=600&q=80', true, 6)
on conflict do nothing;

insert into public.products (name, description, sku, category, price, stock, low_stock_threshold, image_url, active, sort_order) values
  ('Pasta dental especializada', 'Fórmula con flúor de alta concentración para sensibilidad dental.', 'PD-001', 'Cuidado dental', 180, 24, 5, 'https://images.unsplash.com/photo-1530213709681-b7e537c923cc?auto=format&fit=crop&w=600&h=600&q=80', true, 1),
  ('Enjuague bucal profesional', 'Enjuague antibacterial recomendado post-tratamiento.', 'EB-002', 'Cuidado dental', 220, 18, 5, 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=600&h=600&q=80', true, 2),
  ('Sérum facial hidratante', 'Ácido hialurónico de uso diario para el cuidado en casa.', 'SF-003', 'Cuidado facial', 650, 10, 3, 'https://images.unsplash.com/photo-1631050165423-3f29788b977b?auto=format&fit=crop&w=600&h=600&q=80', true, 3),
  ('Protector solar facial SPF50', 'Uso diario, recomendado después de tratamientos estéticos.', 'PS-004', 'Cuidado facial', 480, 2, 5, 'https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&w=600&h=600&q=80', true, 4)
on conflict do nothing;

insert into public.team_members (name, role_title, bio, photo_url, active, sort_order) values
  ('Dra. Ana Martínez', 'Odontóloga General', 'Más de 10 años de experiencia en salud dental integral.', 'https://images.unsplash.com/photo-1569925444984-9e2e5fc3d1fb?auto=format&fit=crop&w=500&h=500&q=80', true, 1),
  ('Dr. Luis Herrera', 'Ortodoncista', 'Especialista certificado en ortodoncia estética.', 'https://images.unsplash.com/photo-1758691463333-c79215e8bc3b?auto=format&fit=crop&w=500&h=500&q=80', true, 2),
  ('Lic. Sofía Ramos', 'Especialista en Estética Facial', 'Certificada en tratamientos faciales no invasivos.', 'https://images.unsplash.com/photo-1758518727888-ffa196002e59?auto=format&fit=crop&w=500&h=500&q=80', true, 3)
on conflict do nothing;

insert into public.testimonials (author_name, content, rating, active, sort_order) values
  ('Mariana G.', 'Excelente atención, el equipo es muy profesional y las instalaciones impecables.', 5, true, 1),
  ('Roberto S.', 'Mi tratamiento de ortodoncia superó mis expectativas. Muy recomendado.', 5, true, 2),
  ('Claudia P.', 'El tratamiento facial dejó mi piel increíble, definitivamente voy a regresar.', 4, true, 3)
on conflict do nothing;

insert into public.gallery_images (image_url, caption, sort_order) values
  ('https://images.unsplash.com/photo-1746173098661-45ae0ccb6030?auto=format&fit=crop&w=800&h=800&q=80', 'Recepción', 1),
  ('https://images.unsplash.com/photo-1770321119305-f191c09c5801?auto=format&fit=crop&w=800&h=800&q=80', 'Consultorio', 2),
  ('https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&w=800&h=800&q=80', 'Sala de estética', 3),
  ('https://images.unsplash.com/photo-1758205308179-4e00e0e4060b?auto=format&fit=crop&w=800&h=800&q=80', 'Equipo dental', 4),
  ('https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=800&h=800&q=80', 'Detalle de tratamiento', 5),
  ('https://images.unsplash.com/photo-1704455306251-b4634215d98f?auto=format&fit=crop&w=800&h=800&q=80', 'Instalaciones', 6)
on conflict do nothing;
