// core modules
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

// rxjs modules
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators';
import { map } from 'rxjs/operators';

// global variables
const apiUrl = 'https://filmopedia.herokuapp.com/';
// Get token from local storage for requests
const token = localStorage.getItem('token');
console.log(token);
// Get username from localStorage for URLs
const username = localStorage.getItem('user');
console.log(username);

@Injectable({
  providedIn: 'root'
})

export class FetchDataApiService {

  // Inject the HttpClient module to the constructor params
  constructor(private http:HttpClient, private router:Router) {}


  // User Registration (public service)
  public userRegistration(userDetails:any): Observable<any> {
    console.log(userDetails);
    return this.http.post
    (apiUrl + 'users', userDetails)
    .pipe(
      catchError(this.handleError)
    );
  }
  

// User Login (public service)
  public userLogin(userDetails: any): Observable<any> {
  console.log(userDetails);
  return this.http.post(apiUrl + 'login', userDetails)
  .pipe(
    catchError(this.handleError)
  );
  }


// Get All Movies (private service)
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: `Bearer ${token}`,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      )
  }

// Get a single movie by Id (private service)
  getMovie(): Observable<any> {
    return this.http.get(apiUrl + 'movies/id/:movieId', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      )
      
  }
 

// Get a director by name (private service)
  getDirector(): Observable<any> {
    return this.http.get(apiUrl + 'movies/director/:name', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer '+ token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }
  

// Get a genre by name (private service)
  getGenre(): Observable<any> {
    return this.http.get(apiUrl + 'movies/genre/:name', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }
  

// Get a User by username (private service)
  getUser(username:any): Observable<any> {
    return this.http.get(apiUrl + `users/${username}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    ) }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }


  // Get the favoritemovies-array of a user (private service)
  getFavoriteMovies(): Observable<any> {
    return this.http.get(apiUrl + `users/${username}/favoritemovies`,
    {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }


  // Add a movie to the favoritemovies-array (private service)
  addToFavoriteMovies(): Observable<any> {
    return this.http.post(apiUrl + `users/${username}/favoritemovies/:movieId`,
    {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  } 


  // Edit user profile (private service)
  editUserProfile(): Observable<any> {
    return this.http.put(apiUrl + `users/${username}`,
    {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token, 
      }
      )}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      )
  }
  

  //Delete user profile (private service)
    deleteUserProfile(): Observable<any> {
      return this.http.delete(apiUrl + `users/${username}`,
      {headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      )
    }


  // Remove a movie from the favoritemovies-array (private service)
  removeFromFavoriteMovies(): Observable<any> {
    return this.http.delete(apiUrl + `users/${username}/favoritemovies/:movieId`,
    {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  } 

  // extract Response Data
  private extractResponseData(response: Response|Object): any {
    const body = response;
    return body || {};
  }

  // handleError Function
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('some error occured:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    } return throwError(
      'Something bad happened, please try again later'
    );
  }
}



