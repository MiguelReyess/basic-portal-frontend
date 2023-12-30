import { Injectable } from '@angular/core';
import { LoginInterface } from '../../interfaces/login';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../../interfaces/user';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(credentials: LoginInterface): Observable<User> {
    return this.http.post<User>(`${environment.API_URL}/auth/login`, credentials).pipe(
      catchError(this.handleError)
    )

  }
  private handleError(error: HttpErrorResponse){
    if (error.status === 0) {
      console.error('Se ha generado un error', error.error);
    }
    else{
      console.error('API error', error.status, error.error);
    }
    return throwError(()=> new Error ('Algo salio mal'));
  }
}
