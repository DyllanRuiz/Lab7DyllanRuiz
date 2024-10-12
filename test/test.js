var unalib = require('../unalib/index');
var assert = require('assert');

// Pruebas
describe('unalib', function() {
  // Dentro de 'unalib', vamos a probar una función específica
  describe('función is_valid_phone', function() {
    it('debería devolver true para 8297-8547', function() {
      // Esta es la comprobación
      assert.equal(unalib.is_valid_phone('8297-8547'), true);
    });
  });

  // Probar is_image_url
  describe('función is_image_url', function() {
    it('debería devolver true para una URL de imagen válida', function() {
      assert.equal(unalib.is_image_url('https://example.com/image.jpg'), true);
      assert.equal(unalib.is_image_url('https://example.com/image.png'), true);
      assert.equal(unalib.is_image_url('https://example.com/image.gif'), true);
    });

    it('debería devolver false para una URL no válida', function() {
      assert.equal(unalib.is_image_url('https://example.com/video.mp4'), false);
      assert.equal(unalib.is_image_url('https://example.com/text.txt'), false);
      assert.equal(unalib.is_image_url('not_a_url'), false);
    });
  });

  // Probar is_video_url
  describe('función is_video_url', function() {
    it('debería devolver true para una URL de video de YouTube válida', function() {
      assert.equal(unalib.is_video_url('https://www.youtube.com/watch?v=dQw4w9WgXcQ'), true);
      assert.equal(unalib.is_video_url('https://youtu.be/dQw4w9WgXcQ'), true);
    });

    it('debería devolver false para una URL no válida', function() {
      assert.equal(unalib.is_video_url('https://example.com/image.jpg'), false);
      assert.equal(unalib.is_video_url('https://example.com/text.txt'), false);
      assert.equal(unalib.is_video_url('not_a_url'), false);
    });
  });
});
