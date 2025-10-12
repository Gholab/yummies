/**
 * Loggue une requête HTTP (déjà exécutée)
 * avec le code statut, le temps de réponse et les tailles envoyées/reçues.
 */
export function logHttp(response: any, startTime: number, body?: any) {
  const duration = Date.now() - startTime;
  const method = response.config?.method?.toUpperCase() || 'UNKNOWN';
  const url = response.config?.url || 'UNKNOWN';
  const status = response.status || 'NO_STATUS';
  const reqSize = body ? Buffer.byteLength(JSON.stringify(body)) : 0;
  const resSize = response.data
    ? Buffer.byteLength(JSON.stringify(response.data))
    : 0;

  const color =
    status >= 200 && status < 300
      ? '\x1b[32m' // vert
      : status >= 400
        ? '\x1b[31m' // rouge
        : '\x1b[33m'; // jaune
  const reset = '\x1b[0m';

  console.log(
    `${color}[BFF] ${status}${reset} ${method} ${url} — ${duration} ms | 📦 ${(reqSize / 1024).toFixed(2)} kB sent / ${(resSize / 1024).toFixed(2)} kB received`
  );

  if (response.data) {
    console.log('📥 Response:', JSON.stringify(response.data, null, 2));
  }
}
