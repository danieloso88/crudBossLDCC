import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {PerrosService} from "../../services/perros.service";
import {ToastrService} from "ngx-toastr";
import {Dayjs} from "dayjs";
import * as dayjs from "dayjs";
import {Observable} from "rxjs";

@Component({
  selector: 'app-list-perros',
  templateUrl: './list-perros.component.html',
  styleUrls: ['./list-perros.component.css'],
})
export class ListPerrosComponent implements OnInit {
  invalidDates: dayjs.Dayjs[] = [];
  tooltips = [
    {date: dayjs(), text: 'No se puede seleccionar'},
    {date: dayjs().add(2, 'days'), text: 'Yeeeees!!!'}
  ];
  ranges: any = {
    'Mes en curso': [dayjs().startOf('month'), dayjs().endOf('month')],
    'Mes pasado': [dayjs().subtract(1, 'month').startOf('month'), dayjs().subtract(1, 'month').endOf('month')],
    'Año en curso': [dayjs().subtract(1, 'years').startOf('year'), dayjs()],
    'Año pasado': [dayjs().subtract(1, 'years').startOf('year'), dayjs().subtract(1, 'years').endOf('year')],
    'Hace 2 años': [dayjs().subtract(2, 'years').startOf('year'), dayjs().subtract(2, 'years').endOf('year')],
    'Hace 3 años': [dayjs().subtract(3, 'years').startOf('year'), dayjs().subtract(3, 'years').endOf('year')],
    'Hace 4 años': [dayjs().subtract(4, 'years').startOf('year'), dayjs().subtract(4, 'years').endOf('year')],
    'Hace 5 años': [dayjs().subtract(5, 'years').startOf('year'), dayjs().subtract(5, 'years').endOf('year')],

  };
  invalidDate: moment.Moment[] = [moment().add(2, 'days'), moment().add(3, 'days'), moment().add(5, 'days')];

  isInvalidDate = (m: moment.Moment) => {
    return this.invalidDate.some(d => d.isSame(m, 'day'))
  }
  selected: any;
  perros: any[] = [];


  constructor(private _perrosService: PerrosService,
              private toastr: ToastrService,
  ) {

  }

  ngOnInit(): void {
    this.getPerros();
  }


  getPerros() {
    this._perrosService.getPerros().subscribe(data => {
      this.perros = [];
      data.forEach((element: any) => {
        var date = new Date(element.payload.doc.data()["fechaNacimiento"].seconds * 1000);
        var edad = moment().diff(date, 'years');
        var time = " años";
        var ultimaVacuna = new Date(element.payload.doc.data()["ultimaVacuna"].seconds * 1000);
        var proximaVacuna = dayjs(ultimaVacuna).add(10, 'months').locale('es-mx').format("YYYY-MM-DD");
        if (edad == 0) {
          edad = moment().diff(date, 'months');
          time = " meses"
          if (edad == 0) {
            edad = moment().diff(date, 'days');
            time = " días";
          }
        }

        this.perros.push({
          id: element.payload.doc.id,
          nombre: element.payload.doc.data().nombre,
          raza: element.payload.doc.data().raza,
          color: element.payload.doc.data().color,
          fechaNacimiento: moment(date).format('LL'),
          ultimaVacuna: moment(ultimaVacuna).format('LL'),
          proximaVacuna: moment(proximaVacuna).format('LL'),
          edad: edad + time

        })
        ;
      });
      console.log(this.perros);
    });
  }

  getPerrosFecha() {
    var starDate = this.selected.startDate['$d'];
    var endDate = this.selected.endDate['$d'];

    this._perrosService.getPerrosFecha(new Date(starDate), new Date(endDate)).subscribe(data => {
      this.perros = [];
      data.forEach((element: any) => {
        var date = new Date(element.payload.doc.data()["fechaNacimiento"].seconds * 1000);
        var edad = moment().diff(date, 'years');
        var time = " años";
        var ultimaVacuna = new Date(element.payload.doc.data()["ultimaVacuna"].seconds * 1000);
        var proximaVacuna = dayjs(ultimaVacuna).add(10, 'months').locale('es-mx').format("YYYY-MM-DD");
        if (edad == 0) {
          edad = moment().diff(date, 'months');
          time = " meses"
          if (edad == 0) {
            edad = moment().diff(date, 'days');
            time = " días";
          }
        }

        this.perros.push({
          id: element.payload.doc.id,
          nombre: element.payload.doc.data().nombre,
          raza: element.payload.doc.data().raza,
          color: element.payload.doc.data().color,
          fechaNacimiento: moment(date).format('LL'),
          ultimaVacuna: moment(ultimaVacuna).format('LL'),
          proximaVacuna: moment(proximaVacuna).format('LL'),
          edad: edad + time

        })
        ;
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
