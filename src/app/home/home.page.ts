import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  nombre: string ="";
    año: string = "";
    info: string = "";

    dataSend: DatosX = {
      Nombre: "Luke Skywalker",
      Año: "19BBY"
}

constructor(
      private fire: AngularFirestore,
      private http: HttpClient){
        this.fire.collection<DatosX>("/examen/")
        .valueChanges()
        .subscribe((data)=>{
          console.log(data);
          this.nombre = data[1].Nombre;
          this.año = data[1].Año;


        });
      }
      save(){
        let idDoc =this.fire.createId();
        this.fire.doc("/examen/" + idDoc)
        .set(this.dataSend);

      }
      consulta(){
        this.http.
        get("https://swapi.co/api/people/").subscribe((data:any)=>{
          console.log("users: ", data.results);
      });
}

}


interface DatosX {
    Nombre?: string;
    Año?: string;
}
