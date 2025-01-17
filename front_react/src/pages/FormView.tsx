import { api } from "@/utils/axiosConfig";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RegisterResponse } from "./MainForm";
import appColors from "@/utils/appColors";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const INITIAL_STATE = {
  id: "",
  full_name: "",
  cpf: "",
  email: "",
  color: "-1",
  observation: "",
};

function FormView() {
  const registerId = useParams();

  const navTo = useNavigate();

  const { toast } = useToast();

  const [register, setRegister] = useState<RegisterResponse>(INITIAL_STATE);

  const [isLoading, setIsLoading] = useState(false);

  const [colorTotal, setColorTotal] = useState<number | false>(false);

  const getRegister = useCallback(async () => {
    setIsLoading(true);
    if (isLoading) {
      return;
    }
    try {
      const { data } = await api.get<RegisterResponse>(
        `/register/${registerId.id}`
      );
      setRegister({
        ...data,
        cpf: `${data.cpf.slice(0, 3)}.${data.cpf.slice(3, 6)}.${data.cpf.slice(
          6,
          9
        )}-${data.cpf.slice(9, 11)}`,
      });
      setTimeout(
        () =>
          toast({
            title: "Cadastro encontrado!",
            description: `Foi encontrado o cadastro de ${
              data.full_name.split(" ")[0]
            }!`,
            style: {
              backgroundColor: appColors[Number(data.color)] + "DD",
            },
          }),
        800
      );
      setTimeout(() => setIsLoading(false), 1000);
    } catch (error) {
      console.log(error);
    }
  }, []);

  async function getColor() {
    try {
      const { data } = await api.get<number>(`/color/${register.color}`);
      setColorTotal(data);
      setTimeout(() => setIsLoading(false), 1000);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!isLoading && registerId.id?.length === 36 && register.color === "-1") {
      getRegister();
    }
    if (colorTotal === false && register.color !== "-1") {
      getColor();
    }
  }, [register]);

  return (
    <>
      <Button
        onClick={() => {
          navTo("/");
        }}
        style={{
          position: "absolute",
          top: 36,
        }}
      >
        Voltar ao cadastro
      </Button>
      {isLoading && !register.id ? (
        <div className="flex mx-auto mb-2 spinner xl w-">
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="20" />
          </svg>
        </div>
      ) : (
        <div className="flex flex-col h-screen items-center justify-evenly">
          <h1 className="text-stone-900">
            A seguir, uma prévia de seu cartão de registro:
          </h1>
          <div
            style={{
              backgroundColor: appColors[Number(register.color)] + "DD",
            }}
            className="flex w-3/5 px-8 py-8 rounded-xl flex-col items-center"
          >
            <h2 className="text-white text-3xl">{register.full_name}</h2>
            <div className="w-full h-0.5 bg-zinc-200 mt-2" />
            <div className="flex mt-4">
              <h3 className="flex text-white mr-4 text-2xl">{register.cpf}</h3>
              <div className="flex min-h-max w-0.5 bg-zinc-200" />
              <h3 className="flex text-white ml-4 text-2xl">
                {register.email}
              </h3>
            </div>
            <div className="w-full h-0.5 bg-zinc-200 mt-4" />
            <span className="mt-2 text-lg text-orange-900">Observação:</span>
            <h4 className="text-white text-2xl mt-4 text-">
              {register.observation ?? "Sem observações."}
            </h4>
          </div>
          {!colorTotal ? (
            <h2 className="text-2xl text-stone-600">
              Por enquanto só você adora esta cor por aqui ☺️!
            </h2>
          ) : (
            <h2 className="text-2xl text-stone-600">
              Mais{" "}
              <strong style={{ color: appColors[Number(register.color)] }}>
                {colorTotal}
              </strong>{" "}
              {colorTotal === 1 ? "pessoa adora" : "pessoas adoram"} a mesma cor
              que você 🥰!
            </h2>
          )}
        </div>
      )}
    </>
  );
}

export default FormView;
