# App Transportadoras

Projeto tem como objetivo permitir o gerenciamento de veiculos, avisando sobre quando vai ser necessário realizar manutenção, monitorar quilometragem, etc.

---

## Como utilizar

### Banco de dados

Entre na pasta raiz do projeto e digite o seguinte comando

``` bash
docker compose up -d
```

Ele inicializara o docker e instalará as imagens necessárias, caso esteja usando podman apenas troque docker por podman.

Para registrar o banco na sua maquina ele estará em `localhost:5432`, enquanto pgadmin estará na `localhost:9090`.

Para registrar o banco no pgadmin, em vez de ``localhost``, utilize: `db:5432` e insira as credenciais necessárias.

---

### Mobile

Entre na pasta transportadoras.mobile e abra o cmd, digite o seguinte:

```bash
npm i
npx expo start
```

---


## Feito por

- @LeandroPoletti
- @Caio0con
- @BrenoColonello
