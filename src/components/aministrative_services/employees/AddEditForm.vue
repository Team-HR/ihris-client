<template>
    <div>
        <v-card>
            <v-card-title primary-title>
                <div>
                    <div class="headline">ADD NEW EMPLOYEE</div>
                </div>
            </v-card-title>
            <!-- form start -->
            <v-card-text>
                <template>
                    <v-form ref="form" lazy-validation @submit.prevent="save(inputs)">
                        <template v-for="(input, i) in inputs">
                            <div :key="i">
                                <v-text-field v-if="input.type === 'text'" v-model="input.value" @input="input.value = input.value.toUpperCase()" filled :label="input.label" required />
                                <v-select v-else-if="input.type === 'select'" outlined v-model="input.value" :items="input.items" filled :label="input.label" />
                            </div>
                        </template>
                        <v-btn type="submit" color="success" class="mr-4">
                            Save
                        </v-btn>
                        <v-btn color="error" class="mr-4">
                            Cancel
                        </v-btn>
                    </v-form>
                </template>
            </v-card-text>
            <!-- form end -->
        </v-card>
        <!-- </v-dialog> -->
    </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";
import _ from "lodash";

export default {
    data: () => ({
        inputs: {}
    }),
    watch: {
        _inputs: {
            handler: function(after, before) {
                // let changed = after.filter(function(p, idx) {
                //   return Object.keys(p).some(function(prop) {
                //     return p[prop] !== before[idx][prop];
                //   });
                // });
                // console.log("after", after);
            },
            deep: true
        }
    },
    computed: {
        ...mapGetters({
            _inputs: "employees/getInputs",
            employees: "employees/getItems"
        })
    },

    mounted() {
        this.inputs = _.cloneDeep(this._inputs);
    },
    methods: {
        save(inputs) {
            this._save(inputs);
        },
        ...mapActions({
            _save: "employees/save"
        })
    }
};
</script>