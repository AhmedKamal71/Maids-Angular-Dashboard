import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://reqres.in/api/users';
  private cache = new Map<string, any>();

  constructor(private http: HttpClient) {}

  getUsers(page: number): Observable<any> {
    const cacheKey = `users-page-${page}`;

    // Return cached data if available
    if (this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey));
    }

    // Fetch data from API, cache it, and return
    return this.http.get(`${this.apiUrl}?page=${page}`).pipe(
      map((data) => {
        // Cache the response
        this.cache.set(cacheKey, data);
        return data;
      }),
      catchError(this.handleError('getUsers', []))
    );
  }

  getUserById(id: number): Observable<any> {
    const cacheKey = `user-${id}`;

    // Return cached data if available
    if (this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey));
    }

    // Fetch data from API, cache it, and return
    return this.http.get(`${this.apiUrl}/${id}`).pipe(
      map((data) => {
        // Cache the response
        this.cache.set(cacheKey, data);
        return data;
      }),
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
