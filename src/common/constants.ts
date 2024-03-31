// API
const apiBasePath = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `http://localhost:3000`;

export const API_BASE_URL = `${apiBasePath}/api`;
