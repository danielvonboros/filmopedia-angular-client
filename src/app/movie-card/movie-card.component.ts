// core modules
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

// custom modules
import { FetchDataApiService } from '../fetch-api-data.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {
  movies: any = [];
  constructor(
    public fetchApiData: FetchDataApiService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
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

}
