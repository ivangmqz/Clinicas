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
  tagline = 'Tu sonrisa, en las mejores manos',
  hero_subtitle = 'Odontología integral —estética dental, ortodoncia y rehabilitación oral— con tecnología de punta y atención personalizada.',
  hero_image_url = 'https://images.unsplash.com/photo-1704455306251-b4634215d98f?auto=format&fit=crop&w=1600&q=80',
  about_title = 'Sobre nosotros',
  about_text = 'En Clínica Vitalis nos dedicamos exclusivamente a la odontología: desde la prevención y la estética dental hasta la ortodoncia y la rehabilitación oral compleja. Nuestro equipo está comprometido con tu bienestar, ofreciendo tratamientos seguros, personalizados y con resultados comprobables.',
  phone = '55 1234 5678',
  whatsapp_number = '525512345678',
  email = 'contacto@clinicavitalis.com',
  address = 'Av. Reforma 123, Col. Centro, Ciudad de México',
  schedule_text = 'Lunes a viernes 9:00–19:00, Sábados 9:00–14:00',
  instagram_url = 'https://instagram.com',
  facebook_url = 'https://facebook.com'
where id = 1;

insert into public.services (category, name, description, price, duration_minutes, image_url, active, sort_order) values
  ('Odontología general', 'Limpieza dental profunda', 'Eliminación de placa y sarro con tecnología ultrasónica para una boca más sana.', 900, 45, 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=800&h=600&q=80', true, 1),
  ('Odontología general', 'Resina y obturación', 'Tratamiento de caries con materiales estéticos del color natural del diente.', 750, 40, 'https://images.unsplash.com/photo-1758205308179-4e00e0e4060b?auto=format&fit=crop&w=800&h=600&q=80', true, 2),
  ('Estética dental', 'Blanqueamiento dental', 'Tratamiento profesional para una sonrisa hasta 8 tonos más blanca.', 2500, 60, 'https://images.unsplash.com/photo-1677026010083-78ec7f1b84ed?auto=format&fit=crop&w=800&h=600&q=80', true, 3),
  ('Estética dental', 'Carillas dentales', 'Diseño de sonrisa con carillas de porcelana o resina de alta duración.', 4800, 90, 'https://images.unsplash.com/photo-1489278353717-f64c6ee8a4d2?auto=format&fit=crop&w=800&h=600&q=80', true, 4),
  ('Ortodoncia', 'Ortodoncia con brackets', 'Corrección de la alineación dental con seguimiento mensual incluido.', 15000, 40, 'https://images.unsplash.com/photo-1770321119305-f191c09c5801?auto=format&fit=crop&w=800&h=600&q=80', true, 5),
  ('Ortodoncia', 'Alineadores invisibles', 'Alternativa estética y removible a los brackets tradicionales.', 22000, 45, 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=800&h=600&q=80', true, 6),
  ('Rehabilitación oral', 'Implante dental', 'Reemplazo fijo de piezas dentales perdidas con implante de titanio.', 18500, 90, 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&h=600&q=80', true, 7),
  ('Rehabilitación oral', 'Prótesis dental', 'Rehabilitación funcional y estética con prótesis fija o removible.', 9500, 60, 'https://images.unsplash.com/photo-1530213709681-b7e537c923cc?auto=format&fit=crop&w=800&h=600&q=80', true, 8)
on conflict do nothing;

insert into public.products (name, description, sku, category, price, stock, low_stock_threshold, image_url, active, sort_order) values
  ('Pasta dental especializada', 'Fórmula con flúor de alta concentración para sensibilidad dental.', 'PD-001', 'Higiene dental', 180, 24, 5, 'https://images.unsplash.com/photo-1530213709681-b7e537c923cc?auto=format&fit=crop&w=600&h=600&q=80', true, 1),
  ('Enjuague bucal profesional', 'Enjuague antibacterial recomendado post-tratamiento.', 'EB-002', 'Higiene dental', 220, 18, 5, 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=600&h=600&q=80', true, 2),
  ('Cepillo eléctrico recargable', 'Recomendado para pacientes con ortodoncia y encías sensibles.', 'CE-003', 'Higiene dental', 890, 8, 3, 'https://images.unsplash.com/photo-1758205308179-4e00e0e4060b?auto=format&fit=crop&w=600&h=600&q=80', true, 3),
  ('Kit de limpieza para ortodoncia', 'Cepillos interdentales y cera para brackets, uso diario.', 'KO-004', 'Ortodoncia', 260, 2, 5, 'https://images.unsplash.com/photo-1770321119305-f191c09c5801?auto=format&fit=crop&w=600&h=600&q=80', true, 4)
on conflict do nothing;

insert into public.team_members (name, role_title, bio, photo_url, active, sort_order) values
  ('Dra. Ana Martínez', 'Odontóloga General', 'Más de 10 años de experiencia en salud dental integral.', 'https://images.unsplash.com/photo-1569925444984-9e2e5fc3d1fb?auto=format&fit=crop&w=500&h=500&q=80', true, 1),
  ('Dr. Luis Herrera', 'Ortodoncista', 'Especialista certificado en ortodoncia y alineadores invisibles.', 'https://images.unsplash.com/photo-1758691463333-c79215e8bc3b?auto=format&fit=crop&w=500&h=500&q=80', true, 2),
  ('Lic. Sofía Ramos', 'Especialista en Rehabilitación Oral', 'Certificada en implantología y prótesis dental.', 'https://images.unsplash.com/photo-1758518727888-ffa196002e59?auto=format&fit=crop&w=500&h=500&q=80', true, 3)
on conflict do nothing;

insert into public.testimonials (author_name, content, rating, active, sort_order) values
  ('Mariana G.', 'Excelente atención, el equipo es muy profesional y las instalaciones impecables.', 5, true, 1),
  ('Roberto S.', 'Mi tratamiento de ortodoncia superó mis expectativas. Muy recomendado.', 5, true, 2),
  ('Claudia P.', 'El implante quedó perfecto y la recuperación fue mucho más rápida de lo que esperaba.', 4, true, 3)
on conflict do nothing;

insert into public.gallery_images (image_url, caption, sort_order) values
  ('https://images.unsplash.com/photo-1746173098661-45ae0ccb6030?auto=format&fit=crop&w=800&h=800&q=80', 'Recepción', 1),
  ('https://images.unsplash.com/photo-1770321119305-f191c09c5801?auto=format&fit=crop&w=800&h=800&q=80', 'Consultorio', 2),
  ('https://images.unsplash.com/photo-1677026010083-78ec7f1b84ed?auto=format&fit=crop&w=800&h=800&q=80', 'Sala de estética dental', 3),
  ('https://images.unsplash.com/photo-1758205308179-4e00e0e4060b?auto=format&fit=crop&w=800&h=800&q=80', 'Equipo dental', 4),
  ('https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=800&h=800&q=80', 'Detalle de tratamiento', 5),
  ('https://images.unsplash.com/photo-1704455306251-b4634215d98f?auto=format&fit=crop&w=800&h=800&q=80', 'Instalaciones', 6)
on conflict do nothing;
