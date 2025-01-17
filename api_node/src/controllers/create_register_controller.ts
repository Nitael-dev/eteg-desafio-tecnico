import { RegisterService } from "../services/register_service";

interface CreateRegisterControllerProps {
  full_name: string;
  cpf: string;
  email: string;
  color: string;
  observation?: string;
}

class CreateRegisterController {
  async handle(request: any, response: any) {
    const {
      full_name,
      cpf,
      email,
      color,
      observation,
    }: CreateRegisterControllerProps = request.body;

    const registerService = new RegisterService();

    const findedCpf = await registerService.findOne(cpf);
    const findedEmail = await registerService.findOne(email);

    if (!!findedCpf?.id && !!findedEmail?.id) {
      if (findedCpf.cpf === cpf && findedCpf.email === email) {
        const result = await registerService.updateOne({
          full_name,
          cpf,
          email,
          color,
          observation,
        });

        return response.status(200).json(result);
      }
    }

    if (!!findedCpf?.id && !findedEmail?.id) {
      return response.status(409).json({
        status: "error",
        message: "E-mail/CPF já cadastrado na plataforma!",
      });
    }

    if (!findedCpf?.id && !!findedEmail?.id) {
      return response.status(409).json({
        status: "error",
        message: "E-mail/CPF já cadastrado na plataforma!",
      });
    }

    if (findedCpf?.id !== findedEmail?.id) {
      return response.status(409).json({
        status: "error",
        message: "E-mail/CPF já cadastrado na plataforma!",
      });
    }

    const result = await registerService.create({
      full_name,
      cpf,
      email,
      color,
      observation,
    });

    return response.status(201).json(result);
  }
}

export { CreateRegisterController };
