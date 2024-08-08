import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, finalize } from 'rxjs/operators';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://reqres.in/api/users';
  private cache = new Map<string, any>();

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService
  ) {}

  getUsers(page: number): Observable<any> {
    const cacheKey = `users-page-${page}`;

    if (this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey));
    }

    this.loadingService.setLoading(true);
    return this.http.get(`${this.apiUrl}?page=${page}`).pipe(
      map((data) => {
        this.cache.set(cacheKey, data);
        return data;
      }),
      catchError(this.handleError('getUsers', [])),
      finalize(() => this.loadingService.setLoading(false))
    );
  }

  getUserById(id: number): Observable<any> {
    const cacheKey = `user-${id}`;

    if (this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey));
    }

    this.loadingService.setLoading(true);
    return this.http.get(`${this.apiUrl}/${id}`).pipe(
      map((data: any) => {
        if (!data || !data.data) {
          return {
            id: id,
            first_name: '',
            last_name: '',
            email: '',
            avatar: '',
          };
        }
        this.cache.set(cacheKey, data);
        return data;
      }),
      catchError(this.handleError(`getUser id=${id}`)),
      finalize(() => this.loadingService.setLoading(false))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
