import { Directive, ElementRef, Input, ViewContainerRef } from '@angular/core';
import { RepoService } from './services/repo.service';

@Directive({
  selector: '[appFavorit]',
})
export class FavoritDirective {
  @Input() appFavorit!: number;
  data!: any[];
  constructor(
    private el: ElementRef,
    private view: ViewContainerRef,
    private repoService: RepoService
  ) {
    this.repoService.getFavForks().subscribe((d) => {
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
