<template>
  <v-layout>
    <v-col class="w-100">
      <v-data-table
        :headers="headers"
        :items="dataUsers"
        :items-per-page="numberItemsPage"
        hide-default-footer
        class="elevation-1"
        :loading="loading"
        loading-text="Loading..."
      >
        <template v-slot:item.action="{ item }">
          <v-icon class="mx-4" @click="onChange(item)">
            mdi-account-badge-horizontal-outline
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>
      <div class="text-center">
        <v-row no-gutters>
          <v-col cols="6"></v-col>
          <v-col cols="1">
            <v-text-field></v-text-field>
          </v-col>
          <v-col cols="5">
            <v-pagination
              v-model="page"
              @input="pagination($event)"
              :length="lengthPages"
              :total-visible="7"
              class="pa-2"
            ></v-pagination>
          </v-col>
        </v-row>
      </div>
      <v-dialog v-model="dialog" width="500">
        <v-card class="mx-auto" tile dark>
          <v-img height="100%">
            <v-row align="end" class="fill-height">
              <v-col align-self="start" class="pa-0" cols="12">
                <v-avatar class="profile" color="grey" size="164" tile>
                  <v-img :src="avatarUser"></v-img>
                </v-avatar>
              </v-col>
              <v-col class="py-0">
                <v-list-item color="rgba(0, 0, 0, .4)" dark>
                  <v-list-item-content>
                    <v-list-item-title style="font-size: 70%">
                      {{createdAt}}
                    </v-list-item-title>
                    <v-list-item-title class="title">
                      {{nameUser}}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-img>
        </v-card>
      </v-dialog>
    </v-col>
  </v-layout>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "index",
        data: () => ({
            headers: [
                {text: 'ID', value: 'id'},
                {text: 'Created At', value: 'createdAt'},
                {text: 'Name', value: 'name'},
                {text: 'Avatar', value: 'avatar'},
                {text: 'Hành động', value: 'action'},
            ],
            loading: false,
            dialog: false,
            page: 1
        }),

        computed: {
            ...mapState({
                avatarUser: state => state.listUsers.avatarUser,
                nameUser: state => state.listUsers.nameUser,
                dataUsers: state => state.listUsers.data,
                createdAt: state => state.listUsers.createdAt,
                lengthPages: state => state.listUsers.lengthPages,
                numberItemsPage: state => state.listUsers.numberItemsPage,
                itemsPerPage: state => state.listUsers.itemsPerPage,
            })
        },

        created() {
            this.initialize()
        },

        methods: {
            initialize() {
                this.$axios.$get(process.env.API_LIST_USERS).then((req) => {
                    this.$store.dispatch('listUsers/setData', req);
                    this.$store.dispatch('listUsers/totalPages')
                })
            },
            onChange(item) {
                this.dialog = true;
                this.$store.dispatch('listUsers/setUser', item)
            },
            pagination(value) {
                this.loading = true;
                let url_list_user = process.env.API_LIST_USERS + process.env.NUMBER_PAGE +
                    value + process.env.NUMBER_ITEMS_PAGE + this.$store.getters['listUsers/getNumberItemsPage'];
                this.$axios.$get(url_list_user).then((req) => {
                    this.$store.dispatch('listUsers/setData', req);
                    this.loading = false
                })
            }
        }
    }
</script>
