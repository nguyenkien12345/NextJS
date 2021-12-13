import Toolbar from "../components/toolbar";
import styles from "../styles/Home.module.css";

function Home() {
  return (
    <div className="page-container">
      <Toolbar/>
      <div className={styles.main}>
        <h1>Next.Js News App</h1>
        <h3>Your One Stop Shop For The Latest News Articles</h3>
      </div>
    </div>
  );
}

export default Home;
