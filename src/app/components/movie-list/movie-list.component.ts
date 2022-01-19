import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/interfaces/movie.interface';
import { MovieListService } from 'src/app/services/movie-list.service.ts.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit, OnDestroy, AfterViewInit {
  public moviesSub!: Subscription;
  public movies!: Movie[];
  public dataSource!: MatTableDataSource<Movie>;
  public displayedColumns: string[] = [
    'id',
    'name',
    'genre1',
    'genre2',
    'year',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private movieService: MovieListService,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  ngOnInit(): void {
    this.getMovie();
  }

  ngAfterViewInit(): void {
    let timeClear = setTimeout(() => {
      clearTimeout(timeClear);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 500);
  }

  getMovie(): void {
    this.moviesSub = this.movieService.getMovies().subscribe((res: Movie[]) => {
      this.dataSource = new MatTableDataSource(res);
      this.movies = res;
    });
  }

  applySearch(event: Event) {
    const searchValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = searchValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  sortMovies(event: any) {
    const sortMovies: any = this.movies.slice();
    let sortedMovies = [];

    sortedMovies = sortMovies.sort((a: any, b: any) => {
      switch (event) {
        case 'name from A to Z':
          return this.compare(a.name, b.name, true);
        case 'name from Z to A':
          return this.compare(a.name, b.name, false);
        case 'earliest year':
          return this.compare(+a.year, +b.year, true);
        case 'latest year':
          return this.compare(+a.year, +b.year, false);
        case 'unsort':
          return this.getMovie();
        default:
          return 0;
      }
    });
    this.dataSource = new MatTableDataSource(sortedMovies);
  }

  private compare(a: string | number, b: string | number, isAbc: boolean) {
    return (a < b ? -1 : 1) * (isAbc ? 1 : -1);
  }

  ngOnDestroy(): void {
    if (this.moviesSub) {
      this.moviesSub.unsubscribe();
    }
  }
}
