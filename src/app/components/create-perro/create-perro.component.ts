import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PerrosService} from "../../services/perros.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import * as moment from "moment";


@Component({
  selector: 'app-create-perro',
  templateUrl: './create-perro.component.html',
  styleUrls: ['./create-perro.component.css'],

})
export class CreatePerroComponent implements OnInit {

  createPerro: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  titulo = 'Agregar Perrito';
  btnAddUpd = 'Agregar';

  constructor(private fb: FormBuilder,
              private _perroService: PerrosService,
              private router: Router,
              private toastr: ToastrService,
              private aRoute: ActivatedRoute) {
    this.createPerro = this.fb.group({
      nombre: ['', Validators.required],
      raza: ['', Validators.required],
      color: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      ultimaVacuna: ['', Validators.required],
    });
    this.id = this.aRoute.snapshot.paramMap.get('id');

  }

  ngOnInit(): void {
    this.isEdit();

  }


  addEditPerro() {
    this.submitted = true;
    this.loading = true;
    if (this.createPerro.invalid) {
      return;
    }
    if (this.id == null) {
      this.addPerro();
    } else {
      this.editPerro(this.id);
    }
  }

  addPerro() {

    const perro: any = {
      nombre: this.createPerro.value.nombre,
      raza: this.createPerro.value.raza,
      color: this.createPerro.value.color,
      fechaNacimiento: this.createPerro.value.fechaNacimiento,
      ultimaVacuna: this.createPerro.value.ultimaVacuna,
      fechaRegistro: new Date(),
      fechaActualizacion: new Date()

    }
    this._perroService.addPerro(perro).then(() => (
      console.log("Perrito agregado con éxito"),
        this.toastr.success("El perrito fue agregado con éxito", "Perrito registrado", {positionClass: 'toast-center-center'}),
        this.router.navigate(['list-perros'])
    )).catch(error => {
        console.log(error);
        this.toastr.error("Ocurrió un error, intente de nuevo", "Perrito no registrado", {positionClass: 'toast-center-center'}),
          this.loading = false;

      }
    )

  }

  editPerro(id: string) {
    const perro: any = {
      nombre: this.createPerro.value.nombre,
      raza: this.createPerro.value.raza,
      color: this.createPerro.value.color,
      fechaNacimiento: this.createPerro.value.fechaNacimiento,
      ultimaVacuna: this.createPerro.value.ultimaVacuna,
      fechaActualizacion: new Date()

    }
    this.loading = true;
    this._perroService.updatePerro(id, perro).then(() => {
      this.loading = false;
      this.toastr.info("Perrito modificado con éxito", "Perrito Modificado", {positionClass: 'toast-center-center'})
      this.router.navigate(['list-perros'])
    });
  }

  isEdit() {
    if (this.id !== null) {
      this.titulo = 'Editar Perrito';
      this.btnAddUpd = 'Actualizar';
      this._perroService.getPerro(this.id).subscribe(data => {
        var date = new Date(data.payload.data()["fechaNacimiento"].seconds * 1000);
        var ultimaVacuna = new Date(data.payload.data()["ultimaVacuna"].seconds * 1000);
        this.createPerro.setValue({
          nombre: data.payload.data()["nombre"],
          raza: data.payload.data()["raza"],
          color: data.payload.data()["color"],
          fechaNacimiento: date,
          ultimaVacuna: ultimaVacuna,
        })
      })
    }
  }

}
