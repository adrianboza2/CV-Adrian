# Security checklist for CV site

This file documents the security changes and provides testing steps and instructions for generating SRI hashes.

## What I changed
- Added `robots.txt` to block indexing during development.
- Added `/_headers` for Netlify with security headers (HSTS, CSP, Referrer-Policy, X-Frame-Options, etc.). Confirm and adjust the CSP for production.
- Ensured external CDN references include `crossorigin="anonymous"` and placed placeholders for `integrity` attributes (please compute real SRI values before production deployment).
- Ensured email disclosures use the obfuscator script (no plaintext `mailto:` present in HTML) and left `ofuscador.js` as the mechanism to open emails.
- Removed unnecessary console.* traces (none found).

## Next steps / How to generate SRI hashes
Use one of the following commands to generate SRI (SHA-384) for a given file downloaded to your machine:

PowerShell:
```powershell
# Example: download the file then compute SRI
Invoke-WebRequest -Uri https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js -OutFile bootstrap.bundle.min.js
$hash = (Get-FileHash bootstrap.bundle.min.js -Algorithm SHA384).Hash
$base64 = [Convert]::ToBase64String(([System.Convert]::FromHexString($hash)))
"sha384-$base64"
```

Linux/macOS (bash):
```bash
curl -sSfL https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js -o /tmp/bootstrap.bundle.min.js
openssl dgst -sha384 -binary /tmp/bootstrap.bundle.min.js | openssl base64 -A | sed 's/^/sha384-/'
```

Replace the placeholders in `index.html` with the produced SRI value.

## CSP notes
- The CSP in `_headers` is conservative and contains `unsafe-inline` to avoid breaking the demo. For production, refactor inline handlers (e.g., the mobile `onclick` handlers) to avoid `unsafe-inline` and use nonces or external scripts instead.
- Limit `script-src` to the necessary CDNs you use (bootstrap, fontawesome, etc.) and avoid `unsafe-eval`/`unsafe-inline` in production.

## Quick checks to do after deployment
- Use https://securityheaders.com/ (enter your site URL) and follow the recommendations.
- Use Mozilla Observatory (https://observatory.mozilla.org/) to review headers and other security aspects.

## Notes
- If you use GitHub pages, you must configure security headers at the web host level or via a reverse proxy / platform like Netlify.
- If you want me to add SRI hashes automatically I can do it if you provide the computed hashes, or I can add a script to compute them in your environment.
