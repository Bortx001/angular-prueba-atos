import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtilsService } from '@app/services/utils/utils.service';

/**
 * Prefixes all requests with `this.utils.getHost()`.
 */
@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {
  constructor(
    private utils: UtilsService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // AQUI HAY UN USO DE UN INTERCEPTOR, AUNQUE EN ESTA PRUEBA NO LE ESTOY DANDO USO PORQUE NO APLICA
    // LO QUE HACE ES INTERCEPTAR LAS LLAMADAS Y AÑADIRLES POR EJEMPLO UN HEADER GENERAL, COMO PUEDE SER LA VERSION
    
    if (!/^(http|https):/i.test(request.url)) {
      let headers = new HttpHeaders();

      headers = headers.append('Version', 'v1');
      
      if(!(request.body instanceof FormData)){
        headers = headers.append('Content-Type', 'application/json; charset=UTF-8');
      }

      request = request.clone({
        url: this.utils.getHost() + request.url,
        headers: headers
      });
    }

    return next.handle(request);
  }
}
