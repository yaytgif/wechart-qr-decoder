# Wechart QR Decoder

A simple QR code decoder for WeChat Mini Programs using [jsQR](https://github.com/cozmo/jsQR).

# Example Usage of decodeQRCode Function
```javascript
const { decodeQRCode } = require("./path/to/your/decodeQRCode.js");

const qrCodeContent = await decodeQRCode("https://example.com/path/to/qr-code-image.png");
console.log("Decoded QR Code Content:", qrCodeContent);
```