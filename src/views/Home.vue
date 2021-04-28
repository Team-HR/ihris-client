<template>
    <v-data-table :headers="headers" :items="offices" sort-by="calories" class="elevation-1">
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>Office Staff Management</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
            </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
            <v-btn small class="mr-2" :to="`/office-staff-management/${item.id}`">
                <v-icon>
                    <!-- @click="editItem(item)" -->
                    mdi-pencil
                </v-icon>
            </v-btn>
            <v-icon small>
                mdi-delete
            </v-icon>
        </template>
        <template v-slot:no-data>
            <v-btn color="primary">
                Reset
            </v-btn>
        </template>
    </v-data-table>
</template>
<script>
// import { mapGetters } from "vuex";
export default {
    data() {
        return {
            offices: [],
            headers: [{
                    text: 'Office',
                    align: 'start',
                    value: 'office',
                },
                // { text: 'Calories', value: 'calories' },
                // { text: 'Fat (g)', value: 'fat' },
                // { text: 'Carbs (g)', value: 'carbs' },
                // { text: 'Protein (g)', value: 'protein' },
                { text: 'Actions', value: 'actions', sortable: false },
            ]
        };
    },

    methods: {
        getOffices() {
            this.axios.get('staff-management/offices')
                .then((response) => {
                    // TODO
                    console.log(response.data)
                    this.offices = response.data
                }).catch((error) => {
                    console.error(error);
                }).finally(() => {
                    // TODO
                });
        },
        editItem(item) {
            console.log(item)
        }
    },

    mounted() {
        this.getOffices()
        // console.log(this.$store.getters["auth/user"]);
    },
};
</script>
<style></style>