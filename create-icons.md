# Creating Extension Icons

You need three PNG icons in the `public/icons/` directory:
- `icon16.png` (16x16 pixels)
- `icon48.png` (48x48 pixels)
- `icon128.png` (128x128 pixels)

## Quick Options

### Option 1: Use an SVG Logo (Recommended)

If you have an SVG or vector logo:

1. Go to https://www.iloveimg.com/resize-image/resize-svg
2. Upload your SVG
3. Resize to 128x128, download as PNG → save as `icon128.png`
4. Resize to 48x48, download as PNG → save as `icon48.png`
5. Resize to 16x16, download as PNG → save as `icon16.png`
6. Move all three to `public/icons/`

### Option 2: Use a PNG/JPG Image

1. Go to https://www.iloveimg.com/resize-image
2. Upload your image
3. Create three versions at 16x16, 48x48, and 128x128
4. Download and save in `public/icons/`

### Option 3: Generate a Simple Icon Online

**Using Canva (Free):**
1. Go to https://www.canva.com/
2. Create a new design (Custom size: 128x128)
3. Add a simple icon or text
4. Download as PNG
5. Resize to other sizes using Option 1 or 2 above

**Using Favicon.io (Fastest):**
1. Go to https://favicon.io/favicon-generator/
2. Create a simple text-based icon
3. Download the package
4. Use the PNG files and resize as needed

### Option 4: Use ImageMagick (Command Line)

If you have ImageMagick installed:

```bash
# Create simple colored circles (replace #0066cc with your brand color)
convert -size 128x128 xc:none -fill "#0066cc" -draw "circle 64,64 64,10" public/icons/icon128.png
convert -size 48x48 xc:none -fill "#0066cc" -draw "circle 24,24 24,4" public/icons/icon48.png
convert -size 16x16 xc:none -fill "#0066cc" -draw "circle 8,8 8,2" public/icons/icon16.png
```

Or with a letter:

```bash
mkdir -p public/icons
convert -size 128x128 xc:"#0066cc" -gravity center -fill white -font Arial-Bold -pointsize 72 -annotate +0+0 "W" public/icons/icon128.png
convert -size 48x48 xc:"#0066cc" -gravity center -fill white -font Arial-Bold -pointsize 28 -annotate +0+0 "W" public/icons/icon48.png
convert -size 16x16 xc:"#0066cc" -gravity center -fill white -font Arial-Bold -pointsize 10 -annotate +0+0 "W" public/icons/icon16.png
```

### Option 5: Use Figma (Professional)

1. Create a new Figma file
2. Create a 128x128 frame
3. Design your icon
4. Export as PNG at 1x, 0.375x (48px), and 0.125x (16px)
5. Rename and save in `public/icons/`

## Quick Temporary Solution

For testing only, create simple placeholder icons:

**HTML Canvas Method:**
Create a file `create-temp-icons.html`:

```html
<!DOCTYPE html>
<html>
<body>
<canvas id="canvas"></canvas>
<script>
const sizes = [16, 48, 128];
sizes.forEach(size => {
  const canvas = document.getElementById('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  
  // Background
  ctx.fillStyle = '#0066cc';
  ctx.fillRect(0, 0, size, size);
  
  // Text
  ctx.fillStyle = 'white';
  ctx.font = `bold ${size * 0.5}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('W', size/2, size/2);
  
  // Download
  canvas.toBlob(blob => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `icon${size}.png`;
    a.click();
  });
});
</script>
</body>
</html>
```

Open this file in a browser, and it will download all three icons.

## Verify Icons

After creating icons, verify:

```bash
# Check files exist
ls -lh public/icons/

# Should show:
# icon16.png
# icon48.png
# icon128.png
```

Make sure they're PNG format and the correct sizes!

## Icon Design Tips

**Best Practices:**
- Keep it simple and recognizable
- Use high contrast (icon will be small)
- Test at 16x16 - if it looks good small, it'll look good at all sizes
- Match your brand colors
- Transparent background works well
- Avoid fine details that won't be visible at small sizes

**Colors:**
- Use your company/brand colors
- Or use a vibrant color that stands out in the toolbar
- Blue (#0066cc) is a safe default

**Shapes:**
- Circles, squares, or simple geometric shapes work well
- Letters (like "W" for WebUI) are clear and recognizable
- Icons should be centered with some padding
