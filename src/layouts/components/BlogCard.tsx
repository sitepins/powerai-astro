
import type { Post } from "@/types/index";
import dateFormat from "@/lib/utils/dateFormat";
import { plainify } from "@/lib/utils/textConverter";
import { motion } from "motion/react";
import { cardVariants } from "@/lib/animations";

const BlogCard = ({ data }: { data: Post }) => {
  const { title, image, author, date } = data.frontmatter;

  return (
    <motion.div
      initial="initial"
      whileInView="visible"
      viewport={{ once: true, margin: "0px", amount: 0.05 }}
    
      variants={cardVariants}
      className="bg-card/70 border border-border/6 rounded-3xl overflow-hidden w-full flex flex-col gap-0 group relative group"
    >
      <div className="absolute inset-0 size-full bg-radial-purple-dark transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
      {/* Image */}
      <div className="p-2.5">
        <a href={`/blog/${data.slug}`}>
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
      <div className="px-5 pt-4 pb-5 flex flex-col gap-3 relative z-2">
        {/* Title */}
        <a href={`/blog/${data.slug}`}>
          <h3 className="font-primary font-medium leading-tight text-h5 text-text hover:text-primary transition-colors duration-200 line-clamp-2">
            {title}
          </h3>
        </a>

        <p className="line-clamp-2 text-gray">{plainify(data.content || "")}</p>

        {/* Author & Date Row */}
        <div className="flex items-center justify-between w-full mt-16">
          <div className="flex items-center gap-2.5">
            {author?.avatar && (
              <div className="shrink-0 size-8 rounded-full overflow-hidden border border-border/6">
                <img
                  src={author.avatar}
                  alt={author.name}
                  width={32}
                  height={32}
                  className="object-cover size-full"
                />
              </div>
            )}
            {author && (
              <div className="flex flex-col">
                <p className="font-primary font-medium text-sm text-text leading-tight">
                  {author.name}
                </p>
                {author.designation && (
                  <p className="font-primary font-normal text-xs text-gray leading-tight">
                    {author.designation}
                  </p>
                )}
              </div>
            )}
          </div>
          {date && (
            <p className="font-primary font-normal text-xs text-gray opacity-[0.78] whitespace-nowrap">
              {dateFormat(date)}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;
