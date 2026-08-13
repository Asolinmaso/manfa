import Image from "next/image";
import { valueProps } from "@/data/homeContent";
import { Reveal } from "@/components/ui/Reveal";
import { SectionContainer } from "@/components/ui/SectionContainer";
import styles from "./ValueProps.module.css";
import timelessIcon from "@/icons/td.png";
import craftIcon from "@/icons/ec.png";
import livingIcon from "@/icons/il.png";

const icons = [
  <Image key="timeless" src={timelessIcon} alt={valueProps[0].title} width={60} height={60} />,
  <Image key="craft" src={craftIcon} alt={valueProps[1].title} width={60} height={60} />,
  <Image key="living" src={livingIcon} alt={valueProps[2].title} width={60} height={60} />,
];

export function ValueProps() {
  return (
    <SectionContainer className={styles.section}>
      <div className={styles.grid}>
        {valueProps.map((item, index) => (
          <Reveal key={item.title} variant="up" delay={index * 120} className={styles.itemReveal}>
            <article className={styles.item}>
              <div className={`${styles.icon} anim-float`} style={{ animationDelay: `${index * 700}ms` }}>
                {icons[index]}
              </div>
              <div className={styles.text}>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.description}>{item.description}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionContainer>
  );
}
