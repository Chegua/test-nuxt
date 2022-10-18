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
              :items="[]"
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
              
            </v-data-table>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-dialog v-model="dialogFormProduct">
      <form-product/>      
    </v-dialog>
  </v-row>
</template>

<script>
import FormProduct from '@/components/products/form-product.vue'
export default {
  name: 'IndexProducts',

  components:{
    FormProduct
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
        { text: 'Observaciones', value: 'observations' },
        { text: 'Precio', value: 'price' },
        { text: 'Disponibilidad', value: 'available' },
        { text: 'Opciones', value: 'options' },
      ],
    }
  },
}
</script>
