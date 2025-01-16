import { useForm } from "react-hook-form";
import "./App.css";
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
import { Input } from "./components/ui/input";
import { clearDocument } from "./utils/clearDocument";
import { isCPFValid } from "./utils/isCPFValid";
import { useEffect, useReducer } from "react";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "./axios-config/api";

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
  fullName: z
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

function App() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(baseSchema),
  });

  // eslint-disable-next-line
  const [cpf, setCpf] = useReducer((_: any, next: string) => {
    return formatCPF(next);
  }, formatCPF(""));

  function handleChange(
    realChangeFn: (agr1: string) => void,
    formattedValue: string
  ) {
    const digits = formattedValue.replace(/\D/g, "");
    realChangeFn(digits);
  }

  async function submit(e: FormSchema) {
    try {
      const data = await api.post<FormSchema>("/create", e);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)}>
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-stone-900">Nome Completo</FormLabel>
                <FormControl>
                  <Input placeholder="Insira seu nome aqui" {...field} />
                </FormControl>
                {form.formState.errors.fullName ? (
                  <FormMessage>
                    {form.formState.errors.fullName.message}
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
                    <ToggleGroupItem
                      value="0"
                      onClick={() => field.onChange("0")}
                      className="size-10 rounded-full bg-red-600 hover:bg-red-500 hover:border-none"
                    />
                    <ToggleGroupItem
                      value="1"
                      onClick={() => field.onChange("1")}
                      className="size-10 rounded-full bg-orange-600 hover:bg-orange-500 hover:border-none"
                    />
                    <ToggleGroupItem
                      value="2"
                      onClick={() => field.onChange("2")}
                      className="size-10 rounded-full bg-yellow-600 hover:bg-yellow-500 hover:border-none"
                    />
                    <ToggleGroupItem
                      value="3"
                      onClick={() => field.onChange("3")}
                      className="size-10 rounded-full bg-green-600 hover:bg-green-500 hover:border-none"
                    />
                    <ToggleGroupItem
                      value="4"
                      onClick={() => field.onChange("4")}
                      className="size-10 rounded-full bg-blue-600 hover:bg-blue-500 hover:border-none"
                    />
                    <ToggleGroupItem
                      value="5"
                      onClick={() => field.onChange("5")}
                      className="size-10 rounded-full bg-indigo-600 hover:bg-indigo-500 hover:border-none"
                    />
                    <ToggleGroupItem
                      value="6"
                      onClick={() => field.onChange("6")}
                      className="size-10 rounded-full bg-violet-600 hover:bg-violet-500 hover:border-none"
                    />
                  </ToggleGroup>
                </FormControl>
                {/* <FormDescription>Digite seu nome completo</FormDescription> */}
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
          <Button className="w-full mt-5" type="submit">
            Confirmar
          </Button>
        </form>
      </Form>
    </>
  );
}

export default App;
