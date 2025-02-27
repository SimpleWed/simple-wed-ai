import { inject, Injectable } from '@angular/core';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytesResumable,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  storage = inject(Storage);
  uploadProgress: number | undefined;
  downloadURL: string | undefined;
  constructor() {}

  uploadFile(file: File, path: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (file) {
        const filePath = 'images/' + path;
        const storageRef = ref(this.storage, filePath);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            this.uploadProgress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          (error) => {
            console.error('Upload error:', error);
            reject(error); // Reject the promise on error
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then((downloadURL) => {
                resolve(downloadURL); // Resolve the promise with the download URL
              })
              .catch((error) => {
                console.error('Download URL error:', error);
                reject(error); // Reject if getting the download URL fails
              });
          }
        );
      } else {
        reject('No file selected.'); // Reject if no file is selected
      }
    });
  }
}
