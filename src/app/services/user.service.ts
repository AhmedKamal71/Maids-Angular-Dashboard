import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://reqres.in/api/users';
  private cache = new Map<string, any>();

  constructor(private http: HttpClient) {}

  getUsers(page: number): Observable<any> {
    const cacheKey = `users-page-${page}`;
    if (this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey));
    }
    return this.http.get(`${this.apiUrl}?page=${page}`).pipe(
      tap((data) => this.cache.set(cacheKey, data)),
      catchError(this.handleError('getUsers', []))
    );
  }

  getUserById(id: number): Observable<any> {
    const cacheKey = `user-${id}`;
    if (this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey));
    }
    return this.http.get(`${this.apiUrl}/${id}`).pipe(
      tap((data) => this.cache.set(cacheKey, data)),
      catchError(this.handleError(`getUser id=${id}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
