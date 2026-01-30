import { v2 as cloudinary } from 'cloudinary';

// Debug: Log loaded configuration (masking secret)
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

// Only log once on server start
if (process.env.NODE_ENV === 'development') {
  console.log('----------------------------------------');
  console.log('☁️  Cloudinary Config Status:');
  console.log(`   - Cloud Name: ${cloudName ? '✅ Loaded' : '❌ MISSING (Check .env)'}`);
  console.log(`   - API Key:    ${apiKey ? '✅ Loaded' : '❌ MISSING (Check .env)'}`);
  console.log(`   - API Secret: ${apiSecret ? '✅ Loaded' : '❌ MISSING (Check .env)'}`);
  console.log('----------------------------------------');
}

// If CLOUDINARY_URL is present, the SDK automatically configures itself.
// We only manually config if we are relying on individual variables.
if (process.env.CLOUDINARY_URL) {
  console.log('✅ Cloudinary Config: Using CLOUDINARY_URL');
} else {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });
}

export default cloudinary;
