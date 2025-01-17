import { RegisterService } from "../services/register_service";

class GetRegisterController {
  async handle(request: any, response: any) {
    const { id }: { id: string } = request.params;

    const getRegisterService = new RegisterService();

    const result = await getRegisterService.findOne(id);

    return response.json(result);
  }
}

export { GetRegisterController };
