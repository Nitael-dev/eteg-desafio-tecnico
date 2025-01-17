import { RegisterService } from "../services/register_service";

class GetColorController {
  async handle(request: any, response: any) {
    const { color }: { color: string } = request.params;

    const authenticateUserService = new RegisterService();
    const result = await authenticateUserService.findAllColor(color);

    return response.json(result);
  }
}

export { GetColorController };
