import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators';
import { map } from 'rxjs/operators';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';

const apiUrl = 'https://filmopedia.herokuapp.com/';
// Get token from local storage for requests
const token = localStorage.getItem('token');
// Get username from localStorage for URLs
const username = localStorage.getItem('user');

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
  constructor(private http: HttpClient) {
  }
  // User Registration (public service)
  public userRegistration(userDetails:any): Observable<any> {
    console.log(userDetails);
    return this.http.post
    (apiUrl + 'users', userDetails)
    .pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('some error occured:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    } return throwError(
      'Could complete the registration process, Please try again later'
    );
  }
  }

// User Login (public service)
export class UserLoginService {
  constructor(private http: HttpClient) { }

public userLogin(userDetails: any): Observable<any> {
  console.log(userDetails);
  return this.http.post(apiUrl + 'login', userDetails)
  .pipe(
    catchError(this.handleError)
  );
  }

private handleError(error: HttpErrorResponse): any {
  if (error.error instanceof ErrorEvent) {
    console.error('Some Error occured: ' + error.error.message);
  } else {
    console.error(
      `Error Status code ${error.status}, ` + 
      `Error body is: ${error.error}`);
  }
  return throwError(
    'Could not complete login process, please try again later'
  )
}
} 


// Get All Movies (private service)
export class GetAllMoviesService {
  constructor(private http:HttpClient) { }
  
  getAllMovies(): Observable<any> {
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      )
  }

  // Non-typed response transaction
  private extractResponseData(res: Response | Object ): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('some error occured:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    } return throwError(
      'Could not load Movies Collection, please try again later'
    );
  }
}


// Get a single movie by Id (private service)
export class GetMovieByIdService {
  constructor(private http:HttpClient) { }

  getMovie(): Observable<any> {
    return this.http.get(apiUrl + 'movies/id/:movieId', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      )
      
  }
  // Non-typed response transaction
  private extractResponseData(res: Response | Object ): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('some error occured:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    } return throwError(
      'Could not load Movie Object, please try again later'
    );
  }
}


// Get a director by name (private service)
export class GetDirectorByNameService {
  constructor(private http:HttpClient) { }

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
  // Non-typed response transaction
  private extractResponseData(res: Response | Object ): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('some error occured:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    } return throwError(
      'Could not get director detail page, please try again later'
    );
  }
}


// Get a genre by name (private service)
export class GetGenreByNameService {
  constructor(private http:HttpClient) { }

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
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('some error occured:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    } return throwError(
      'Could not load genre detail page, please try again later'
    );
  }
  }


// Get a User by username (private service)
  export class GetUserByUsernameService {
    constructor(private http:HttpClient) { }  

  getUser(): Observable<any> {
    return this.http.get(apiUrl + `users/${username}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    ) }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('some error occured:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    } return throwError(
      'Could not load User profile, please try again later'
    );
  }
  }


  // Get the favoritemovies-array of a user (private service)
  export class GetFavoritesOfUserService {
    constructor(private http:HttpClient) { }  

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

  private extractResponseData(res: Response | Object ): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('some error occured:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    } return throwError(
      'Could not load the Favorite Movies Collection, please try again later'
    );
  }}


  // Add a movie to the favoritemovies-array (private service)
  export class PostMovieToFavoritesService {
    constructor(private http:HttpClient) { }  
  
  PostToFavoriteMovies(): Observable<any> {
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
  private extractResponseData(res: Response|Object): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('some error occured:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    } return throwError(
      'Could not add entry to Favorite Movies Collection, please try again later'
    );
  }
  }


  // Edit user profile (private service)
  export class EditUserProfileService {
    constructor(private http:HttpClient) { }
  
  EditUserProfile(): Observable<any> {
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
  private extractResponseData(res: Response|Object): any {
    const body = res;
    return body || {};
  }
  private handleError(error:HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('some error occured: ', error.error.message);
    } else {
      console.error(
        `Error Status Code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    } return throwError(
      'Could not edit user profile, please try again later'
    );
  }
  }

  //Delete user profile (private service)
  export class DeleteUserProfileService {
    constructor(private http:HttpClient) { }

    DeleteUserProfile(): Observable<any> {
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
    private extractResponseData(res: Response|Object): any {
      const body = res;
      return body || {};
    }
    private handleError(error:HttpErrorResponse): any {
      if (error.error instanceof ErrorEvent) {
        console.error('some error occured: ', error.error.message);
      } else {
        console.error(
          `Error Status Code ${error.status}, ` +
          `Error body is: ${error.error}`
        );
      } return throwError(
        'Could not delete user profile, please try again later'
      )
    }
  }


  // Remove a movie from the favoritemovies-array (private service)
  export class RemoveMovieFromFavoritesService {
    constructor(private http:HttpClient) { }  
  
  RemoveFromFavoriteMovies(): Observable<any> {
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
  private extractResponseData(res: Response|Object): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('some error occured:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    } return throwError(
      'Could not remove entry from the favoritemovies collection, please try again later'
    );
  }
  }

  




export class FetchApiDataService {

  constructor() { }
}
