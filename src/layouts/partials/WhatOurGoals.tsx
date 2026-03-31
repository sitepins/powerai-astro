
import MainContainer from "@/components/MainContainer";
import SectionHeader from "@/components/SectionHeader";
import { markdownify } from "@/lib/utils/textConverter";
import { motion } from "motion/react";
import {
  fadeInLeftVariants,
  fadeInRightVariants,
  staggerItemVariants,
} from "@/lib/animations";

interface GoalData {
  badge: string;
  title: string;
  image: string;
  mission: {
    title: string;
    content: string;
    icon: string;
  };
  vision: {
    title: string;
    content: string;
    icon: string;
  };
}

const WhatOurGoals = ({ data }: { data: GoalData }) => {
  const { badge, title, image, mission, vision } = data;

  return (
    <section className="overflow-hidden">
      <MainContainer>
        <div className="container-padding-y container-padding-x">
          <SectionHeader title={title} badge={badge} />
          <div className="grid lg:grid-cols-2 gap-2.5 items-center">
            {/* Left side image */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "0px", amount: 0.05 }}
              variants={fadeInLeftVariants}
              className="border border-border/6 bg-card rounded-3xl p-2.5 h-full"
            >
              <img
                src={image}
                height={600}
                width={800}
                className="w-full rounded-3xl object-cover h-full"
                alt="goals"
              />
            </motion.div>

            {/* Right side content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "0px", amount: 0.05 }}
              variants={fadeInRightVariants}
            >
              <div className="grid gap-5">
                {/* Mission Card */}
                <motion.div
                  variants={staggerItemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "0px", amount: 0.05 }}
                  className="border border-border/6 bg-card/70 rounded-3xl p-10 hover:border-primary/20 transition-colors duration-300"
                >
                  <div className="border border-border/6 bg-gradient-dark size-14 rounded-xl flex items-center justify-center mb-6">
                    <img
                      src={mission.icon}
                      alt="Icon"
                      width={24}
                      height={24}
                    />
                  </div>
                  <h3 className="mb-4 text-2xl font-medium">{mission.title}</h3>
                  <p
                    className="text-gray/70"
                    dangerouslySetInnerHTML={markdownify(mission.content)}
                  />
                </motion.div>

                {/* Vision Card */}
                <motion.div
                  variants={staggerItemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "0px", amount: 0.05 }}
                  className="border border-border/6 bg-card/70 rounded-3xl p-10 hover:border-primary/20 transition-colors duration-300"
                >
                  <div className="border border-border/6 bg-gradient-dark size-14 rounded-xl flex items-center justify-center mb-6">
                    <img
                      src={vision.icon}
                      alt="Icon"
                      width={24}
                      height={24}
                    />
                  </div>
                  <h3 className="mb-4 text-2xl font-medium">{vision.title}</h3>
                  <p
                    className="text-gray/70"
                    dangerouslySetInnerHTML={markdownify(vision.content)}
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </MainContainer>
    </section>
  );
};

export default WhatOurGoals;
