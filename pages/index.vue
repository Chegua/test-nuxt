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
              :loading="loadingTable"
              hide-default-footer
            >
              <template v-slot:top>
                <v-toolbar flat class="pt-2">
                  <v-toolbar-title>Productos</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-btn
                    color="success"
                    @click="addNew"
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
                        @click="editProduct(item)"
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
      <form-product
        @closeModal="clearFormModal($event)"
        @successfullySave="successfullySave"
        :edit="edit"
        :produdctEdit="product"
      />
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
      loadingTable: false,
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
      product: null,

      edit: false,

      products: [],
    }
  },

  created() {
    this.listProducts()
  },

  methods: {
    addNew() {
      this.dialogFormProduct = true
    },
    async listProducts() {
      this.loadingTable = true;
      await this.$axios
        .get('/products')
        .then((res) => {
          this.products = res.data
          this.loadingTable = false;
        })
        .catch((error) => {
          console.log(error)
          this.loadingTable = false;
        })
    },

    clearFormModal(e) {
      this.dialogFormProduct = e
      this.edit = false

      this.product = null
    },

    editProduct(product) {
      this.product = product
      this.edit = true
      this.dialogFormProduct = true
    },

    confirmDelete(product) {
      this.$swal
        .fire({
          title: `Esta seguro que desea borrar el producto ${product.name}?`,
          text: 'Esta acción no se puede revertir',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar',
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.deleteProduct(product.id)
          }
        })
    },

    deleteProduct(idProduct) {
      this.$axios
        .delete(`/products/${idProduct}`)
        .then((res) => {
          this.$swal.fire({
            icon: 'success',
            title: `Producto borrado con exito`,
            showConfirmButton: false,
            timer: 5000,
            position: 'bottom-end',
            timerProgressBar: true,
            toast: true,
            showCloseButton: true,
          })
          this.listProducts()
        })
        .catch((err) => {
          console.error(err)
        })
    },

    successfullySave() {
      this.listProducts()
      this.clearFormModal(false)
    },
   
  },
}
</script>
