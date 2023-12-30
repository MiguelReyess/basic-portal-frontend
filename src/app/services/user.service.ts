import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../interfaces/user';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.API_URL}/user`).pipe(
      catchError(this.handleError)
    )
  }
  
  deleteUserById(userId: number): Observable<void>{
    return this.http.delete<void>(`${environment.API_URL}/user/${userId}`).pipe(
      catchError(this.handleError)
    )
  }

  createUser(user:User){
    return this.http.post<User>(`${environment.API_URL}/user/`, user).pipe(
      catchError(this.handleError)
    )
  }

  editUser(user:User){
    return this.http.put<User>(`${environment.API_URL}/user/${user.id}`, user).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }

}
