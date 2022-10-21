<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-card class="py-4 px-2">
        <v-row>
          <v-col cols="12">
            <h1
              class="display-2 text-center font-weight-bold text--primary mb-5"
            >
              ADMINISTRADOR
            </h1>
          </v-col>

          <v-col cols="12">
            <v-data-table
              :headers="headers"
              :items="products"
              :items-per-page="5"
              class="elevation-1"
              hide-default-footer
            >
              <template v-slot:top>
                <v-toolbar flat class="pt-2">
                  <v-toolbar-title>Productos</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-btn
                    color="success"
                    @click="dialogFormProduct = true"
                    small
                    dark
                    class="mb-2"
                  >
                    Agregar productos
                  </v-btn>

                  <v-spacer></v-spacer>
                  <v-text-field
                    label="Buscar"
                    append-icon="mdi-magnify"
                  ></v-text-field>
                </v-toolbar>
              </template>

              <template v-slot:[`item.options`]="{ item }">
                <v-container
                  class="px-0 py-0 d-flex justify-center align-center"
                >
                  <v-tooltip bottom color="black">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        dark
                        icon
                        fab
                        class="my-1"
                        small
                        depressed
                        color="black"
                      >
                        <v-icon> mdi-pencil </v-icon>
                      </v-btn>
                    </template>
                    <span>Editar</span>
                  </v-tooltip>

                  <v-tooltip bottom color="black">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        dark
                        icon
                        fab
                        class="my-1"
                        small
                        depressed
                        color="black"
                        @click="confirmDelete(item)"
                      >
                        <v-icon> mdi-delete </v-icon>
                      </v-btn>
                    </template>
                    <span>Eliminar</span>
                  </v-tooltip>
                </v-container>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-dialog v-model="dialogFormProduct">
      <form-product @closeModal="dialogFormProduct = $event" />
    </v-dialog>
  </v-row>
</template>

<script>
import FormProduct from '@/components/products/form-product.vue'
export default {
  name: 'IndexProducts',

  components: {
    FormProduct,
  },

  data() {
    return {
      dialogFormProduct: false,
      headers: [
        {
          text: 'Código',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: 'Nombre', value: 'name' },
        { text: 'Familia', value: 'family' },
        // { text: 'Observaciones', value: 'observations' },
        { text: 'Precio', value: 'price' },
        { text: 'Disponibilidad', value: 'availability' },
        { text: 'Opciones', value: 'options' },
      ],

      products: [],
    }
  },

  created() {
    this.listProducts()
  },

  methods: {
    async listProducts() {
      await this.$axios
        .get('/products')
        .then((res) => {
          this.products = res.data
        })
        .catch((error) => {
          console.log(error)
        })
    },

    confirmDelete(product) {},
  },
}
</script>
