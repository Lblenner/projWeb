import ReactDOM from 'react-dom';
import React, { PureComponent } from 'react';
import ReactCrop from 'react-image-crop';


type MyProps = { setImage : any };
type MyState = { };


class InputFile extends PureComponent<MyProps, MyState> {

  imageRef
  fileUrl
  

  state = {
    src: null,
    crop: {
      unit: '%',
      width: 100,
      aspect: 9 / 4,
    },
  };

  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      if (e.target.files[0].size > 10 * 1024 * 1024) {
        console.log("Fichier trop gros")
        return
      }
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        this.setState({ src: reader.result })
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // If you setState the crop in here you should return false.
  onImageLoaded = image => {
    this.imageRef = image;
  };

  onCropComplete = crop => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop) => {
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const resultImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        'newFile.jpeg'
      );
      this.props.setImage(resultImageUrl)
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          console.error('Canvas is empty');
          return;
        }
        //blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, 'image/jpeg');
    });
  }

  render() {
    const { crop, src } = this.state;

    return (
      <div className="App">
        <div className="form-group">
          <label htmlFor="myimg">Image (max 10MB)</label>
          <input type="file" className="form-control-file" id="myimg"
            onChange={this.onSelectFile}
            accept="image/*" />
        </div>
        {src && (
          <ReactCrop
            style={{ maxWidth: 300, maxHeight: 300, }}
            src={src}
            crop={crop}
            ruleOfThirds
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
          />
        )}
      </div>
    );
  }
}


export default InputFile
