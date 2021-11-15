/* "Barrel" of Http Interceptors; see HttpClient docs and sample code for more info */
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApiPrefixInterceptor } from './http/api-prefix.interceptor';
import { HttpErrorInterceptor } from './http/http-error.interceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, 
    useClass: ApiPrefixInterceptor, 
    multi: true 
  },
  { provide: HTTP_INTERCEPTORS, 
    useClass: HttpErrorInterceptor, 
    multi: true 
  }
];
