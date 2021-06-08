<template>
  <div>
    <v-card width="500" class="mx-auto">
      <v-card-text>
        <v-form @submit.prevent="uploadFile">
          <v-file-input
            :rules="rules"
            accept="image/png, image/jpeg, image/bmp"
            placeholder="Pick an avatar"
            prepend-icon="mdi-camera"
            label="Avatar"
            v-model="file"
          />
          <v-btn type="submit">Upload</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import UploadService from "../services/UploadFilesService";
export default {
  data: () => ({
    file: null,
    rules: [
      (value) =>
        !value ||
        value.size < 2000000 ||
        "Avatar size should be less than 2 MB!",
    ],
  }),
  mounted() {
    UploadService.getFiles().then((response) => {
      this.fileInfos = response.data;
    });
  },
  methods: {
    // selectFile(file) {
    //   this.progress = 0;
    //   this.currentFile = file;
    // },
    // uploadFile() {
    //   if (!this.currentFile) {
    //     this.message = "Please select a file!";
    //     return;
    //   }

    //   this.message = "";

    //   UploadService.upload(this.currentFile, (event) => {
    //     this.progress = Math.round((100 * event.loaded) / event.total);
    //   })
    //     .then((response) => {
    //       this.message = response.data.message;
    //       return UploadService.getFiles();
    //     })
    //     .then((files) => {
    //       this.fileInfos = files.data;
    //     })
    //     .catch(() => {
    //       this.progress = 0;
    //       this.message = "Could not upload the file!";
    //       this.currentFile = undefined;
    //     });
    // },
  },
};
</script>