import db from "../db/index";
import { RegisterRepository } from "../repository/register_repository";

interface RegisterServiceProps {
  full_name: string;
  cpf: string;
  email: string;
  color: string;
  observation?: string;
}

class RegisterService {
  async create({
    full_name,
    cpf,
    email,
    color,
    observation,
  }: RegisterServiceProps) {
    const { createRegister } = new RegisterRepository();

    const result = await db.query(createRegister, [
      full_name,
      cpf,
      email,
      color,
      observation,
    ]);

    return result.rows[0];
  }

  async findOne(value: string) {
    const { findOneRegister } = new RegisterRepository();

    const result = await db.query(findOneRegister, [value]);

    return result.rows.length !== 0 ? result.rows[0] : false;
  }

  async findAllColor(color: string) {
    const { findAllColor } = new RegisterRepository();

    const result = await db.query(findAllColor, [color]);

    return result.rows.length;
  }

  async updateOne({
    full_name,
    cpf,
    email,
    color,
    observation,
  }: RegisterServiceProps) {
    const { updateOneRegister } = new RegisterRepository();

    const result = await db.query(updateOneRegister, [
      full_name,
      cpf,
      email,
      color,
      observation,
    ]);

    return result.rows[0];
  }
}

export { RegisterService };
