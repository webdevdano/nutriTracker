# PWA Icons

To complete the PWA setup, you need to add app icons:

## Quick Option: Use an Icon Generator

1. Go to https://realfavicongenerator.net/ or https://www.pwabuilder.com/imageGenerator
2. Upload a logo (square image, at least 512x512px)
3. Generate and download the icons
4. Place these files in `/public/`:
   - `icon-192.png` (192x192)
   - `icon-512.png` (512x512)
   - `favicon.ico`

## Or Create Simple Placeholders:

You can create simple colored squares as temporary icons:

### Using online tools:
- Go to https://placeholder.com/
- Download 192x192 and 512x512 images
- Save as `icon-192.png` and `icon-512.png` in `/public/`

### Using ImageMagick (if installed):
```bash
convert -size 192x192 xc:#4169E1 public/icon-192.png
convert -size 512x512 xc:#4169E1 public/icon-512.png
```

## Test Your PWA:

1. Build and run: `pnpm build && pnpm start`
2. Open in Chrome: http://localhost:3000
3. Open DevTools > Application > Manifest
4. Check for errors
5. On mobile, tap "Add to Home Screen"

## Current Status:

✅ manifest.json created
✅ PWA meta tags added
✅ next-pwa installed
✅ Service worker configured
⚠️ Icons need to be added (see above)
