import { RegisterService } from "../services/register_service";

class GetRegisterController {
  async handle(request: any, response: any) {
    const { id }: { id: string } = request.params;

    const authenticateUserService = new RegisterService();

    const result = await authenticateUserService.findOne(id);

    return response.json(result);
  }
}

export { GetRegisterController };
