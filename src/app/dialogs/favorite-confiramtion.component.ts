import { Component } from '@angular/core';
@Component({
  selector: 'app-favorite-dialog',
  template: `<div>
    <h2>are you sure ?</h2>
    <button class="btn btn-primary" mat-button mat-dialog-close>No</button>
    <button
      class="btn btn-success"
      mat-button
      [mat-dialog-close]="true"
      cdkFocusInitial
    >
      Yes
    </button>
  </div>`,
  styles: ['div{width: 200px; text-align: center}', '.btn {margin:5px}'],
})
export class FavoriteConfirmationDialog {}
