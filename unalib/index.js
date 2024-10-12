module.exports = {
    is_valid_phone: function (phone) {
      var isValid = false;
      var re = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/i;
  
      try {
        isValid = re.test(phone);
      } catch (e) {
        console.log(e);
      } finally {
        return isValid;
      }
    },
  
    is_valid_url: function (url) {
      var re = /^(https?:\/\/)?([\w\-]+\.)+[a-z]{2,}(:\d+)?(\/\S*)?$/;
      return re.test(url);
    },
  
    is_image_url: function (url) {
      return (/\.(jpeg|jpg|gif|png|bmp|webp|svg)$/i).test(url);
    },
  
    is_video_url: function (url) {
      return url.includes('youtube.com') || url.includes('youtu.be');
    },
  
    validateMessage: function (msg) {
        var obj = JSON.parse(msg);
        
        console.log("Validando mensaje:", obj); 
    
      
        obj.nombre = this.escapeHtml(obj.nombre);
        obj.mensaje = this.escapeHtml(obj.mensaje);
        
    
        if (this.is_valid_phone(obj.mensaje)) {
            console.log("Es un teléfono!");
            obj.mensaje = this.getEmbeddedCode(obj.mensaje);
        } 
  
        else if (this.is_valid_url(obj.mensaje)) {
            if (this.is_video_url(obj.mensaje)) {
                console.log("Es un video!");
                obj.mensaje = this.getVideoEmbedCode(obj.mensaje);
            } else if (this.is_image_url(obj.mensaje)) {
                console.log("Es una imagen!");
                obj.mensaje = this.getImageEmbedCode(obj.mensaje);
            } else {
                console.log("Es una URL!");
            }
        } 
 
        else {
            console.log("Es un texto!");
        }
    
        console.log("Mensaje después de validación:", obj); 
        return JSON.stringify(obj);
    },
    
  
    escapeHtml: function (unsafe) {
      return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    },
  
    getEmbeddedCode: function (mensaje) {
      return mensaje; 
    },
  
    getVideoEmbedCode: function (url) {

      if (this.is_video_url(url)) {
        let videoId;

        if (url.includes('youtube.com/watch?v=')) {
          videoId = url.split('v=')[1].split('&')[0]; 
        } else if (url.includes('youtu.be/')) {
          videoId = url.split('youtu.be/')[1].split('?')[0]; 
        }
        return `<iframe width="200" height="113" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
      } else {
        return this.escapeHtml(url); 
      }
    },
  
    getImageEmbedCode: function (url) {
      return `<img src="${this.escapeHtml(url)}" alt="Image" style="max-width: 200px; max-height: 200px;" />`;
    }
  };
  