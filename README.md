# Vidushi Krithi Kailar

A static, multi-page Bharatanatyam portfolio for https://krithikailar.in.

## Pages

Home, The artiste, Pratyaveksini, The journey, On stage, Productions, Learn with Krithi, The archive and Contact. The site also includes a custom 404 page.

The archive contains all 89 supplied photographs, with category filters, pagination and a keyboard-accessible full-size viewer. Photographs are optimized WebP copies, with smaller responsive versions. The original faces and poses have not been generated or altered.

## Run and update

The site has no runtime dependencies. Serve this directory with a static web server, or run `npm run dev` with Node.js installed.

Page content and templates are in `scripts/build.py`. After editing, run:

```sh
npm run build
npm test
```

The build and checks require Python 3. Styling and interactions are in `assets/site.css` and `assets/site.js`. Fonts are self-hosted in `assets/fonts`.

## Hosting

The generated HTML files and assets are ready to serve directly from the repository root. Keep the existing `CNAME` file for krithikailar.in. For GitHub Pages configured to publish from the main branch root, merge the complete change into main. No package installation or server application is needed in production.

## Content notes

- Class announcement: 3 December 2026 onwards. The year uses the upcoming December following the November 2026 brief.
- Venue: Sri Rama Mandira, 2nd Main Road, 16th Cross, Jayanagara, Mysuru, Karnataka 570014.
- The location link is an address-based Google Maps search. The QR code encodes the same URL, stored in `assets/location.json`.
- WhatsApp: https://wa.me/918431534682. Every phone link opens WhatsApp for online or offline class enquiries. Email: kailarkrithi@gmail.com. Instagram: @krithikailar.
- The enquiry form prepares a draft in the visitor's email application. It does not send mail or store submissions.
- Pratyaveksini includes the supplied Kannada scan of Nrittahasini from D. V. Gundappa's Antahpura Gite, with the connection to its opening stanza and further-reading references.
- The new hero uses the user-supplied stage photograph without generating or altering the dancer.
- The generated typographic wordmark and KK monogram are in assets/brand. The site composites their monochrome artwork as light ink on dark backgrounds.

## Verification

The static check verifies local links and anchors, page metadata, image alternatives, all 89 archive entries, class details and the absence of em dashes. JavaScript syntax, the venue QR payload, desktop layouts, mobile navigation, archive filtering, pagination, image navigation and Escape-to-close have also been checked during implementation. Reduced-motion preferences are respected.
