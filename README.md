# Lynox · Dashboard de Leads

Dashboard de leads (Meta Ads) de Lynox, con actualización en vivo desde Windsor.ai.

## Cómo está armado
- `index.html` — el dashboard (sin API key adentro).
- `netlify/functions/windsor.js` — proxy seguro a Windsor.ai. La API key vive en una variable de entorno, no en el código.
- `netlify.toml` — configuración de Netlify.

## Deploy en Netlify
1. Conecta este repo en https://app.netlify.com (Add new site → Import from Git).
2. En **Site settings → Environment variables**, crea:
   - `WINDSOR_API_KEY` = (tu API key de Windsor.ai)
3. Deploy. El botón "⟳ Actualizar datos" consulta Windsor a través de la función segura.

> La API key nunca queda en el repo ni en el navegador.
