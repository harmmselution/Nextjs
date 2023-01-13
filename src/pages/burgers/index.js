import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/Burgers.module.css';

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:3000/items');
  const data = await res.json();

  return {
    props: { burgers: data },
  };
};

const Burgers = ({ burgers }) => {
  return (
    <div>
      <h1>Наши Бургеры</h1>
      {burgers.map((burger) => (
        <Link href={`/burgers/${burger.id}`} key={burger.id} className={styles.burgerCard}>
          <div className={styles.imageContainer}>
            <Image
              src={`${burger.image}`}
              alt={`${burger.name}`}
              width="250"
              height="250"
              layout="responsive"
              objectFit="cover"
            />
          </div>
          <div>
            <h3>{burger.name}</h3>
            <p>{burger.desc}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Burgers;
