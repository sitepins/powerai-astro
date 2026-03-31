
import React from "react";
import { motion } from "motion/react";
import { scaleInVariants } from "@/lib/animations";

const IconBox = ({ icon }: { icon: string }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px", amount: 0.05 }}
      variants={scaleInVariants}
      className="border border-border/6 bg-gradient-dark size-22.5 rounded-4xl flex items-center justify-center mb-7"
    >
      <img src={icon} alt="Icon" width={44} height={44} />
    </motion.div>
  );
};

export default IconBox;
