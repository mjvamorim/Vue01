<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <h1>UserCrud</h1>
        <v-data-table
          :headers="headers"
          :items="usuarios"
          :search="search"
          sort-by="id"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-text-field
              v-model="search"
              label="Search"
              class="mx-4"
            ></v-text-field>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "UserCrud",

  data: () => ({
    search: "",
    headers: [
      { text: "Id", value: "id" },
      { text: "Nome", value: "nome" },
      { text: "Localização", value: "pais" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    usuarios: [
      { id: 1, nome: "Joao", pais: "Brasil", tipo_id: "1" },
      { id: 2, nome: "Pedro", pais: "Portugal", tipo_id: "1" },
      { id: 3, nome: "Maria", pais: "Brasil", tipo_id: "1" },
    ],
  }),
};
</script>
