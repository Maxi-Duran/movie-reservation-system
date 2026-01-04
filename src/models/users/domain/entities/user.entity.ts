import { UserId } from '../value-objects/user-id.vo';
import { Email } from '../value-objects/email.vo';
import { Password } from '../value-objects/password.vo';
export class User {
  constructor(
    private readonly id: UserId, //ReadOnly evita que se puedan modificar las propiedades
    private name: string,
    private lastName: string,
    private role: string,
    private password: Password,
    private email: Email, // Value Object que garantiza que el email sea válido e inmutable
    private readonly createdAt: Date,
    private updatedAt: Date,
  ) {}

  static create(
    // el metodo static es para aplicar reglas antes de crear el objeto
    name: string,
    email: string,
    lastName: string,
    password: string,
    role: string,
  ) {
    if (!name || name.trim().length === 0) {
      throw new Error('Name is required');
    }
    if (!email || email.trim().length === 0) {
      throw new Error('Email is required');
    }
    if (!name || name.trim().length < 2) {
      throw new Error('Name must be at least 2 characters');
    }
    return new User(
      new UserId(),
      name.trim(),
      lastName,
      role,
      new Password(password),
      new Email(email), //Convierte string a value object, si es invalido lanza error, nunca existe un email invalido en el dominio
      new Date(),
      new Date(),
    );
  }

  getId(): UserId {
    return this.id;
  }
  getName(): string {
    return this.name;
  }
  getLastName(): string {
    return this.lastName;
  }
  getRole(): string {
    return this.role;
  }
  getPassword(): Password {
    return this.password;
  }
  getEmail(): Email {
    return this.email;
  }
  getCreatedAt(): Date {
    return this.createdAt;
  }
  getUpdatedAt(): Date {
    return this.updatedAt;
  }
  updateName(name: string) {
    if (!name || name.trim().length === 0) {
      throw new Error('Name is required');
    }
    if (!name || name.trim().length < 2) {
      throw new Error('Name must be at least 2 characters');
    }
    this.name = name;
    this.updatedAt = new Date();
  }

  updateEmail(email: string) {
    if (!email || email.trim().length === 0) {
      throw new Error('Email is required');
    }
    this.email = new Email(email);
    this.updatedAt = new Date();
  }

  updatePassword(password: string) {
    if (!password || password.trim().length === 0) {
      throw new Error('Password is required');
    }
    if (!password || password.trim().length < 8) {
      throw new Error('Password must be at least 8 characters');
    }
    this.password = new Password(password);
    this.updatedAt = new Date();
  }

  updateRole(role: string) {
    if (!role || role.trim().length === 0) {
      throw new Error('Role is required');
    }
    this.role = role;
    this.updatedAt = new Date();
  }

  getAccountAge(): number {
    return Math.floor(
      (new Date().getTime() - this.createdAt.getTime()) / (1000 * 3600 * 24),
    );
  }
}
