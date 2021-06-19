import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @Output() serach = new EventEmitter();

  constructor(private router: Router) {}

  findRepo(value: string) {
    let params: string[] = value.split('/');
    if (this.router.url === '/') {
      this.router.navigate(['search-result'], {
        queryParams: { owner: params[0], repoName: params[1] },
      });
      return;
    }
    this.serach.emit({ owner: params[0], repoName: params[1] });
  }
}
