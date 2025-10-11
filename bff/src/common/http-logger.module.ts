// src/common/http-logger.module.ts
import { Module, OnModuleInit } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  exports: [HttpModule],
})
export class HttpLoggerModule implements OnModuleInit {
  constructor(private readonly http: HttpService) { }

  onModuleInit() {
    this.http.axiosRef.interceptors.request.use((config: any) => {
      config.metadata = { startTime: new Date(), caller: this.getCallerFile() };

      console.log(
        `\x1b[36m[BFF | ${config.metadata.caller}]\x1b[0m  ${config.method?.toUpperCase()} ${config.url}`
      );
      return config;
    });

    this.http.axiosRef.interceptors.response.use(
      (response : any) => {
        const end = new Date();
        const duration =
          end.getTime() - response.config.metadata.startTime.getTime();

        const caller = response.config.metadata.caller;
        const requestSize = response.config.data
          ? Buffer.byteLength(JSON.stringify(response.config.data))
          : 0;
        const responseSize = Buffer.byteLength(JSON.stringify(response.data));

        console.log(
          `\x1b[32m[BFF | ${caller}]\x1b[0m ✅ ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url} — ${duration} ms | 📦 ${(requestSize / 1024).toFixed(2)} kB sent / ${(responseSize / 1024).toFixed(2)} kB received`
        );

        return response;
      },
      (error) => {
        const caller = error.config?.metadata?.caller || 'Unknown';
        const start = error.config?.metadata?.startTime;
        const duration = start ? new Date().getTime() - start.getTime() : '?';
        const status = error.response?.status || 'ERROR';
        const url = error.config?.url || 'unknown';
        const method = error.config?.method?.toUpperCase() || 'REQ';

        console.log(
          `\x1b[31m[BFF | ${caller}]\x1b[0m ❌ ${status} ${method} ${url} — ${duration} ms`
        );

        return Promise.reject(error);
      },
    );
  }

  /**
   * Récupère automatiquement le nom du fichier TypeScript qui a initié la requête HTTP
   */
  private getCallerFile(): string {
    const origPrepareStackTrace = Error.prepareStackTrace;
    Error.prepareStackTrace = (_, stack) => stack;
    const err = new Error();
    const stack = err.stack as unknown as NodeJS.CallSite[];
    Error.prepareStackTrace = origPrepareStackTrace;

    // On saute les premiers frames internes de Nest/Axios
    const caller = stack?.find(
      (s) =>
        s.getFileName() &&
        !s.getFileName()?.includes('node_modules') &&
        !s.getFileName()?.includes('http-logger.module'),
    );

    if (!caller) return 'Unknown';
    const filePath = caller.getFileName();
    const fileName = filePath?.split(/[/\\]/).pop() || 'Unknown';
    return fileName;
  }
}
