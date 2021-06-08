import http from "../configs/http";

class UploadFilesService {
    
  upload(file, onUploadProgress) {
    let formData = new FormData();

    formData.append("file", file);

    return http.post("/avatar/upload_file", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      onUploadProgress
    });
  }

  getFiles() {
    return http.get("/avatar/get_files");
  }
}

export default new UploadFilesService();