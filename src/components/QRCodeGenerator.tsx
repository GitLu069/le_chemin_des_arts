
import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface QRCodeGeneratorProps {
  url: string;
  size?: number;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ url, size = 128 }) => {
  // Get the current URL base (protocol + hostname + port if any)
  const baseUrl = window.location.origin;
  // Combine with the relative URL
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;
  
  return (
    <div className="flex flex-col items-center">
      <div className="border border-gray-200 rounded-lg p-2 bg-white">
        <QRCodeSVG value={fullUrl} size={size} />
      </div>
      <div className="text-sm text-gray-500 mt-2 text-center">
        <p>Scannez pour accéder</p>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
