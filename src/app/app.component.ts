import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { ArbolService } from './arbol.service';
import { Node } from './node_class';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private raiz: Node | null = null;
  nodes: TreeNode[] = [];
  arboString: string = '';
  hojas: number = 0;

  constructor(private arbolSV: ArbolService) {
    this.loadData();    
  }


  insertAction() {
    if (this.raiz === null) {
      const dato = prompt("Por favor ingrese el valor de la raiz");
      if (dato === null) {
        alert("Debe ingresar un dato valido");
      } else {
        this.raiz = this.arbolSV.insertarRaiz(this.raiz, dato);
      }
    } else {
      const dato = prompt("Por favor ingrese el valor a insertar");
      const datoPadre = prompt("Por favor ingrese el valor del padre.");
      if (dato === null || datoPadre === null) {
        alert("Debe ingresar un datos validos");
      } else {
        this.raiz = this.arbolSV.insertar(this.raiz, dato, datoPadre);
      }
    }
    this.loadData(); 
  }

  private loadData() {
    this.nodes = this.arbolSV.mostrarArbol(this.raiz);
    this.hojas = this.arbolSV.contarHojas(this.raiz);
    this.arboString = this.arbolSV.mostrarString(this.raiz);
  }
}


