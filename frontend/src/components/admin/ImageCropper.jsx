import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { X, Check, ZoomIn, ZoomOut } from 'lucide-react';

const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });

const getCroppedImg = async (imageSrc, pixelCrop) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return null;
  }

  // Force a reasonable profile image size to prevent localStorage quota exceeded
  const TARGET_SIZE = 256;
  canvas.width = TARGET_SIZE;
  canvas.height = TARGET_SIZE;

  // Draw the cropped image onto the canvas scaled down
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    TARGET_SIZE,
    TARGET_SIZE
  );

  // Return highly compressed base64 string
  return canvas.toDataURL('image/jpeg', 0.8);
};

export function ImageCropper({ imageSrc, onCropComplete, onCancel }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropCompleteInternal = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    try {
      const croppedImageBase64 = await getCroppedImg(imageSrc, croppedAreaPixels);
      onCropComplete(croppedImageBase64);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="glass-card w-full max-w-lg rounded-2xl border border-borders overflow-hidden flex flex-col h-[80vh] max-h-[600px]">
        <div className="p-4 border-b border-borders/50 flex items-center justify-between">
          <h3 className="font-bold text-text">Crop Profile Image</h3>
          <button onClick={onCancel} className="p-1 hover:bg-background rounded-lg text-text/60 hover:text-text transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="relative flex-1 bg-background/50">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onCropComplete={onCropCompleteInternal}
            onZoomChange={setZoom}
          />
        </div>

        <div className="p-6 space-y-4 bg-cards border-t border-borders/50">
          <div className="flex items-center gap-4">
            <ZoomOut className="w-5 h-5 text-text/60" />
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e) => setZoom(e.target.value)}
              className="flex-1 accent-primary h-2 bg-background rounded-lg appearance-none cursor-pointer"
            />
            <ZoomIn className="w-5 h-5 text-text/60" />
          </div>
          
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-xl text-text font-medium hover:bg-background transition-colors border border-borders"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl transition-all shadow-[0_0_15px_rgba(37,99,235,0.2)] flex items-center gap-2"
            >
              <Check className="w-4 h-4" /> Save Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
