import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Fork } from 'src/app/fork';
import { RepoService } from 'src/app/services/repo.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  collectionSize!: number;
  perPage: number = 10;
  data: Fork[] = [];
  currentPage: number = 1;
  searchParams: any;
  showError: boolean = false;
  errorMessage!: string;
  toggleFav: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private repoService: RepoService
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((par) => {
      this.searchParams = par;
      this.getRepoCount(par);
      this.getRepos(par);
    });
  }
  findRepo(par: any) {
    this.paginator.firstPage();
    this.searchParams = par;
    this.getRepoCount(par);
    this.getRepos(par);
  }
  getRepoCount(par: any) {
    this.repoService.getForksCount(par).subscribe(
      (data: any) => {
        this.collectionSize = data.forks_count;
        this.showError = false;
      },
      (error) => {
        this.showError = true;
        error.status === 404
          ? (this.errorMessage = 'No results found.')
          : error.status === 403
          ? (this.errorMessage = `${error.status} Forbidden`)
          : (this.errorMessage = error.message);
      }
    );
  }
  getRepos(par: any) {
    this.repoService.getRepos(par, this.currentPage, this.perPage).subscribe(
      (data: any) => {
        this.data = data;
        this.showError = false;
      },
      (error) => {
        this.showError = true;
        error.status === 404
          ? (this.errorMessage = 'No results found.')
          : error.status === 403
          ? (this.errorMessage = `${error.status} Forbidden`)
          : (this.errorMessage = error.message);
      }
    );
  }
  goHome() {
    this.router.navigate(['/']);
  }
  onPaginateChange(e: any) {
    this.perPage = e.pageSize;
    this.currentPage = e.pageIndex + 1;
    this.getRepos(this.searchParams);
  }
  toFavorites(data: Fork) {
    this.toggleFav = !this.toggleFav;
    this.repoService.addFavorit(data);
  }
}
