import * as React from 'react';

import styles from "./page.module.css";

import Button from "@components/Button";
import Accordion from "@components/Accordion";
import ChangeThemeButton from "@components/ChangeThemeButton";
import Skeleton from "@components/Skeleton";
import Showcase from "@components/Showcase";
import CircularProgress from "@components/CircularProgress";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>Welcome home!</h1>
            <Showcase></Showcase>
          <ChangeThemeButton/>
          <Accordion title="Super duper subtitle!">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis modi nulla atque, numquam voluptatibus nihil eligendi ex nesciunt pariatur. Labore assumenda temporibus maiores culpa doloribus illo incidunt officiis nobis vel tempora inventore repellat, nulla impedit repudiandae dolore saepe provident iure amet a dolores! Rem harum corrupti tempora sapiente omnis tempore.
            </p>
            <code>Test Code</code>
          </Accordion>
          <Skeleton preset="paragraph"/>
          <Button>Reach out!</Button>
          <CircularProgress thickness={4} size={38} value={70}>
            {/* <small>1/2</small> */}
          </CircularProgress>
        </div>
      </main>
    </div>
  );
}
