import { observable, action, decorate } from "mobx";
class PhotosStore {
  photos = [];
  setPhotos(photos) {
    this.photos = photos;
  }
}
PhotosStore = decorate(PhotosStore, {
  photos: observable,
  setPhotos: action
});
const photosStore = new PhotosStore();
export { photosStore };