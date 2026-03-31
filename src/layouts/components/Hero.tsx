
import type { Button } from "@/types/index";
import MainContainer from "./MainContainer";
import { markdownify } from "@/lib/utils/textConverter";
import AnimatedButton from "./AnimatedButton";
import HeroShape from "./shape/HeroShape";
import { motion } from "motion/react";
import {
  heroBadgeVariants,
  heroTitleVariants,
  heroContentVariants,
  heroButtonsVariants,
  heroImageVariants,
  HeroShapeVariants,
} from "@/lib/animations";

const Hero = ({
  data,
}: {
  data: {
    title: string;
    image: string;
    content?: string;
    button_dark?: Button;
    button_primary?: Button;
    badge: {
      enable: boolean;
      label: string;
      images: string[];
    };
  };
}) => {
  return (
    <section className="overflow-hidden relative">
      <div className="h-full w-px bg-light/8 absolute top-0 left-1/2 -translate-x-1/2" />
      <MainContainer class_container="px-0">
        <div className="container-padding-y pb-0 px-0">
          <div className="flex justify-center items-center flex-col text-center px-4">
            {/* BADGE */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={heroBadgeVariants}
              className="bg-gradient-secondary p-px rounded-full mb-2"
            >
              <div className="px-1.5 py-1.75 bg-gradient-black-grid rounded-full flex items-center gap-2.5">
                <ul className="flex">
                  {data.badge.images.map((src, index) => (
                    <li
                      key={index}
                      className="border border-secondary rounded-full -mr-2 last:mr-0 size-6"
                    >
                      <img
                        src={src}
                        alt="avatar"
                        width={100}
                        height={100}
                        className="rounded-full object-cover size-full"
                      />
                    </li>
                  ))}
                </ul>
                <p className="gradient-text-primary pr-3">{data.badge.label}</p>
              </div>
            </motion.div>
            {/* TITLE */}
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={heroTitleVariants}
              className="hero-text  mb-4"
              dangerouslySetInnerHTML={markdownify(data.title)}
            />
            <motion.p
              initial="hidden"
              animate="visible"
              variants={heroContentVariants}
              className="text-lg sm:w-3/5"
            >
              {data.content}
            </motion.p>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={heroButtonsVariants}
              className="mt-10 flex items-center gap-5 flex-wrap justify-center"
            >
              {data.button_dark?.enable && (
                <AnimatedButton
                  classNames="btn btn-dark"
                  href={data.button_dark?.link || "/"}
                >
                  {data.button_dark?.label}
                </AnimatedButton>
              )}
              {data.button_primary?.enable && (
                <AnimatedButton
                  classNames="btn btn-primary"
                  href={data.button_primary?.link || "/"}
                >
                  {data.button_primary?.label}
                </AnimatedButton>
              )}
            </motion.div>
          </div>

          {/* IMAGE */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroImageVariants}
            className="mt-30 bg-dark/45 backdrop-blur-2xl p-5 relative z-1"
          >
            <img
              src={data.image}
              alt="banner"
              width={1250}
              height={700}
              className="object-cover w-full h-auto"
            />
          </motion.div>
        </div>
      </MainContainer>
      {/* Hero Shape */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={HeroShapeVariants}
        className="absolute bottom-20 -z-1 left-1/2 -translate-x-1/2  pointer-events-none h-100 sm:h-150 lg:h-170 xl:h-210"
      >
        <HeroShape />
      </motion.div>
    </section>
  );
};

export default Hero;
