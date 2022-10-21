<template>
  <v-card tile>
    <v-toolbar flat dark color="primary">
      <v-toolbar-title
        >{{ !edit ? 'Nuevo' : 'Editar' }} producto</v-toolbar-title
      >

      <div class="spacer"></div>

      <v-btn icon @click="closeModal">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>

    <v-container fluid>
      <ValidationObserver v-slot="{ handleSubmit }" ref="formProduct">
        <form @submit.prevent="handleSubmit(onSubmit)">
          <v-row>
            <v-col cols="12">
              <h2 class="grey--text">Informacion del producto</h2>
              <hr />
            </v-col>

            <v-col cols="12" sm="8">
              <ValidationProvider
                name="nombre"
                rules="required"
                v-slot="{ errors }"
              >
                <v-text-field
                  label="Nombre"
                  dense
                  outlined
                  :error-messages="errors[0]"
                  v-model.trim="product.name"
                ></v-text-field>
              </ValidationProvider>
            </v-col>

            <v-col cols="12" sm="4">
              <ValidationProvider
                name="nombre corto"
                rules="required"
                v-slot="{ errors }"
              >
                <v-text-field
                  label="Nombre corto"
                  dense
                  outlined
                  :error-messages="errors[0]"
                  v-model.trim="product.short_name"
                ></v-text-field>
              </ValidationProvider>
            </v-col>

            <v-col cols="12" sm="4">
              <ValidationProvider
                name="familia"
                rules="required"
                v-slot="{ errors }"
              >
                <v-select
                  :items="families"
                  label="Familia"
                  dense
                  outlined
                  :error-messages="errors[0]"
                  v-model="product.family"
                ></v-select>
              </ValidationProvider>
            </v-col>

            <v-col cols="12" sm="4">
              <ValidationProvider
                name="unidad"
                rules="required"
                v-slot="{ errors }"
              >
                <v-select
                  :items="unitOptions"
                  label="Unidad"
                  dense
                  outlined
                  :error-messages="errors[0]"
                  v-model="product.unit"
                ></v-select>
              </ValidationProvider>
            </v-col>

            <v-col cols="12" sm="4">
              <ValidationProvider
                name="peso"
                rules="required"
                v-slot="{ errors }"
              >
                <v-text-field
                  @keypress="isNumber($event)"
                  type="number"
                  :min="0"
                  label="Peso Grs"
                  dense
                  outlined
                  :error-messages="errors[0]"
                  v-model="product.weight"
                ></v-text-field>
              </ValidationProvider>
            </v-col>

            <v-col cols="12" sm="4">
              <ValidationProvider
                name="precio"
                rules="required"
                v-slot="{ errors }"
              >
                <v-text-field
                  @keypress="isNumber($event)"
                  type="number"
                  :min="0"
                  label="Precio"
                  dense
                  outlined
                  :error-messages="errors[0]"
                  v-model="product.price"
                ></v-text-field>
              </ValidationProvider>
            </v-col>

            <v-col cols="12" sm="4">
              <ValidationProvider
                name="cantidad minima"
                rules="required"
                v-slot="{ errors }"
              >
                <v-text-field
                  @keypress="isNumber($event)"
                  type="number"
                  :min="0"
                  label="Cantidad minima"
                  dense
                  outlined
                  :error-messages="errors[0]"
                  v-model="product.min_amount"
                ></v-text-field>
              </ValidationProvider>
            </v-col>

            <v-col cols="12" sm="4">
              <h4>Disponibilidad</h4>
              <v-radio-group v-model="product.availability" row>
                <v-radio label="Disponible" value="Disponible"></v-radio>
                <v-radio label="Agotado" value="Agotado"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>

          <v-col cols="12" class="d-flex justify-end">
            <v-btn type="submit" color="success">{{
              !edit ? 'Guardar' : 'Editar'
            }}</v-btn>
          </v-col>
        </form>
      </ValidationObserver>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      families: [
        'Pescados',
        'Mariscos',
        'Crustáceos',
        'Camarones y otros',
        'Pack',
      ],

      unitOptions: ['KG', 'GL', 'UN', 'Uni', 'Bolsa'],

      product: {
        name: '',
        short_name: '',
        family: null,
        unit: null,
        weight: 0,
        price: 0,
        min_amount: 0,
        availability: 'Disponible',
      },
    }
  },

  props: {
    edit: {
      type: Boolean,
      default: false,
    },

    produdctEdit: null,
  },

  watch: {
    produdctEdit: function (value) {
      if (value) this.product = value
    },
  },
  methods: {
    isNumber(e) {
      let char = String.fromCharCode(e.keyCode) // Get the character
      if (/^[0-9]+$/i.test(char)) return true // Match with regex
      else e.preventDefault() // If not match, don't add to input text
    },
    onSubmit() {
      if (!this.edit) this.saveProduct()
      else this.updateProduct()
    },

    async saveProduct() {
      await this.$axios
        .post('/products', this.product)
        .then((res) => {
          console.log(res)
          this.product = {
            name: '',
            short_name: '',
            family: null,
            unit: null,
            weight: 0,
            price: 0,
            min_amount: 0,
            availability: 'Disponible',
          }
          this.$refs.formProduct.reset()
          this.$emit('successfullySave', res.data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updateProduct() {},

    closeModal() {
      this.product = {
        name: '',
        short_name: '',
        family: null,
        unit: null,
        weight: 0,
        price: 0,
        min_amount: 0,
        availability: 'Disponible',
      }
      this.$refs.formProduct.reset()
      this.$emit('closeModal', false)
    },
  },
}
</script>
