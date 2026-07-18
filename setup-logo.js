const fs = require('fs');
const path = require('path');

const sourceImage = '/home/moy/.gemini/antigravity-ide/brain/b0be5c51-96cc-4494-9cc9-333c63b7ca39/pawmatch_logo_1784397040228.png';

const destPublic = path.join(__dirname, 'public', 'logo.png');
const destIcon = path.join(__dirname, 'src', 'app', 'icon.png');
const oldFavicon = path.join(__dirname, 'src', 'app', 'favicon.ico');

try {
  // 1. Copy the new logo
  fs.copyFileSync(sourceImage, destPublic);
  console.log('✅ Created public/logo.png');
  
  fs.copyFileSync(sourceImage, destIcon);
  console.log('✅ Created src/app/icon.png (Favicon)');

  // 2. Remove default Next.js icons
  const publicDir = path.join(__dirname, 'public');
  const files = fs.readdirSync(publicDir);
  for (const file of files) {
    if (file.endsWith('.svg')) {
      fs.unlinkSync(path.join(publicDir, file));
      console.log('🗑️ Removed unused default icon: ' + file);
    }
  }

  // 3. Remove old favicon.ico
  if (fs.existsSync(oldFavicon)) {
    fs.unlinkSync(oldFavicon);
    console.log('🗑️ Removed old favicon.ico');
  }

  console.log('\n🎉 ALL DONE! Please refresh your browser.');
} catch (error) {
  console.error('❌ Error:', error.message);
}
