'use client';

import Script from 'next/script';
import Image from 'next/image';

declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

export default function MetaPixel() {
  return (
    <>
      <Script
        id="facebook-pixel"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '484313314768592');
            fbq('track', 'PageView');
          `
        }}
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