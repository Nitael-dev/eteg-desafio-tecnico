import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { clearDocument } from "../utils/clearDocument";
import { isCPFValid } from "../utils/isCPFValid";
import { useReducer, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../utils/axiosConfig";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { TooltipColor } from "@/components/TooltipColor";

const CPFRegex = /^\d{11}$/;

const baseSchema = z.object({
  cpf: z
    .string({
      required_error: "O CPF é obrigatório",
      invalid_type_error: "O CPF inserido é inválido",
    })
    .min(1, { message: "O CPF é obrigatório" })
    .regex(CPFRegex, "O CPF inserido é inválido")
    .transform(clearDocument)
    .refine(isCPFValid, {
      message: "O CPF inserido é inválido",
    }),
  observation: z.string().optional(),
  full_name: z
    .string({
      required_error: "Por favor insira seu nome completo",
    })
    .min(1, {
      message: "Por favor insira seu nome completo",
    }),
  email: z
    .string({
      required_error: "Por favor insira seu e-mail",
    })
    .min(1, {
      message: "Por favor insira seu e-mail",
    })
    .email({
      message: "O e-mail inserido é inválido",
    }),
  color: z.string({
    required_error: "Por favor selecione uma cor",
  }),
});

function formatCPF(cpf: string): string {
  if (!cpf) return "";
  return cpf
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export type FormSchema = z.infer<typeof baseSchema>;

export interface RegisterResponse extends FormSchema {
  id: string;
}

function MainForm() {
  const navTo = useNavigate();

  const { toast } = useToast();

  const form = useForm<FormSchema>({
    resolver: zodResolver(baseSchema),
  });

  const [cpf, setCpf] = useReducer((_: unknown, next: string) => {
    return formatCPF(next);
  }, formatCPF(""));
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(
    realChangeFn: (agr1: string) => void,
    formattedValue: string
  ) {
    const digits = formattedValue.replace(/\D/g, "");
    realChangeFn(digits);
  }

  async function submit(e: FormSchema) {
    setIsLoading(true);
    if (isLoading) {
      return;
    }
    let id = "";
    try {
      const { data, status } = await api.post<RegisterResponse>("/register", {
        full_name: e.full_name,
        cpf: e.cpf,
        email: e.email,
        color: e.color,
        observation: e.observation,
      });
      id = data.id;
      setTimeout(
        () =>
          toast({
            title:
              status === 201 ? "Cadastro realizado!" : "Cadastro atualizado!",
            style: {
              backgroundColor: "green",
            },
          }),
        500
      );
      setTimeout(() => {
        setIsLoading(false);
        navTo(`/view/${id}`);
      }, 1500);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch ({ response: { data }, status }: any) {
      if (status === 409) {
        toast({
          variant: "destructive",
          title: "Dados cadastrais encontrados!",
          description: data.message,
        });
      }
      setTimeout(() => setIsLoading(false), 1000);
    }
  }

  const progressHelper = () => {
    if (form.control.getFieldState("full_name").isDirty) {
      if (form.getValues().cpf?.length > 10) {
        if (form.control.getFieldState("email").isDirty) {
          if (form.control.getFieldState("color").isDirty) {
            if (form.control.getFieldState("observation").isDirty) {
              return 95;
            }
            return 80;
          }
          return 60;
        }
        return 40;
      }
      return 20;
    } else {
      return 0;
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)}>
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-stone-900">Nome Completo</FormLabel>
                <FormControl>
                  <Input placeholder="Insira seu nome aqui" {...field} />
                </FormControl>
                {form.formState.errors.full_name ? (
                  <FormMessage>
                    {form.formState.errors.full_name.message}
                  </FormMessage>
                ) : (
                  <FormDescription>
                    Digite seu nome completo sem abreviações
                  </FormDescription>
                )}
              </FormItem>
            )}
          />
          <div className="w-auto h-0.5 flex bg-stone-300 my-4" />
          <FormField
            control={form.control}
            name="cpf"
            render={({ field }) => {
              field.value = cpf;
              const _change = field.onChange;

              return (
                <FormItem>
                  <FormLabel className="text-stone-900">CPF</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Insira seu CPF aqui!"
                      type="text"
                      max={255}
                      {...field}
                      onChange={(ev) => {
                        setCpf(ev.target.value);
                        handleChange(_change, ev.target.value);
                      }}
                      maxLength={14}
                      value={cpf}
                    />
                  </FormControl>
                  {form.formState.errors.cpf ? (
                    <FormMessage>
                      {form.formState.errors.cpf.message}
                    </FormMessage>
                  ) : (
                    <FormDescription>
                      Digite seu CPF, apenas os números
                    </FormDescription>
                  )}
                </FormItem>
              );
            }}
          />
          <div className="w-auto h-0.5 flex bg-stone-300 my-4" />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-stone-900">E-mail</FormLabel>
                <FormControl>
                  <Input placeholder="Insira seu e-mail aqui" {...field} />
                </FormControl>

                {form.formState.errors.email ? (
                  <FormMessage>
                    {form.formState.errors.email.message}
                  </FormMessage>
                ) : (
                  <FormDescription />
                )}
              </FormItem>
            )}
          />
          <div className="w-auto h-0.5 flex bg-stone-300 my-4" />
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-stone-900">
                  Seletor de Cores
                </FormLabel>
                <FormControl>
                  <ToggleGroup {...field} type="single" variant="outline">
                    <TooltipColor
                      value="0"
                      selected={field.value === "0"}
                      onClick={() => field.onChange("0")}
                      className="size-10 rounded-full bg-red-600 hover:bg-red-500 hover:border-none"
                    />
                    <TooltipColor
                      value="1"
                      selected={field.value === "1"}
                      onClick={() => field.onChange("1")}
                      className="size-10 rounded-full bg-orange-600 hover:bg-orange-500 hover:border-none"
                    />
                    <TooltipColor
                      value="2"
                      selected={field.value === "2"}
                      onClick={() => field.onChange("2")}
                      className="size-10 rounded-full bg-yellow-600 hover:bg-yellow-500 hover:border-none"
                    />
                    <TooltipColor
                      value="3"
                      selected={field.value === "3"}
                      onClick={() => field.onChange("3")}
                      className="size-10 rounded-full bg-green-600 hover:bg-green-500 hover:border-none"
                    />
                    <TooltipColor
                      value="4"
                      selected={field.value === "4"}
                      onClick={() => field.onChange("4")}
                      className="size-10 rounded-full bg-blue-600 hover:bg-blue-500 hover:border-none"
                    />
                    <TooltipColor
                      value="5"
                      selected={field.value === "5"}
                      onClick={() => field.onChange("5")}
                      className="size-10 rounded-full bg-indigo-600 hover:bg-indigo-500 hover:border-none"
                    />
                    <TooltipColor
                      value="6"
                      selected={field.value === "6"}
                      onClick={() => field.onChange("6")}
                      className="size-10 rounded-full bg-violet-600 hover:bg-violet-500 hover:border-none"
                    />
                  </ToggleGroup>
                </FormControl>
                {form.formState.errors.color && (
                  <FormMessage>
                    {form.formState.errors.color.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />
          <div className="w-auto h-0.5 flex bg-stone-300 my-4" />
          <FormField
            control={form.control}
            name="observation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-stone-900">Observações</FormLabel>
                <FormControl>
                  <Textarea
                    maxLength={255}
                    placeholder="Insira as observações de seu cadastro"
                    {...field}
                  />
                </FormControl>
                {form.formState.errors.observation ? (
                  <FormMessage>
                    {form.formState.errors.observation.message}
                  </FormMessage>
                ) : (
                  <FormDescription />
                )}
              </FormItem>
            )}
          />
          <div className="w-auto h-0.5 flex bg-stone-300 mt-4" />
          {isLoading ? (
            <div className="flex mx-auto mb-2 spinner lg">
              <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="20" />
              </svg>
            </div>
          ) : (
            <Button className="w-full mt-5" type="submit">
              Confirmar
            </Button>
          )}
          <Progress
            className={`${isLoading ? "m-0" : "mt-4"}`}
            value={progressHelper()}
          />
        </form>
      </Form>
    </>
  );
}

export default MainForm;
