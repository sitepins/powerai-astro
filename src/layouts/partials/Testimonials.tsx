
import { useEffect, useState } from "react";
import MainContainer from "@/components/MainContainer";
import { markdownify } from "@/lib/utils/textConverter";
import { AnimatePresence, motion } from "motion/react";
import { fadeInUpVariants } from "@/lib/animations";

type TestimonialItem = {
  name: string;
  avatar: string;
  content: string;
  company: {
    name?: string;
    logo: string;
    link: string;
  };
};

interface PageData {
  notFound?: boolean;
  content?: string;
  frontmatter: {
    enable?: boolean;
    testimonials?: TestimonialItem[];
    // Legacy single-item shape (kept for backward compatibility)
    name?: string;
    avatar?: string;
    content?: string;
    company?: {
      name?: string;
      logo: string;
      link: string;
    };
  };
}

const Testimonials = ({ data }: { data: PageData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const legacyItem: TestimonialItem | null =
    data.frontmatter.name &&
    data.frontmatter.avatar &&
    data.frontmatter.content &&
    data.frontmatter.company
      ? {
          name: data.frontmatter.name,
          avatar: data.frontmatter.avatar,
          content: data.frontmatter.content,
          company: data.frontmatter.company,
        }
      : null;

  const testimonials =
    data.frontmatter.testimonials && data.frontmatter.testimonials.length > 0
      ? data.frontmatter.testimonials
      : legacyItem
        ? [legacyItem]
        : [];

  useEffect(() => {
    if (testimonials.length <= 1) return;

    const intervalId = window.setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => window.clearInterval(intervalId);
  }, [testimonials.length]);

  if (!data.frontmatter.enable || testimonials.length === 0) {
    return null;
  }

  const activeTestimonial = testimonials[currentIndex % testimonials.length];

  const sliderVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 48 : -48,
      opacity: 0,
      filter: "blur(2px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -48 : 48,
      opacity: 0,
      filter: "blur(2px)",
    }),
  };

  return (
    <>
      {data.frontmatter.enable && (
        <section className="overflow-hidden">
          <MainContainer>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "0px", amount: 0.05 }}
              variants={fadeInUpVariants}
              className="container-padding-x container-padding-y"
            >
              <div className="grid lg:grid-cols-2 gap-2.5">
                <div className="bg-card/70 border border-border/6 p-2.5 rounded-3xl h-full">
                  <AnimatePresence
                    initial={false}
                    custom={direction}
                    mode="wait"
                  >
                    <motion.div
                      key={`avatar-${currentIndex}`}
                      custom={direction}
                      variants={sliderVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      className="bg-primary-dark rounded-2xl border border-border/6 h-full flex items-start justify-center"
                    >
                      <img
                        src={activeTestimonial.avatar}
                        alt={activeTestimonial.name}
                        width={570}
                        height={748}
                        className="object-cover rounded-2xl w-full lg:h-180! object-center"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="bg-card/70 border border-border/6 rounded-3xl p-6 sm:p-12.5">
                  <AnimatePresence
                    initial={false}
                    custom={direction}
                    mode="wait"
                  >
                    <motion.div
                      key={`content-${currentIndex}`}
                      custom={direction}
                      variants={sliderVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <svg
                        width="131"
                        height="84"
                        viewBox="0 0 131 84"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M50 1C52.799 1 55.0503 1.65384 56.4668 3.21289C58.026 4.6293 58.6796 6.88063 58.6797 9.67969V18.2129C58.6797 21.0509 58.0094 23.351 56.4668 24.8936C55.0484 26.312 52.7976 26.8936 50 26.8936H35.2803C33.6499 26.8936 32.5297 27.3856 31.7656 28.2588L31.7441 28.2832L31.7207 28.3066C30.966 29.0613 30.5196 30.1965 30.5195 31.8662V34.0664H52.7734C55.5721 34.0664 57.8228 34.7207 59.2393 36.2793C60.799 37.6957 61.4531 39.9475 61.4531 42.7471V74.3203C61.4531 77.1581 60.7827 79.4575 59.2402 81C57.8218 82.4184 55.571 83 52.7734 83H9.67969C6.86738 83 4.58539 82.4129 3.04199 81.041L2.99805 81.002L2.95898 80.958C1.58707 79.4146 1.00004 77.1326 1 74.3203V34.2129C1.00008 23.2391 3.89006 14.8897 9.85352 9.37305C15.905 3.7644 23.8453 1.00002 33.5732 1H50ZM118.267 1C121.066 1 123.317 1.65386 124.733 3.21289C126.293 4.6293 126.946 6.88061 126.946 9.67969V18.2129C126.946 21.0509 126.276 23.351 124.733 24.8936C123.315 26.3119 121.064 26.8936 118.267 26.8936H103.547C101.916 26.8936 100.796 27.3856 100.032 28.2588L100.011 28.2832L99.9873 28.3066C99.2326 29.0613 98.7872 30.1965 98.7871 31.8662V34.0664H121.04C123.839 34.0664 126.09 34.7203 127.507 36.2793C129.066 37.6958 129.72 39.9478 129.72 42.7471V74.3203C129.72 77.1582 129.049 79.4574 127.507 81C126.088 82.4184 123.838 83 121.04 83H77.9463C75.134 82.9999 72.852 82.4129 71.3086 81.041L71.2646 81.002L71.2256 80.958C69.8537 79.4146 69.2666 77.1326 69.2666 74.3203V34.2129C69.2667 23.2391 72.1567 14.8897 78.1201 9.37305C84.1716 3.76439 92.1119 1.00003 101.84 1H118.267Z"
                          className="stroke-gray/40"
                          strokeWidth="2"
                        />
                      </svg>

                      <blockquote
                        className="mt-11 text-2xl text-text leading-relaxed mb-30"
                        dangerouslySetInnerHTML={markdownify(
                          activeTestimonial.content,
                        )}
                      />
                      <div>
                        <a
                          href={activeTestimonial.company.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={activeTestimonial.company.logo}
                            alt={
                              activeTestimonial.company?.name || "Company Logo"
                            }
                            width={164}
                            height={40}
                            className="h-10 object-contain mb-4"
                          />
                          <h6 className=" text-text/70 text-xl mb-2 font-medium">
                            {activeTestimonial.company.name}
                          </h6>

                          <div className="flex items-center gap-px mt-2">
                            {Array.from({ length: 5 }).map((_, index) => (
                              <svg
                                key={index}
                                width="18"
                                height="17"
                                viewBox="0 0 18 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M8.29981 0.276289C8.41955 -0.0922356 8.94092 -0.0922353 9.06066 0.276289L10.8356 5.73891C10.8891 5.90372 11.0427 6.0153 11.216 6.0153H16.9597C17.3472 6.0153 17.5083 6.51115 17.1948 6.73891L12.5481 10.115C12.4079 10.2168 12.3492 10.3974 12.4028 10.5622L14.1777 16.0248C14.2974 16.3933 13.8756 16.6998 13.5621 16.472L8.91535 13.0959C8.77516 12.9941 8.58532 12.9941 8.44512 13.0959L3.79834 16.472C3.48486 16.6998 3.06307 16.3933 3.18281 16.0248L4.95772 10.5622C5.01127 10.3974 4.9526 10.2168 4.81241 10.115L0.165631 6.73891C-0.147855 6.51114 0.013256 6.0153 0.400745 6.0153H6.14448C6.31777 6.0153 6.47135 5.90371 6.5249 5.73891L8.29981 0.276289Z"
                                  fill="#E89700"
                                />
                              </svg>
                            ))}
                          </div>
                        </a>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </MainContainer>
        </section>
      )}
    </>
  );
};

export default Testimonials;
