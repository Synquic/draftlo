import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1a202c',
          padding: '4px',
        }}
      >
        {/* Draftlo Logo - Blue angle brackets */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 100 100"
          fill="none"
        >
          {/* Left bracket */}
          <path
            d="M 60 20 L 30 50 L 60 80"
            stroke="#3b82f6"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Right bracket */}
          <path
            d="M 40 20 L 70 50 L 40 80"
            stroke="#3b82f6"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
