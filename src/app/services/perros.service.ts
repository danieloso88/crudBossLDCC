import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PerrosService {

  constructor(private firestore: AngularFirestore) {
  }

  addPerro(perro: any): Promise<any> {
    return this.firestore.collection('perros').add(perro);
  }

  getPerros(): Observable<any> {
    return this.firestore.collection('perros').snapshotChanges()
  }

  deletePerro(id: string): Promise<any> {
    return this.firestore.collection('perros').doc(id).delete();
  }

  getPerro(id: string): Observable<any> {
    return this.firestore.collection('perros').doc(id).snapshotChanges();
  }

  getPerrosFecha(starDate: string, endDate: string): Observable<any> {
    return this.firestore
      .collection('perros',
        ref => ref.where('fechaNacimiento', '>=', starDate)
          .where('fechaNacimiento', '>=', endDate)).snapshotChanges();
  }

  updatePerro(id: string, perro: any): Promise<any> {
    return this.firestore.collection('perros').doc(id).update(perro);
  }
}
