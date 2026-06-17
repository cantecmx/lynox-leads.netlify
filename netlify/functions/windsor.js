// Proxy seguro a Windsor.ai
// La API key vive en una variable de entorno de Netlify (WINDSOR_API_KEY).
// Nunca está en el repo ni llega al navegador.
exports.handler = async (event) => {
  const API_KEY = process.env.WINDSOR_API_KEY;
  if (!API_KEY) {
    return {
      statusCode: 500,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ error: 'Falta la variable WINDSOR_API_KEY en Netlify (Site settings -> Environment variables).' })
    };
  }
  // Reenviamos los parámetros que mande el dashboard (fields, date_preset, date_from, etc.)
  const params = new URLSearchParams(event.queryStringParameters || {});
  params.set('api_key', API_KEY);
  params.set('_renderer', 'json');
  const url = 'https://connectors.windsor.ai/facebook?' + params.toString();
  try {
    const r = await fetch(url);
    const body = await r.text();
    return {
      statusCode: r.status,
      headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
      body
    };
  } catch (e) {
    return {
      statusCode: 502,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ error: String(e) })
    };
  }
};
