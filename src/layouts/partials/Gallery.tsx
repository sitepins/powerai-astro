
import Badge from "@/components/Badge";
import MainContainer from "@/components/MainContainer";
import type { GalleryType } from "@/types/index";
import { motion } from "motion/react";
import {
  sectionHeaderVariants,
  staggerContainerVariants,
  staggerItemVariants,
} from "@/lib/animations";

const Gallery = ({ data }: { data: GalleryType }) => {
  const { enable, badge, title, images } = data;

  return (
    enable && (
      <section>
        <MainContainer>
          <div className="container-padding-y container-padding-x">
            {/* Header */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "0px", amount: 0.05 }}
              variants={sectionHeaderVariants}
              className="text-center mb-14"
            >
              {badge && <Badge>{badge}</Badge>}
              <h2
                className="text-h1 font-medium lg:w-4/5 mx-auto"
                dangerouslySetInnerHTML={{ __html: title }}
              />
            </motion.div>

            {/* Gallery Grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px", amount: 0.1 }}
              variants={staggerContainerVariants}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-2.5 grid-rows-5 "
            >
              {images.map((image, index) => (
                <motion.div
                  key={image}
                  variants={staggerItemVariants}
                  className={`${index % 2 === 0 ? "md:row-span-2" : "md:row-span-3 "} ${index === 4 ? "lg:row-span-3!" : ""}`}
                >
                  <img
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </MainContainer>
      </section>
    )
  );
};

export default Gallery;
