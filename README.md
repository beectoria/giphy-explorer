# Giphy Explorer

Aplicação web desenvolvida como teste técnico para a **SGBR® Sistemas**, que consome a API do [GIPHY](https://developers.giphy.com) e permite aos usuários visualizar, buscar, navegar por categorias e favoritar GIFs.

🔗 **Deploy:** [giphy-explorer-4xxpl0uj2-beectoria1.vercel.app](https://giphy-explorer-4xxpl0uj2-beectoria1.vercel.app/#/)
📦 **Repositório:** [github.com/beectoria/giphy-explorer](https://github.com/beectoria/giphy-explorer)

---

## ✨ Funcionalidades

- **Home**: lista de GIFs em alta (trending) via API do GIPHY, com barra de pesquisa por termo.
- **Favoritos**: GIFs favoritados pelo usuário, persistidos via LocalStorage (plugin do Quasar).
- **Categorias**: lista de categorias disponíveis na API do GIPHY; ao selecionar uma, exibe os GIFs correspondentes.
- **Sobre**: informações sobre a desenvolvedora e o propósito do projeto.
- Botão de favoritar em cada card de GIF listado.
- Layout responsivo, com navbar lateral e topbar fixa.

## 🛠️ Tecnologias

- [Quasar 2](https://quasar.dev)
- [Vue 3](https://vuejs.org) (Composition API + `<script setup>`)
- [Vue Router](https://router.vuejs.org)
- [Pinia](https://pinia.vuejs.org)
- [Axios](https://axios-http.com)
- [Tailwind CSS](https://tailwindcss.com)
- LocalStorage via plugin do Quasar
- [API do GIPHY](https://developers.giphy.com)

## 📁 Estrutura do projeto

```
src/
├── boot/           # arquivos de inicialização (pinia, axios, etc.)
├── components/      # componentes reutilizáveis (cards, modais, etc.)
├── layouts/          # layout principal (navbar + topbar)
├── pages/           # views/páginas (Home, Favoritos, Categorias, Sobre)
├── router/           # configuração de rotas
├── services/        # clientes/serviços de API (ex: giphyClient, giphyGifs)
├── stores/           # stores Pinia (estado global, favoritos, gifs, categorias)
└── css/              # estilos globais / configuração do Tailwind
```

## ✅ Pré-requisitos

- [Node.js](https://nodejs.org) 18+ (recomendado 20+)
- [pnpm](https://pnpm.io) (ou npm/yarn, se preferir)
- Uma chave de API gratuita do GIPHY, gerada em [developers.giphy.com](https://developers.giphy.com)

## 🚀 Como rodar o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/beectoria/giphy-explorer.git
cd giphy-explorer
```

### 2. Instale as dependências

```bash
pnpm install
# ou: npm install / yarn install
```

### 3. Configure a variável de ambiente

Copie o arquivo de exemplo:

```bash
# Linux/Mac
cp .env.example .env

# Windows (cmd)
copy .env.example .env
```

Abra o `.env` e insira sua chave do GIPHY:

```
QCLI_GIPHY_API_KEY=sua_chave_aqui
```

> ⚠️ **Atenção ao prefixo:** este projeto usa `@quasar/app-vite`, cujo prefixo padrão para variáveis expostas ao client é `QCLI_` (e não `VITE_`, como em projetos Vite "puros"). Se a variável não seguir esse prefixo, ela não estará disponível em `import.meta.env` e as requisições à API retornarão erro 401.

### 4. Rode o servidor de desenvolvimento

```bash
pnpm dev
# ou: quasar dev
```

A aplicação abrirá automaticamente em `http://localhost:9000` (ou outra porta disponível).

### 5. Build para produção

```bash
pnpm build
# ou: quasar build
```

## 🔑 Sobre a integração com o GIPHY

As requisições à API do GIPHY passam por um proxy configurado no `quasar.config.js` (rota `/giphy-api` → `https://api.giphy.com`), evitando expor a URL da API diretamente e contornando eventuais restrições de CORS em desenvolvimento. A chave `api_key` é injetada automaticamente em todas as requisições através de um interceptor do Axios no `giphyClient`.

## 👩‍💻 Autora

**Victória Maciel**
🔗 [github.com/beectoria](https://github.com/beectoria)

---

Projeto desenvolvido como parte do processo seletivo de Programador(a) Web Front-end da SGBR® Sistemas.
