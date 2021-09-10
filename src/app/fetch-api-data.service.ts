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



@Injectable({
  providedIn: 'root'
})

export class FetchDataApiService {

  // Inject the HttpClient module to the constructor params
  constructor(private http:HttpClient, private router:Router) {}


  /**
   * Registration to the API
   * @param userDetails  
   * @returns status message: success/error
   */
  public userRegistration(userDetails:any): Observable<any> {
    console.log(userDetails);
    return this.http.post
    (apiUrl + 'users', userDetails)
    .pipe(
      catchError(this.handleError)
    );
  }
  
/**
 * Login to the Application
 * @param userDetails 
 * @returns status message: success/error
 */
  public userLogin(userDetails: any): Observable<any> {
  console.log(userDetails);
  return this.http.post(apiUrl + 'login', userDetails)
  .pipe(
    catchError(this.handleError)
  );
  }


/**
 * Get all movies method
 * @returns array of movies
 */
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

/**
 * Get one particular movie
 * Method handled by website, movie cards contain data
 * @returns Object - data about a single movie
 */
  getMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/id/:movieId', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      )
      
  }
 

/**
 * Get a director
 * @returns Object - data about the director of a movie
 */
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/director/:name', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer '+ token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }
  

/**
 * Get a genre
 * @returns Object - data about genre of a movie
 */
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre/:name', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }
  

/**
 * Get one user by username
 * @param username 
 * @returns Object - data about a user
 */
  getUser(username:any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `users/${username}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    ) }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }


  /**
   * @param username (Injected automatically, username extracted from login params)
   * @returns Array - favoritemovies of a user
   */
  getFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
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


  /**
   * 
   * @param id, username (Injected automatically, username extracted from login params)
   * @returns status message: success/error
   */
  addToFavoriteMovies(id:string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username')
    console.log(token, 'token from addToFavoriteMovies POST request')
    return this.http.post(apiUrl + 'users/' + username + '/favoritemovies/' + id, null,
    {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  } 


  /**
   * Update user information
   * @param userData, username (Injected automatically, username extracted from login params)
   * @returns status message: success/error
   */
  editUserProfile(userData:any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http.put(apiUrl + `users/${username}`, userData,
    {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token, 
      }
      )}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      )
  }
  

  /**
   * Delete user account
   * @params username (Injected automatically, username extracted from login params)
   * @returns status message
   */
    deleteUserProfile(): Observable<any> {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username');
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
  removeFromFavoriteMovies(id:string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username')
    return this.http.delete(apiUrl + 'users/' + username + '/favoritemovies/' + id,
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



