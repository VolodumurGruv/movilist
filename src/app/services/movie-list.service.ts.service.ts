import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Movie } from '../interfaces/movie.interface';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class MovieListService {
  public error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient, private alertService: AlertService) {}

  getMovies(): Observable<Movie[]> {
    return this.http
      .get<Movie[]>('/api/')
      .pipe(catchError(this.handleError<Movie[]>('Get image')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  log(message: string) {
    this.alertService.add(message);
  }
}
