'use client';

import { useState, useEffect } from 'react';
import { Upload, X, Loader2, Link } from 'lucide-react';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  helperText?: string;
}

export function ImageUpload({ value, onChange, label, helperText }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);
  const [error, setError] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState(value || '');
  const [showUrlInput, setShowUrlInput] = useState(false);

  useEffect(() => {
    setPreview(value || null);
    setUrlInput(value || '');
  }, [value]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB');
      return;
    }

    setError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setPreview(data.url);
        onChange(data.url);
      } else {
        setError(data.error || 'Upload failed');
      }
    } catch (err) {
      setError('Upload failed. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setUrlInput('');
    onChange('');
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      setPreview(urlInput.trim());
      onChange(urlInput.trim());
      setShowUrlInput(false);
      setError(null);
    } else {
      setError('Please enter a valid URL');
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div className="flex items-start gap-4">
        {/* Preview */}
        {preview ? (
          <div className="relative group">
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg border-2 border-gray-300 bg-gray-900"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
            {uploading ? (
              <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
            ) : (
              <Upload className="w-8 h-8 text-gray-400" />
            )}
          </div>
        )}

        {/* Upload Button */}
        <div className="flex-1 space-y-3">
          <div className="flex gap-2">
            <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50">
              <Upload className="w-4 h-4 mr-2" />
              {uploading ? 'Uploading...' : 'Upload Image'}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                disabled={uploading}
                className="hidden"
              />
            </label>

            <button
              type="button"
              onClick={() => setShowUrlInput(!showUrlInput)}
              className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
            >
              <Link className="w-4 h-4 mr-2" />
              Use URL
            </button>
          </div>

          {showUrlInput && (
            <div className="space-y-2">
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com/image.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={handleUrlSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Set URL
              </button>
            </div>
          )}

          {preview && (
            <div className="bg-gray-100 p-2 rounded border border-gray-300">
              <p className="text-xs font-medium text-gray-700 mb-1">Current Icon URL:</p>
              <p className="text-xs text-gray-900 font-mono break-all">{preview}</p>
            </div>
          )}

          {helperText && (
            <p className="text-sm text-gray-500">{helperText}</p>
          )}

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <div className="text-xs text-gray-500">
            <p>• Supported: PNG, JPG, JPEG, WebP</p>
            <p>• Max size: 5MB</p>
            <p>• Recommended: 1200x800px</p>
          </div>
        </div>
      </div>
    </div>
  );
}
