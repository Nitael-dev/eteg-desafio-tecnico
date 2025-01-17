# Desafio Técnico - E-teg
## Tecnologias

- [React.JS](https://react.dev/)
- [Node.JS](https://nodejs.org/en)
- [TypeScript](https://www.typescriptlang.org/)
- [Postgres](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)

## Requisitos
- [Docker](https://www.docker.com/) deve estar instalado!!!

## Iniciando a aplicação
### Realize o clone ou baixe o ZIP do repositório, em seguida acesse o diretório

```bash
  $ git clone https://github.com/Nitael-dev/eteg-desafio-tecnico.git
  $ cd eteg-desafio-tecnico
```

### Crie os arquivos que irão conter as variáveis de ambiente
```bash
  $ touch ./front_react/.env ./api_node/.env
```
### Estas são as variáveis de desenvolvimento 🤫

#### ADICIONAR EM >> api_node/.env <<
```bash
DB_HOST=localhost
DB_PORT=5432
DB_USER=eteg
DB_PASSWORD=eteg
DB_NAME=eteg

PORT=5000
```
#### ADICIONAR EM >> front_react/.env <<
```bash
VITE_API_URL=http://localhost:5000
```

### Rode a imagem Docker da aplicação
```bash
  $ docker compose up
```

### Acesse a aplicação e faça seu cadastro 🌈 em qualquer Navegador
```bash
  http://localhost:5173/
```
## Pontos-chave do projeto e considerações sobre o desafio

A solução foi realizada de acordo com o documento proposto, com alguns extras para fins de escalabidade e potencial, já que será utilizada futuramente. As regras de negócio são simples: CPF's e E-mail's são únicos no banco de registro, caso seja encontrado um registro idêntico ( mesmo CPF e mesmo E-mail no formulário) o mesmo será atualizado, podendo ter: Nome Completo, Cor Favorita e Observações alteradas.

Agora falando diretamente, adotei uma método de desenvolvimento mais criativo para o desafio proposto pela E-teg, tentando sempre ir além sem fugir muito do serne da proposta. Usei algumas Bibliotecas que oferecem produtividade excepcional ao simplificar o uso e criação de componentes chamada [ShadCN](https://ui.shadcn.com/docs) para a criação de componentes otimizados, recicláveis e acessíveis no Front-End.

Na parte da API/Back-end, preferi um uso clássico do [Node.JS](https://nodejs.org/en) partindo pro [Express](https://expressjs.com/pt-br/) tendo em vista a simplicidade das regras do negócio e a segurança opcional para a solução, maximizando a fluidez no desenvolvimento. Também ajudou bastante na integração da imagem única do Docker, que acelerou grandemente o progresso no desafio.

Espero muito fazer parte do time da E-teg, e já adianto estar muito grato pela oportunidade de crescimento.
