import { Directive, ElementRef, Input } from '@angular/core';
import { RepoService } from '../services/repo.service';

@Directive({
  selector: '[appFavorit]',
})
export class FavoritDirective {
  @Input() appFavorit!: number;
  data!: any[];
  constructor(private el: ElementRef, private repoService: RepoService) {
    this.repoService.getFavForks().subscribe((d) => {
      if (d.length === 0) {
        el.nativeElement.style.color = '#30a745';
        return;
      }
      for (let i in d) {
        if (d[i].value === this.appFavorit) {
          el.nativeElement.style.color = 'red';
          return;
        }
        el.nativeElement.style.color = '#30a745';
      }
    });
  }
}
