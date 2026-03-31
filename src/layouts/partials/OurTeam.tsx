
import MainContainer from "@/components/MainContainer";
import SectionHeader from "@/components/SectionHeader";
import { motion } from "motion/react";
import {
  staggerContainerVariants,
  staggerItemVariants,
} from "@/lib/animations";

interface TeamMember {
  name: string;
  position: string;
  image: string;
}

interface OurTeamData {
  badge: string;
  title: string;
  team_list: TeamMember[];
}

const OurTeam = ({ data }: { data: OurTeamData }) => {
  const { badge, title, team_list } = data;

  return (
    <section>
      <MainContainer>
        <div className="container-padding-y container-padding-x">
          <SectionHeader title={title} badge={badge} />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px", amount: 0.1 }}
            variants={staggerContainerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-2.5"
          >
            {team_list.map((member, index) => (
              <motion.div
                key={index}
                variants={staggerItemVariants}
                whileHover="hover"
                className="bg-card/70 flex flex-col gap-5 items-start pb-5 pt-2.5 px-2.5 relative rounded-3xl w-full border border-border/6 group"
              >
                {/* Image Card */}
                <img
                  src={member.image}
                  alt={member.name}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover rounded-3xl object-top grayscale-100 group-hover:grayscale-0"
                />

                {/* Name & Position */}
                <div className="relative shrink-0 w-full">
                  <div className="flex flex-col gap-1 items-start px-4">
                    <h3 className="font-medium text-2xl">{member.name}</h3>
                    <p className="text-gray">{member.position}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </MainContainer>
    </section>
  );
};

export default OurTeam;
