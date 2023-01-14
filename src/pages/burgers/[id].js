import Image from 'next/image';
import styles from '../../styles/Burgers.module.css';
export default function Burger({ burger }) {
  return (
    <>
      <div className={styles.singleBurger}>
        <h1>{burger.name}</h1>
        <div className={styles.imageContainer}>
          <Image
            src={`${burger.image}`}
            alt={`${burger.name}`}
            width="250"
            height="250"
            sizes="100vw"
          />
        </div>
        <div>
          <p>{burger.desc}</p>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const res = await fetch('http://localhost:3000/items');
  const posts = await res.json();
  const paths = posts.map((burger) => {
    return { params: { id: burger.id } };
  });
  return {
    paths, //у нас 3 объекта в массиве с параметрами маршрута
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const id = context.params.id;
  const res = await fetch(`http://localhost:3000/items/${id}`);
  const burger = await res.json();
  return {
    props: {
      burger,
    },
  };
}
// запускается для каждого объекта (в нашем случае запуститься три раза) и мы можем делать каждый раз запрос данных для каждого объекта используя его айди
// мы описали params в getStaticPaths и можем их получить в getStaticProps через объект context
