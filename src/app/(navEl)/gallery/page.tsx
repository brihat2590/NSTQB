"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface ImageData {
  size: string;
  src: string;
}

interface GridItemProps {
  colSpan: number;
  rowSpan: number;
  imageIndex: number;
}

interface GridProps {
  startIndex?: number;
}

const Gallery = () => {
  const images: ImageData[] = [
    // your images (unchanged)
    { size: "400x250", src: "https://res.cloudinary.com/dmre04yky/image/upload/v1773937050/DSC00140_lzdmyl.jpg" },
    { size: "350x250", src: "https://res.cloudinary.com/dmre04yky/image/upload/v1773937080/DSC07553_cw2q6e.jpg" },
    { size: "300x250", src: "https://res.cloudinary.com/dmre04yky/image/upload/v1773937050/DSC07455_k4uvjw.jpg" },
    { size: "300x250", src: "https://res.cloudinary.com/dmre04yky/image/upload/v1773937051/DSC07506_x1zu7j.jpg" },
    { size: "600x250", src: "https://res.cloudinary.com/dmre04yky/image/upload/v1773937051/DSC07487_isidg6.jpg" },

    { size: "300x300", src: "https://res.cloudinary.com/dmre04yky/image/upload/v1773937050/DSC00122_mzk4iq.jpg" },
    { size: "300x200", src: "https://res.cloudinary.com/dmre04yky/image/upload/v1773937082/DSC07591_cy0uw7.jpg" },
    { size: "300x200", src: "https://res.cloudinary.com/dmre04yky/image/upload/v1773937109/DSC07817_a1kpkc.jpg" },
    { size: "400x250", src: "https://res.cloudinary.com/dmre04yky/image/upload/v1773937086/DSC07653_znklu6.jpg" },
    { size: "400x250", src: "https://res.cloudinary.com/dmre04yky/image/upload/v1773937086/DSC07659_h16wfz.jpg" },
    { size: "400x250", src: "https://res.cloudinary.com/dmre04yky/image/upload/v1773937087/DSC07721_grcdct.jpg" },
    { size: "200x250", src: "https://res.cloudinary.com/dmre04yky/image/upload/v1773937087/DSC07718_ln7zm1.jpg" },
    { size: "300x250", src: "https://res.cloudinary.com/dmre04yky/image/upload/v1773937088/DSC07743_vtgtya.jpg" },
    { size: "600x250", src: "https://res.cloudinary.com/dmre04yky/image/upload/v1773937108/DSC07758_kvpug4.jpg" },
    { size: "600x400", src: "https://res.cloudinary.com/dmre04yky/image/upload/v1773937082/DSC07564_nhnt6y.jpg" },
    { size: "600x400", src: "https://res.cloudinary.com/dmre04yky/image/upload/v1773935424/DSC00145_wn7l1c.jpg" },
    { size: "300x400", src: "https://res.cloudinary.com/dmre04yky/image/upload/v1773937047/DSC00047_xfu5il.jpg" },
    { size: "300x200", src: "https://res.cloudinary.com/dmre04yky/image/upload/v1773937031/DSC00047_fzbijq.jpg" },
    { size: "400x250", src: "https://res.cloudinary.com/dmre04yky/image/upload/v1773937049/DSC00089_gta4sj.jpg" },
    { size: "400x250", src: "https://res.cloudinary.com/dmre04yky/image/upload/v1773937050/DSC00088_ajrm4s.jpg" },

    { size: "600x400", src: "https://res.cloudinary.com/dmre04yky/image/upload/v1773937109/DSC07793_olsgyf.jpg" },
    { size: "300x400", src: "https://res.cloudinary.com/dmre04yky/image/upload/v1774006986/IMG_4570_z2w2po.jpg" },
    { size: "300x200", src: "https://res.cloudinary.com/dmre04yky/image/upload/v1773937109/DSC07817_a1kpkc.jpg" },
    { size: "300x200", src: "https://res.cloudinary.com/dmre04yky/image/upload/v1773937112/DSC07905_cq1xr3.jpg" },
    { size: "400x250", src: "https://res.cloudinary.com/dmre04yky/image/upload/v1773937112/DSC08114_d5cu2o.jpg" },
    { size: "400x250", src: "https://res.cloudinary.com/dmre04yky/image/upload/v1773937114/DSC08141_gjt2z8.jpg" },
    { size: "400x250", src: "https://res.cloudinary.com/dmre04yky/image/upload/v1773937114/DSC08202_bqngqt.jpg" },
    { size: "300x250", src: "https://res.cloudinary.com/dmre04yky/image/upload/v1773937115/DSC08207_mwyi2k.jpg" },
    { size: "300x250", src: "https://res.cloudinary.com/dmre04yky/image/upload/v1773938196/DSC00038_q0f5xc.jpg" },
    { size: "600x250", src: "https://res.cloudinary.com/dmre04yky/image/upload/v1773938197/DSC00049_mv7xy7.jpg" },
    { size: "600x400", src: "https://res.cloudinary.com/dmre04yky/image/upload/v1774006986/IMG_4577_ajhdby.jpg" },
    { size: "300x400", src: "https://res.cloudinary.com/dmre04yky/image/upload/v1774006987/IMG_4638_d1goha.jpg" },
    { size: "300x200", src: "https://res.cloudinary.com/dmre04yky/image/upload/v1774006986/IMG_4591_oofb26.jpg" },
    {size: "400x250", src: "https://res.cloudinary.com/dmre04yky/image/upload/v1774006986/IMG_4519_nwb48z.jpg" },
  ];

  const PlaceholderImage = ({ size, src }: ImageData) => {
    const [w, h] = size.split("x").map(Number);
    return (
      <div className="w-full h-full relative" style={{ aspectRatio: `${w}/${h}` }}>
        <Image
          src={src}
          alt="Gallery"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
    );
  };

  const GridItem = ({ colSpan, rowSpan, imageIndex }: GridItemProps) => {
    const image = images[imageIndex];
    if (!image) return null;

    return (
      <motion.div
        className="rounded-xl overflow-hidden"
        style={{
          gridColumn: `span ${colSpan}`,
          gridRow: `span ${rowSpan}`,
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.4 }}
      >
        <PlaceholderImage {...image} />
      </motion.div>
    );
  };

  const GalleryGrid = ({ startIndex = 0 }: GridProps) => (
    <div className="hidden lg:grid grid-cols-12 auto-rows-fr gap-5">
      <GridItem colSpan={6} rowSpan={4} imageIndex={startIndex + 0} />
      <GridItem colSpan={3} rowSpan={4} imageIndex={startIndex + 1} />
      <GridItem colSpan={3} rowSpan={2} imageIndex={startIndex + 2} />
      <GridItem colSpan={3} rowSpan={2} imageIndex={startIndex + 3} />
      <GridItem colSpan={4} rowSpan={3} imageIndex={startIndex + 4} />
      <GridItem colSpan={4} rowSpan={3} imageIndex={startIndex + 5} />
      <GridItem colSpan={4} rowSpan={3} imageIndex={startIndex + 6} />
      <GridItem colSpan={3} rowSpan={3} imageIndex={startIndex + 7} />
      <GridItem colSpan={3} rowSpan={3} imageIndex={startIndex + 8} />
      <GridItem colSpan={6} rowSpan={3} imageIndex={startIndex + 9} />
    </div>
  );

  const TabletGrid = ({ startIndex = 0 }: GridProps) => (
    <div className="hidden md:grid lg:hidden grid-cols-2 gap-4">
      {images.slice(startIndex, startIndex + 10).map((img, i) => (
        <div key={i} className="aspect-square relative">
          <Image src={img.src} alt="" fill sizes="50vw" className="object-cover rounded-xl" />
        </div>
      ))}
    </div>
  );

  const MobileGrid = ({ startIndex = 0 }: GridProps) => (
    <div className="grid md:hidden grid-cols-1 gap-4">
      {images.slice(startIndex, startIndex + 10).map((img, i) => (
        <div key={i} className="aspect-square relative">
          <Image src={img.src} alt="" fill sizes="100vw" className="object-cover rounded-xl" />
        </div>
      ))}
    </div>
  );

  const CHUNK = 10;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-4xl font-semibold text-center mb-10">Our Gallery</h2>

      <div className="space-y-10">
        {Array.from({ length: Math.ceil(images.length / CHUNK) }).map((_, i) => {
          const start = i * CHUNK;
          return (
            <div key={i}>
              <GalleryGrid startIndex={start} />
              <TabletGrid startIndex={start} />
              <MobileGrid startIndex={start} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;