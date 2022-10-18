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
              <!-- <template v-slot:body.append>
                <tr>
                  <td></td>
                  <td>
                    <v-text-field
                      v-model="calories"
                      type="number"
                      label="Less than"
                    ></v-text-field>
                  </td>
                  <td colspan="4"></td>
                </tr>
              </template> -->
            </v-data-table>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-dialog v-model="dialogFormProduct">
      <v-card tile>
        <v-toolbar flat dark color="primary"> 
          <v-toolbar-title>Nuevo producto</v-toolbar-title>
        </v-toolbar>

        <v-container fluid>
          <v-row>
            <v-col cols="12"> 
              <h2 class="grey--text">Informacion del producto</h2>
              <hr>
            </v-col>

            <v-col cols="12" sm="8">
              <v-text-field label="Nombre" dense outlined></v-text-field>

            </v-col>

            <v-col cols="12" sm="4">
              <v-text-field label="Nombre corto" dense outlined></v-text-field>
            </v-col>


            <v-col cols="12" sm="4">
              <v-text-field label="Familia" dense outlined></v-text-field>
            </v-col>

            <v-col cols="12" sm="4">
              <v-text-field label="Unidad" dense outlined></v-text-field>
            </v-col>

            <v-col cols="12" sm="4">
              <v-text-field label="Peso Grs" dense outlined></v-text-field>
            </v-col>

            <v-col cols="12" sm="4">
              <v-text-field label="Precio" dense outlined></v-text-field>
            </v-col>

            <v-col cols="12" sm="4">
              <v-text-field label="Cantidad minima" dense outlined></v-text-field>
            </v-col>

            <v-col cols="12" sm="4">
              <h4>Disponibilidad</h4>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'IndexProducts',

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
