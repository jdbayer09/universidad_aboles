export class Node {
  private _value: string | null;

  private _sw: boolean;

  private _liga: Node | null;

  private _ligaLista: Node | null;


  constructor(val: string | any) {
    this._value = val;
    this._sw = false;
    this._liga = null;
    this._ligaLista = null;
  }  

  public get value(): string | null {
    return this._value;
  }
  public set value(value: string | null) {
    this._value = value;
  }
  public get sw(): boolean {
    return this._sw;
  }
  public set sw(value: boolean) {
    this._sw = value;
  }
  public get liga(): Node | null {
    return this._liga;
  }
  public set liga(value: Node | null) {
    this._liga = value;
  }
  public get ligaLista(): Node | null {
    return this._ligaLista;
  }
  public set ligaLista(value: Node | null) {
    this._ligaLista = value;
  }
}