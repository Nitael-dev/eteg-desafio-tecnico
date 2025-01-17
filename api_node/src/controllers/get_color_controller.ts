import { RegisterService } from "../services/register_service";

class GetColorController {
  async handle(request: any, response: any) {
    const { color }: { color: string } = request.params;

    const colorService = new RegisterService();
    const result = await colorService.findAllColor(color);

    return response.json(result);
  }
}

export { GetColorController };
