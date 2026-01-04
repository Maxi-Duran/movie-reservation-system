export class Password {
  private readonly value: string;

  constructor(password: string) {
    if (!this.isValidPassword(password)) {
      throw new Error('Invalid password');
    }
    this.value = password;
  }

  private isValidPassword(password: string): boolean {
    return password.length >= 8;
  }

  getValue(): string {
    return this.value;
  }

  equals(other: Password) {
    return this.value === other.value;
  }
}
