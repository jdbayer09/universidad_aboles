import { Injectable } from '@angular/core';
import { Node } from './node_class';
import { TreeNode } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ArbolService {

  private ant: Node | any = null;
  private raiz: Node | any = null;

  constructor() { }


  mostrarString(n: Node | null): string {
    let resp = '';
    let p: Node | null = n;
    while(p !== null) {
      if (p.sw) {
        resp = resp + ' ' + this.mostrarString(p.ligaLista);
      } else {
        resp = resp + ' ' + p.value;
      }
      p = p.liga;
    }
    return resp;
  }

  insertarRaiz(r: Node | null, dato: string): Node | null {
    if (r === null) {
      return new Node(dato.toUpperCase());
    } else {
      alert('Ya hay una raiz');
      return null;
    }
  }

  insertar(r: Node | null, dato: string, datoPadre: string): Node | null {
    if (r === null) {
      alert('No se ha registrado raiz.');
      return r;
    }

    if (this.encontrarValor(dato, r) !== null) {
      alert(`El dato ${dato.toUpperCase()} ya se encuentra registrado.`);
      return r;
    }

    this.ant = null;
    const padre: Node | null = this.encontrarValor(datoPadre, r);
    if (padre === null) {
      alert('El padre ingresado no existe');
      return r;
    }

    let newNodo: Node = new Node(dato.toUpperCase());

    if (padre === r || (this.ant.sw && this.ant.ligaLista.value === datoPadre.toUpperCase()) ){ 
      let x: Node | null = padre;
      while (x.liga !== null) {
        x = x?.liga;
      }
      x.liga = newNodo;
    } else {
      let padreNew = new Node(padre.value?.toUpperCase());
      padreNew.liga = newNodo;

      padre.sw = true;
      padre.value = null;
      padre.ligaLista = padreNew;
    }

    return r;
  }

  private encontrarValor(dato: string, n: Node | null): Node | null {
    if (n === null) return null;
    if (n.value !== null && n.value === dato.toUpperCase()) {
      return n;
    }
    this.ant = n;
    let p: Node | null = n.liga;
    let resp: Node | null = null;
    while(p !== null) {
      if (p.sw) {
        this.ant = p;
        resp = this.encontrarValor(dato, p.ligaLista);
        if (resp !== null) {
          break;
        }
      } else {
        if (p.value === dato.toUpperCase()) {
          resp = p;
          break;
        }
      }      
      this.ant = p;
      p = p.liga;
    }
    return resp;
  }

  contarHojas(r: Node | null): number {
    if (r === null) return 0;
    if (r.liga === null && r.ligaLista === null) return 1;
    return this.contarHojasAction(r);
  }

  private contarHojasAction(n: Node | null): number {
    let resp = -1;
    let p: Node | null = n;
    while(p !== null) {
      resp++;
      if (p.sw) {
        resp = resp + this.contarHojasAction(p.ligaLista) - 1;
      }      
      p = p.liga;
    }
    return resp;
  }

  mostrarArbol(raiz: Node | null): TreeNode[] {
    if (raiz === null) return [];
    return [
      {
        key: raiz?.value ? raiz?.value : '',
        label: raiz?.value ? raiz?.value : '',
        expanded: true,
        children: this.mostrarArbolAction(raiz?.liga)
      }
    ];
  }

  private mostrarArbolAction(n: Node | any): TreeNode[] {
    let resp: TreeNode[] = [];
    let p: Node | any = n;
    while(p !== null) {
      if (p.sw) {
        resp.push({
          key: p.ligaLista?.value ? p.ligaLista?.value : '',
          label: p.ligaLista?.value ? p.ligaLista?.value : '',
          expanded: true,
          children: this.mostrarArbolAction(p.ligaLista && p.ligaLista.liga ? p.ligaLista.liga : null)
        });
      } else {
        resp.push({
          key: p.value ? p.value : '',
          label: p.value ? p.value : '',
          expanded: true,
        });
      }
      p = p.liga;
    }
    return resp;
  }

}
