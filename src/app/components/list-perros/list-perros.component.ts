import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {PerrosService} from "../../services/perros.service";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-list-perros',
  templateUrl: './list-perros.component.html',
  styleUrls: ['./list-perros.component.css'],
})
export class ListPerrosComponent implements OnInit {
  perros: any[] = [];


  constructor(private _perrosService: PerrosService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getPerros();
  }

  getPerros() {
    this._perrosService.getPerros().subscribe(data => {
      this.perros = [];
      data.forEach((element: any) => {
        var date = new Date(element.payload.doc.data()["fechaNacimiento"].seconds * 1000);
        var edad = moment(date, "YYYYMMDD").fromNow();
        edad = edad.replace("hace", "");
        console.log(date)
        this.perros.push({
          id: element.payload.doc.id,
          nombre: element.payload.doc.data().nombre,
          raza: element.payload.doc.data().raza,
          color: element.payload.doc.data().color,
          fechaNacimiento: moment(date).format('LL'),
          edad: edad
          //  ...element.payload.doc.data()
        });
      });
      console.log(this.perros);
    });
  }

  deletePerro(id: string) {
    this._perrosService.deletePerro(id).then(() => {
      this.toastr.error("El perrito fue eliminado con éxito", "Perrito eliminado", {positionClass: 'toast-center-center'}),

        console.log("empleado eliminado con exito");
    }).catch(error => {
      console.log(error);
    });
  }

}
