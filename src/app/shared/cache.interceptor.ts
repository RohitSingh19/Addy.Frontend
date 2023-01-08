import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, tap } from "rxjs";
import { HttpCacheService } from "../service/cache.service";

@Injectable()
export class CacheIterceptor implements HttpInterceptor {
    
    constructor(private cacheService: HttpCacheService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //if the current http call is not for GET invalidate the cache.
        if(req.method !== 'GET') {
            console.log(`Invalidating cache: ${req.method} ${req.url}`);
            this.cacheService.invalidatCache();
            return next.handle(req);
        }

        //get response from cache
        const cachedResponse: HttpResponse<any> | undefined = this.cacheService.get(req.url);

        
        if(cachedResponse) {
            console.log(`Returning a cached response: ${cachedResponse.url}`);  
            console.log(cachedResponse);  
            return of(cachedResponse);
        }

        //if cachched response not found for url, the send the network call and cache the response

        return next.handle(req).pipe(
            tap(event => {
                if(event instanceof HttpResponse) {
                    console.log(`Add response to cache: ${req.url}`);
                    this.cacheService.put(req.url, event);
                }
            })
        );
    }

}