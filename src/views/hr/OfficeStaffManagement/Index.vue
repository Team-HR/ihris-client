<template>
    <div>
        <v-toolbar>
            <v-avatar>
                <v-icon>mdi-pencil-ruler</v-icon>
            </v-avatar>
            <v-toolbar-title>Office Supervisor Setup</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-row>
            <v-col cols="12" sm="12" md="8" class="mx-auto">
                <v-data-table :headers="headers" :items="offices" sort-by="calories" class="elevation-1">
<!--                     <template v-slot:top>
                        <v-toolbar flat>
                            <v-btn color="green" dark @click="addDialog = !addDialog"> Add Office</v-btn>
                            <v-dialog v-model="addDialog" width="500">
                                <v-card>
                                    <v-toolbar dark color="primary">
                                        <v-btn icon dark @click="dialog = false">
                                            <v-icon>mdi-close</v-icon>
                                        </v-btn>
                                        <v-toolbar-title>Add New Office</v-toolbar-title>
                                        <v-spacer></v-spacer>
                                    </v-toolbar>
                                    <v-card-text class="mt-5">
                                        <v-text-field v-model="office" label="Office" placeholder="Enter name of Office" outlined hide-details />
                                        <v-checkbox v-model="isSection" label="Is a Section"></v-checkbox>
                                        <v-autocomplete :disabled="isSection == true" v-model="sectionID" :items="sections" label="Section" placeholder="Select section if applicable" outlined />
                                        <v-autocomplete v-model="departmentID" :items="departments" label="Department" placeholder="Select department" outlined />
                                    </v-card-text>
                                    <v-card-actions class="ml-5 pb-5">
                                        <v-btn color="primary" @click="addDialog = !addDialog" text>Save</v-btn>
                                        <v-btn @click="addDialog = !addDialog" text>Cancel</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-toolbar>
                    </template> -->
                    <template v-slot:[`item.actions`]="{ item }">
                        <v-btn text small class="mr-2" :to="`/office-staff-management/${item.id}`">
                            <v-icon>
                                mdi-account-hard-hat
                            </v-icon>
                            Assign
                        </v-btn>
                        <!-- <v-btn text small class="mr-2">
                            <v-icon small>
                                mdi-delete
                            </v-icon>
                        </v-btn> -->
                    </template>
                    <template v-slot:no-data>
                        <v-btn color="primary">
                            Reset
                        </v-btn>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
    </div>
</template>
<script>
// import { mapGetters } from "vuex";
export default {
    data() {
        return {
            isSection: false,
            addDialog: false,
            sectionID: "",
            sections: [],
            departmentID: "",
            departments: [],
            office: "",
            offices: [],
            headers: [
                { text: 'Actions', value: 'actions', sortable: false, width: '25' },
                { text: 'Office', align: 'start', value: 'office' },
                // { text: 'Section', value: 'section' },
                { text: 'Department', value: 'department' },
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