import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { RaceInfo, Race } from '../services/data.model'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.scss']
})

export class RacesComponent implements OnInit {

  @Input() raceInjected: string;

  public race: string;

  raceDoc: AngularFirestoreDocument<RaceInfo>;
  raceObservable: Observable<RaceInfo>;
  raceInfo: RaceInfo;
  raceParentDoc: AngularFirestoreDocument<Race>;
  raceParentObservable: Observable<Race>;
  raceParent: any;

  constructor(
    private _route: ActivatedRoute,
    private router: Router,
    private afStore: AngularFirestore
  ) {
  }

  ngOnInit() {
    if(!this.raceInjected)
      this.race = this._route.snapshot.params['raceName'];
    else 
      this.race = this.raceInjected;
    
    this.raceDoc = this.afStore.doc(`races/${this.race}/race/content`);
    this.raceObservable = this.raceDoc.valueChanges();
    this.raceObservable.subscribe(doc => {
      this.raceInfo = doc;
    })
    this.raceParentDoc = this.afStore.doc(`races/${this.race}`);
    this.raceParentObservable = this.raceParentDoc.valueChanges();
    this.raceParentObservable.subscribe(doc => {
      this.raceParent = doc;
    })
  }

  edit() {
    this.router.navigate(['/create', 'race'], {state: {race: this.raceInfo, parent: this.raceParent}});
  }

}
