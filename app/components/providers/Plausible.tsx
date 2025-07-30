"use client";

import Script from "next/script";

export default function PlausibleAnalytics() {
  return (
    <>
      <Script
        defer
        data-domain="bypolar.ageronjoachim.com"
        src="https://plausible.ageronjoachim.com/js/script.file-downloads.hash.outbound-links.js"
      />
      <Script id="plausible-init">
        {`window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`}
      </Script>
    </>
  );
}
