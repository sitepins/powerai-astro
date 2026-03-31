
import type { CaseStudy } from "@/types/index";
import { motion } from "motion/react";
import { cardVariants } from "@/lib/animations";

const CaseStudyCard = ({ data }: { data: CaseStudy }) => {
  const { title, image } = data.frontmatter;

  return (
    <motion.div
      initial="initial"
      whileInView="visible"
      viewport={{ once: true, margin: "0px", amount: 0.05 }}
      whileHover="hover"
      variants={cardVariants}
      className="bg-card/70 border border-border/6 rounded-3xl overflow-hidden w-full flex flex-col gap-0 group relative group"
    >
      <div className="absolute top-0 left-0 -z-1 size-full bg-radial-purple-dark opacity-0 group-hover:opacity-100 transition-all duration-300" />
      {/* Image */}
      <div className="p-2.5 relative z-2">
        <a href={`/case-studies/${data.slug}`}>
          <div className="rounded-3xl overflow-hidden bg-dark/10 w-full aspect-1150/600 relative">
            {image ? (
              <img
                src={image}
                alt={title}
                width={1150}
                height={600}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray">
                <span className="text-sm">No image available</span>
              </div>
            )}
          </div>
        </a>
      </div>

      {/* Content */}
      <div className="px-5 pt-4 pb-5 flex-col gap-3">
        {/* Title */}
        <a href={`/case-studies/${data.slug}`}>
          <h3 className="font-primary font-medium leading-tight text-h5 text-text hover:text-primary transition-colors duration-200 line-clamp-2">
            {title}
          </h3>
        </a>

        <a
          href={`/case-studies/${data.slug}`}
          className="btn btn-dark mt-10 w-fit group relative overflow-hidden"
        >
          <div className="size-full bg-gradient-primary  absolute top-0 left-0 transition-all duration-500 opacity-0 group-hover:opacity-100" />
          <span className="relative z-2"> Read Case Study</span>
        </a>
      </div>
    </motion.div>
  );
};

export default CaseStudyCard;
