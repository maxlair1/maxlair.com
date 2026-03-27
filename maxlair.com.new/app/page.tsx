import ChangeThemeButton from "@root/components/ChangeThemeButton";
import styles from "./page.module.css";

import Accordion from "@root/components/Accordion";
import FeaturedCards from "@root/components/SwipeShowcase";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div style={{maxWidth: '100ch', margin: 'auto 0'}}>
          <div className={styles.intro}>
            <p>Welcome home!</p>
            <ChangeThemeButton/>
            <Accordion title="Super duper subtitle!">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis modi nulla atque, numquam voluptatibus nihil eligendi ex nesciunt pariatur. Labore assumenda temporibus maiores culpa doloribus illo incidunt officiis nobis vel tempora inventore repellat, nulla impedit repudiandae dolore saepe provident iure amet a dolores! Rem harum corrupti tempora sapiente omnis tempore.
              </p>
            </Accordion>
            <FeaturedCards></FeaturedCards>
          </div>
        </div>
      </main>
    </div>
  );
}
