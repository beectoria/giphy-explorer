<template>
  <q-page>
    <section class="max-w-5xl mx-auto">
      <div class="bg-white rounded-xl shadow-sm p-10">
        <div class="mb-10">
          <h1 class="text-4xl md:text-5xl font-light text-slate-800 mb-6">
            GIPHY Explorer
          </h1>

          <p class="text-lg text-slate-600 leading-9">
            O GIPHY Explorer é uma aplicação desenvolvida para explorar GIFs
            utilizando a API oficial do GIPHY. A plataforma permite pesquisar,
            visualizar, favoritar e navegar por categorias de maneira simples e
            intuitiva.
          </p>
        </div>

        <q-separator />

        <div class="my-10">
          <h2 class="text-3xl font-light text-slate-800 mb-6">
            Funcionalidades
          </h2>

          <ul class="list-disc ml-6 text-slate-600 space-y-4 leading-8">
            <li>Busca de GIFs em tempo real.</li>
            <li>Visualização dos GIFs em alta.</li>
            <li>Exploração por categorias.</li>
            <li>Sistema de favoritos com armazenamento local.</li>
            <li>Paginação dos resultados.</li>
            <li>Visualização de detalhes dos GIFs.</li>
          </ul>
        </div>

        <q-separator />

        <div class="mt-10">
          <h2 class="text-3xl font-light text-slate-800 mb-6">
            Tecnologias utilizadas
          </h2>

          <div class="flex flex-wrap gap-3">
            <q-chip color="primary" text-color="white">Vue 3</q-chip>
            <q-chip color="primary" text-color="white">Quasar</q-chip>
            <q-chip color="primary" text-color="white">Pinia</q-chip>
            <q-chip color="primary" text-color="white">Vue Router</q-chip>
            <q-chip color="primary" text-color="white">Tailwind CSS</q-chip>
            <q-chip color="primary" text-color="white">Axios</q-chip>
            <q-chip color="primary" text-color="white">GIPHY API</q-chip>
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>
