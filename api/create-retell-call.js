// Vercel Serverless Function: POST /api/create-retell-call
// Securely creates a Retell web call on the server without exposing RETELL_API_KEY to the frontend.

module.exports = async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.RETELL_API_KEY;
  if (!apiKey) {
    console.error('Missing RETELL_API_KEY environment variable');
    return res.status(500).json({ 
      error: 'RETELL_API_KEY is not configured in server environment variables. Please add it to your Vercel project settings.' 
    });
  }

  // Parse body if needed
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (e) {
      body = {};
    }
  }
  body = body || {};

  const agentId = body.agent_id || process.env.RETELL_AGENT_ID || 'agent_ebca8fce123b3233986fd23e18';

  try {
    const response = await fetch('https://api.retellai.com/v2/create-web-call', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        agent_id: agentId
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Retell API error (${response.status}):`, errorText);
      return res.status(response.status).json({ 
        error: `Retell API Error: ${errorText}` 
      });
    }

    const data = await response.json();
    return res.status(200).json({
      access_token: data.access_token,
      call_id: data.call_id
    });
  } catch (err) {
    console.error('Server error creating Retell web call:', err);
    return res.status(500).json({ 
      error: err.message || 'Internal server error while connecting to Retell' 
    });
  }
};
