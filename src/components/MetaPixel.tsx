'use client';

import Script from 'next/script';
import Image from 'next/image';
import { useEffect } from 'react';

export default function MetaPixel() {
  useEffect(() => {
    // Asegurarse de que el script de Facebook se carga después de que la página esté lista
    if (typeof window !== 'undefined') {
      window.fbq = window.fbq || function(...args: unknown[]) {
        (window.fbq as { queue: unknown[] }).queue = (window.fbq as { queue: unknown[] }).queue || [];
        (window.fbq as { queue: unknown[] }).queue.push(args);
      };
      window._fbq = window.fbq;
      window.fbq('init', '484313314768592');
      window.fbq('track', 'PageView');
    }
  }, []);

  return (
    <>
      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        src="https://connect.facebook.net/en_US/fbevents.js"
      />
      <noscript>
        <div style={{ display: 'none' }}>
          <Image
            src="https://www.facebook.com/tr?id=484313314768592&ev=PageView&noscript=1"
            alt="Facebook Pixel"
            width={1}
            height={1}
          />
        </div>
      </noscript>
    </>
  );
} 