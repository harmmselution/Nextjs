export default function Burger() {
  return <div>Burger </div>;
}

export async function getStaticPaths() {
  const res = await fetch('http://localhost:3000/items');
  const posts = await res.json();
  const paths = posts.map((post) => ({
    param: { id: post.id },
  }));
  return {
    paths,
  };
}
