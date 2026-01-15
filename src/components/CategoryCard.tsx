'use client';

import Link from "next/link";

interface CategoryCardProps {
  name: string;
  href: string;
  icon: string;
  description?: string;
}

export const CategoryCard = ({
  name,
  href,
  icon,
  description,
}: CategoryCardProps) => {
  return (
    <Link href={href} className="block h-full">
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group h-full flex flex-col">
        {/* Dark icon box with white icons */}
        <div className="bg-gray-900 h-32 flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300 flex-shrink-0">
          <img
            src={icon}
            alt={name}
            className="h-16 w-auto object-contain brightness-0 invert"
          />
        </div>

        {/* Title and Description */}
        <div className="p-5 flex-grow flex flex-col">
          <h3 className="text-base text-center font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
            {name}
          </h3>
          {description && (
            <p className="text-sm text-gray-600 text-center line-clamp-3 flex-grow">
              {description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};
