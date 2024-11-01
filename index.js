const jsQR = require("./jsQR.js");

/**
 * 解析二维码图片
 * @param {string} url - 二维码图片的 URL
 * @returns {Promise<string>} 解析成功时返回二维码内容；解析失败时返回错误信息
 */
function decodeQRCode(url) {
  return new Promise((resolve, reject) => {
    const canvas = wx.createOffscreenCanvas({
      type: "2d",
      width: 300,
      height: 300,
    }); 
    const ctx = canvas.getContext("2d");

    const image = canvas.createImage();

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;

      ctx.drawImage(image, 0, 0, image.width, image.height);

      const imageData = ctx.getImageData(0, 0, image.width, image.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (code) {
        resolve(code.data);
      } else {
        reject("No valid QR code detected");
      }

      image.src = ""; 
      canvas.width = 0;
      canvas.height = 0;
    };

    image.onerror = () => {
      reject("Failed to load image");

      image.src = "";
      canvas.width = 0;
      canvas.height = 0;
    };

    image.src = url;
  });
}

module.exports = { decodeQRCode };
