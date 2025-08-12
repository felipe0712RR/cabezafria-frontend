import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  BASE_URL: string = environment.apiURL;

  constructor() { }

  cartUpdateWindow( title: string ) {
    Swal.fire({
      position: "bottom-end",
      icon: "success",
      title,
      showConfirmButton: false,
      timer: 1500
    });
  }

  cartUpdateErrorWindow( text: string ) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text,
      footer: '<a href="#">Why do I have this issue?</a>'
    });
  }
}
