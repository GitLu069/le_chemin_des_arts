import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface QRCodeGeneratorProps {
  url: string;
  size?: number;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ url, size = 128 }) => {
  // Base URL pour le déploiement sur GitHub Pages avec HashRouter
  const baseUrl = window.location.origin + '/le_chemin_des_arts/#';
  
  // Si l'URL commence déjà par http, on garde l'URL telle quelle
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
