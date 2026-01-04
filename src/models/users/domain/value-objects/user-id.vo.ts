import { randomUUID } from 'crypto';

export class UserId {
  //Declara un value object, no tiene identidad propia y representa un valor.
  private readonly value: string;

  constructor(id?: string) {
    this.value = id || randomUUID(); //Si no se pasa id, crea uno aleatorio
  }

  getValue(): string {
    return this.value;
  }
  equals(other: UserId) {
    return this.value === other.value;
  }
}
