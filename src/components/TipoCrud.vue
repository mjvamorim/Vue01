<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <h1>Cadastro de Tipos</h1>
        <v-data-table
          :headers="headers"
          :items="tipos"
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

          ##Formulario
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>My CRUD</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="700px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    Novo Item
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">Usuários</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.id"
                            label="Id"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="8">
                          <v-text-field
                            v-model="editedItem.descricao"
                            label="Descrição"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      Cancel
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          ##Fim Form
          <template v-slot:[`item.tipo_id`]="{ item }">
            {{ descricao(item.tipo_id) }}
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "TipoCrud",

  data: () => ({
    search: "",
    dialog: false,
    headers: [
      { text: "Id", value: "id" },
      { text: "Descrição", value: "descricao" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    tipos: [],
    editedItem: { id: 0, descricao: "" },
    editedItemIndex: -1,
    defaultItem: { id: 0, descricao: "" },
  }),
  methods: {
    inicializa() {
      axios
        .get("http://localhost:3000/tipos")
        .then((response) => {
          this.tipos = response.data;
        })
        .catch((error) => console.log(error));
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      if (this.editedIndex > -1) {
        //alteracao
        axios
          .put(
            "http://localhost:3000/tipos/" + this.editedItem.id,
            this.editedItem
          )
          .then((response) => {
            console.log(response);
            Object.assign(this.tipos[this.editedIndex], this.editedItem);
            this.close();
          })
          .catch((error) => console.log(error));
      } else {
        //Inclusao
        axios
          .post("http://localhost:3000/tipos", this.editedItem)
          .then((response) => {
            console.log(response);
            this.tipos.push(this.editedItem);
            this.close();
          })
          .catch((error) => console.log(error));
      }
    },
    editItem(item) {
      this.editedIndex = this.tipos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.tipos.indexOf(item);
      confirm("Deseja apagar este item?") &&
        axios
          .delete("http://localhost:3000/tipos/" + item.id)
          .then((response) => {
            console.log(response.data);
            this.tipos.splice(index, 1);
          })
          .catch((error) => console.log(error));
    },
  },
  created() {
    this.inicializa();
  },
};
</script>
