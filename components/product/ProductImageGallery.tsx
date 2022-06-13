import { useEffect, useState } from "react";
import Image from "next/image";
import cx from "classnames";

type ImageGallery = {
  src: string;
  alt: string;
};

type ProductImageGalleryProps = {
  className?: string;
  images: ImageGallery[];
};

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  className,
  images,
}) => {
  const [currentImage, setCurrentImage] = useState<ImageGallery>(images[0]);

  // When `images` changes, it means we have changed product page.
  // Refresh the current image by displaying the first image of the new product.
  useEffect(() => {
    setCurrentImage(images[0]);
  }, [images]);

  return (
    <div className={cx("flex flex-col", className)}>
      <div className="relative mb-4 min-h-[500px] w-full sm:min-h-[600px] lg:min-h-[768px]">
        <Image
          className="rounded-md"
          src={currentImage.src}
          alt={currentImage.alt}
          quality={90}
          layout="fill"
          objectFit="cover"
          sizes="75vw"
          priority
        />
      </div>

      <ol className="grid h-28 w-full grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-4 lg:grid-cols-6">
        {images.map((image) => (
          <li key={image.src} className="block h-full w-auto">
            <button
              type="button"
              className="relative block h-full w-full cursor-pointer"
              onClick={() => setCurrentImage(image)}
            >
              <Image
                className="rounded-md"
                src={image.src}
                alt={image.alt}
                quality={50}
                layout="fill"
                objectFit="cover"
                sizes="20vw"
                priority
              />
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ProductImageGallery;
