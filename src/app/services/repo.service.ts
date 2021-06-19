import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Fork } from '../fork';

@Injectable({
  providedIn: 'root',
})
export class RepoService {
  database!: AngularFireList<number>;
  favoriteForks!: Observable<any[]>;
  private configUrl: string = 'https://api.github.com/repos';
  constructor(private http: HttpClient, private db: AngularFireDatabase) {
    this.database = db.list('/favoriteForks');
    this.getFavForks();
  }
  collectObject = (_: any) => {
    let object = { value: _.payload._delegate._node.value_, key: _.key };
    return object;
  };
  getFavForks() {
    this.favoriteForks = this.database
      .snapshotChanges()
      .pipe(map((actions) => actions.map(this.collectObject)));
    return this.favoriteForks;
  }
  getForksCount(par: any) {
    return this.http.get(`${this.configUrl}/${par.owner}/${par.repoName}`).pipe(
      catchError((err) => {
        console.error(err.message);
        return throwError(err);
      })
    );
  }
  getRepos(par: any, page: number, perPage: number): Observable<any> {
    return this.http
      .get(
        `${this.configUrl}/${par.owner}/${par.repoName}/forks?page=${page}&per_page=${perPage}`
      )
      .pipe(
        catchError((err) => {
          console.error(err.message);
          return throwError(err);
        })
      );
  }
  addFavorit(data: Fork) {
    let z: any;
    this.favoriteForks.pipe(take(1)).subscribe((d) => {
      z = d.find((i: any) => i.value === data.id);
      if (z) {
        this.database.remove(z.key);
      } else {
        this.database.push(data.id);
      }
    });
  }
}
