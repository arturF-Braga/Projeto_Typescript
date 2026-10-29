# Catálogo de Jogos

Aplicação de catálogo feita com TypeScript. Permite cadastrar jogos, filtrar por título e categoria, alterar a disponibilidade e remover itens.

## Requisitos

- Node.js 20 ou mais recente
- npm

## Executar localmente

No terminal, dentro da pasta do projeto:

```bash
npm install
npm start
```

Abra [http://localhost:8080](http://localhost:8080) no navegador. O comando `npm start` compila o TypeScript para `dist/` e inicia um servidor local. Mantenha o terminal aberto enquanto usa a aplicação.

## Verificações

```bash
npm run build
npm run typecheck
```

## Enviar para o GitHub

Crie no GitHub um repositório vazio, sem README, licença ou `.gitignore`, e execute estes comandos na pasta do projeto. Troque a URL pelo endereço do seu repositório:

```bash
git init
git add .
git commit -m "Adiciona catálogo de jogos em TypeScript"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git
git push -u origin main
```

As pastas `node_modules/` e `dist/` são ignoradas pelo Git. O `package-lock.json` deve ser enviado; quem clonar o repositório instala as dependências com `npm install` e inicia com `npm start`.