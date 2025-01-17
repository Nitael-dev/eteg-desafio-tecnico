# Desafio Técnico - E-teg
## Tecnologias

- [React.JS](https://react.dev/)
- [Node.JS](https://nodejs.org/en)
- [TypeScript](https://www.typescriptlang.org/)
- [Postgres](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)

## Iniciando a aplicação
### Realize o clone do repositório e acesse o diretório

```bash
  $ git clone https://github.com/Nitael-dev/eteg-desafio-tecnico.git
  $ cd eteg-desafio-tecnico
```

### Rode a imagem Docker da aplicação e faça seu cadastro!
```bash
  $ docker compose up
```
### Acesse a aplicação em qualquer Navegador
```bash
  http://localhost:5173/
```
### Considerações de finalização e pontos-chave do projeto a ser apresentado

A solução foi realizada de acordo com o documento proposto, indo um pouco além a fins de escalabidade e potencial, já que será utilizada futuramente. As regras de negócio são simples: CPF's e E-mail's são únicos no banco de registro, caso seja encontrado um registro idêntico ( mesmo CPF e mesmo E-mail no formulário) o mesmo será atualizado, podendo ter: Nome Completo, Cor Favorita e Observações alteradas.

Agora falando diretamente, adotei uma método de desenvolvimento mais criativo para o desafio proposto pela E-teg, tentando sempre ir além sem fugir muito do serne da proposta. Usei algumas Bibliotecas que oferecem produtividade excepcional ao simplificar o uso e criação de componentes chamada [ShadCN](https://ui.shadcn.com/docs) para a criação de componentes otimizados, recicláveis e acessíveis no Front-End.

Na parte da API/Back-end, preferi um uso clássico do [Node.JS](https://nodejs.org/en) partindo pro [Express](https://expressjs.com/pt-br/) tendo em vista a simplicidade das regras do negócio e a segurança opcional para a solução, maximizando a fluidez no desenvolvimento. Também ajudou bastante na integração da imagem única do Docker, que acelerou grandemente o progresso no desafio.

Espero muito fazer parte do time da E-teg, e já adianto estar muito grato pela oportunidade de crescimento.

