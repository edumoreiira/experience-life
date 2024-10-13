import { ApplicationConfig, importProvidersFrom, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideEnvironmentNgxMask } from 'ngx-mask';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
     provideClientHydration(),
     importProvidersFrom([BrowserAnimationsModule]),
     provideHttpClient(withFetch()),
     provideEnvironmentNgxMask({thousandSeparator: '.', decimalMarker: ','}),
    { provide: LOCALE_ID, useValue: 'pt' },
    ]
};
