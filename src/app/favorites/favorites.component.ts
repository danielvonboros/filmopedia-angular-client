// core modules
import { Component, OnInit } from '@angular/core';

// custom components
import { FetchDataApiService } from '../fetch-api-data.service';
// import MovieGenre / MovieDirector / MovieSynopsis

// material modules
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})

const user = localStorage.getItem('username');

export class FavoritesComponent implements OnInit {
  // isLoading: false;
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
    // this.isLoading: true
    this.fetchApiData.getAllMovies().subscribe((resp:any) => {
      // this.isLoading: false
      this.movies = resp;
      console.log(this.movies);
    })
  }

  getUsersFavs(): void {
    this.fetchApiData.getUser(user).subscribe((resp:any) => {
      this.favs = resp.favoritemovies;
      console.log(this.favs);
      return this.favs;
    })
  }

}
