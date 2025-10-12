import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable()
export class HttpLoggerInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const startTime = performance.now();
    const reqSize = req.body ? JSON.stringify(req.body).length : 0;

    // 🧭 Détection du type de requête selon le port
    let prefix = '[Front]';
    if (req.url.includes(':4000')) prefix = '[Front → BFF]';
    else if (req.url.includes(':9500')) prefix = '[Front → Backend]';
    else prefix = '[Front → Unknown]';

    return next.handle(req).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
            const duration = performance.now() - startTime;
            const resSize = JSON.stringify(event.body || '').length;

            const color =
              event.status >= 200 && event.status < 300
                ? 'color: #4CAF50' // vert
                : event.status >= 400
                  ? 'color: #F44336' // rouge
                  : 'color: #FFC107'; // jaune

            const timestamp = new Date().toLocaleTimeString('fr-FR', {
              hour12: false,
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              fractionalSecondDigits: 3,
            });

            console.log(
              `%c${timestamp} ${prefix} ${event.status} ${req.method} ${req.url}`,
              color
            );
            console.log(
              `   ⏱️ ${(duration).toFixed(1)} ms | 📦 ${(reqSize / 1024).toFixed(2)} kB sent / ${(resSize / 1024).toFixed(2)} kB received`
            );

            if (event.body) console.log('   📥 Response:', event.body);
          }
        },
        error: (error) => {
          const duration = performance.now() - startTime;
          const timestamp = new Date().toLocaleTimeString('fr-FR', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            fractionalSecondDigits: 3,
          });

          console.log(
            `%c${timestamp} ${prefix} ❌ ${error.status || 'ERR'} ${req.method} ${req.url} — ${duration.toFixed(1)} ms`,
            'color: #F44336'
          );
        },
      })
    );
  }
}
