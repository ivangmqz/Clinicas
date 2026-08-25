type IconProps = { className?: string };

export function ToothIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3c-1.6 0-2.7 1-4 1-2 0-3.5 1.7-3.5 4.2 0 2 .6 3.6 1.1 5.4.5 1.8.9 4.4 2.2 4.4 1.3 0 1.2-3 2.2-3s.9 3 2.2 3c1.3 0 1.7-2.6 2.2-4.4.5-1.8 1.1-3.4 1.1-5.4C15.5 5.7 14 4 12 4c-1.3 0-2.4-1-4-1"
      />
    </svg>
  );
}

export function SparkleIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3l1.6 4.9L18.5 9l-4.9 1.6L12 15.5l-1.6-4.9L5.5 9l4.9-1.6L12 3zM19 15l.8 2.3L22 18l-2.2.7L19 21l-.8-2.3L16 18l2.2-.7L19 15zM5 15l.6 1.8L7.4 17l-1.8.6L5 19.4l-.6-1.8L2.6 17l1.8-.6L5 15z"
      />
    </svg>
  );
}

export function BoxIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8l-9-5-9 5 9 5 9-5zM3 8v8l9 5 9-5V8M12 13v8"
      />
    </svg>
  );
}

export function ShieldIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3l7 3v5c0 4.6-3 8.4-7 10-4-1.6-7-5.4-7-10V6l7-3z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function ClockIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3.5 2" />
    </svg>
  );
}

export function HeartHandIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 20s-6.5-4.1-9-8.2C1.3 9 2 5.8 4.8 4.9c1.8-.6 3.6.1 4.6 1.6.4.6.6.9.6.9s.2-.3.6-.9c1-1.5 2.8-2.2 4.6-1.6C18 5.8 18.7 9 21 11.8c-2.5 4.1-9 8.2-9 8.2z"
      />
    </svg>
  );
}

export function MapPinIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21z"
      />
      <circle cx="12" cy="9.5" r="2.3" />
    </svg>
  );
}

export function PhoneIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 5c0-.6.4-1 1-1h2.2c.5 0 .9.3 1 .8l.7 3a1 1 0 0 1-.3 1L7 10.5c1 2.2 2.8 4 5 5l1.7-1.6a1 1 0 0 1 1-.3l3 .7c.5.1.8.5.8 1V17c0 .6-.4 1-1 1h-1C9.4 18 4 12.6 4 6V5z"
      />
    </svg>
  );
}

export function MailIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.5 6.5L12 13l8.5-6.5" />
    </svg>
  );
}

export function InstagramIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} className={className}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14 21v-7h2.5l.5-3H14V9c0-.9.2-1.5 1.5-1.5H17V4.9C16.7 4.9 15.7 4.8 14.6 4.8c-2.3 0-3.9 1.4-3.9 4V11H8v3h2.7v7"
      />
    </svg>
  );
}
