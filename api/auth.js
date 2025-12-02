export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = req.body;
  const adminPassword = process.env.BLOG_ADMIN_PASSWORD;

  if (!adminPassword) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  if (password === adminPassword) {
    // Generate a simple token (in production, use proper JWT)
    const token = Buffer.from(`${Date.now()}-verified`).toString('base64');
    return res.status(200).json({ 
      success: true, 
      token,
      expires: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    });
  }

  return res.status(401).json({ error: 'Invalid password' });
}