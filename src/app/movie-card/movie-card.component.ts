// core modules
import { Component, OnInit } from '@angular/core';

// custom modules
import { FetchDataApiService } from '../fetch-api-data.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';

// material modules
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

//declare
const user = localStorage.getItem('username');

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {
  user: any = {};
  favorites: any = [];
  movies: any[] = [];
  favs: any[] = [];
  
  constructor(
    public fetchApiData: FetchDataApiService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getUsersFavs();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  getUsersFavs(): void {
    this.fetchApiData.getUser(user).subscribe((resp:any) => {
      this.favs = resp.favoritemovies;
      console.log(this.favs, 'favs');
      return this.favs;
    })
  }

  openGenre(name:string, description:string): void {
    this.dialog.open(GenreCardComponent, {
      data: {name, description},
      width: '500px'
    });
  }

  openDirector(name:string, bio:string, birthYear:number, deathYear:number): void {
    this.dialog.open(DirectorCardComponent, {
      data: {name, bio, birthYear, deathYear},
      width: '500px'
    });
  }

  openSynopsis(title:string, imageUrl:any, description:string, year:number): void {
    this.dialog.open(SynopsisCardComponent, {
      data: {title, imageUrl, description, year},
      width: '500px'
    });
  }

  addToUserFavorites(id:string, title:string): void {
    this.fetchApiData.addToFavoriteMovies(id).subscribe((resp: any) => {
      this.snackBar.open(`${title} has been added to your favorites.`, 'OK', {
        duration: 3000,
      })
      setTimeout(function() {
        window.location.reload()}, 3000);
    });
    return this.getUsersFavs();
  }

  removeFromUserFavorites(id:string, title:string): void {
    this.fetchApiData.removeFromFavoriteMovies(id).subscribe((resp: any) => {
      this.snackBar.open(`${title} has been removed from your favorites.`, 'OK', {
        duration: 3000,
      })
      setTimeout(function() {
        window.location.reload()}, 3000);
    });
    return this.getUsersFavs();
  }

  setFavStatus(id: any): any {
    if (this.favs.includes(id)) {
      return true;
    } else {
      return false;
    }
  }

}
