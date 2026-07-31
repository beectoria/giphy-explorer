# Giphy Explorer

Aplicação web desenvolvida como teste técnico para a **SGBR® Sistemas**, que consome a API do [GIPHY](https://developers.giphy.com) e permite aos usuários visualizar, buscar, navegar por categorias e favoritar GIFs.

📦 **Repositório:** https://github.com/beectoria/giphy-explorer

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

```text
src/
├── boot/             # arquivos de inicialização (pinia, axios, etc.)
├── components/       # componentes reutilizáveis (cards, modais, etc.)
├── layouts/          # layout principal (navbar + topbar)
├── pages/            # views/páginas (Home, Favoritos, Categorias, Sobre)
├── router/           # configuração de rotas
├── services/         # clientes/serviços de API
├── stores/           # stores Pinia (estado global, favoritos, gifs, categorias)
└── css/              # estilos globais / configuração do Tailwind
```

## ✅ Pré-requisitos

- [Node.js](https://nodejs.org) 18+ (recomendado 20+)
- [pnpm](https://pnpm.io) (ou npm/yarn, se preferir)
- Uma chave de API gratuita do GIPHY, gerada em https://developers.giphy.com

## 🚀 Como rodar o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/beectoria/giphy-explorer.git
cd giphy-explorer
```

### 2. Instale as dependências

```bash
pnpm install
# ou: npm install
# ou: yarn install
```

### 3. Configure a variável de ambiente

Copie o arquivo de exemplo:

```bash
# Linux/Mac
cp .env.example .env

# Windows (cmd)
copy .env.example .env
```

Abra o arquivo `.env` e insira sua chave da API do GIPHY:

```env
QCLI_GIPHY_API_KEY=sua_chave_aqui
```

> **Importante:** este projeto utiliza o prefixo `QCLI_` para expor variáveis de ambiente ao cliente. Caso utilize outro prefixo, a chave não ficará disponível em `import.meta.env`, causando falha nas requisições à API.

### 4. Execute o projeto

```bash
pnpm dev
# ou: quasar dev
```

A aplicação ficará disponível em `http://localhost:9000` (ou outra porta disponível).

### 5. Gerar a build de produção

```bash
pnpm build
# ou: quasar build
```

## 🔑 Integração com a API do GIPHY

As requisições à API do GIPHY utilizam um proxy configurado no `quasar.config.js` (`/giphy-api` → `https://api.giphy.com`), evitando problemas de CORS durante o desenvolvimento. A `api_key` é adicionada automaticamente às requisições por meio de um interceptor configurado no `giphyClient`.

## 👩‍💻 Autora

**Victória Maciel**

GitHub: https://github.com/beectoria

---

Projeto desenvolvido como parte do processo seletivo para a vaga de **Programador(a) Web Front-end** da **SGBR® Sistemas**.
