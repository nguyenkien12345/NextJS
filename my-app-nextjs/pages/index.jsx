import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Layout from "../components/Layout";

function Home() {
  return (
      <Layout>
        <div className="jumbotron">
          <h1 className="display-4">My Next App</h1>
          <p className="lead">Nguyễn Trung Kiên</p>
          <hr className="my-4"/>
          <p className="lead">
            <Link href='/posts'>
              <Button color="primary">Posts</Button>
            </Link>
          </p>
        </div>
      </Layout>       
  )
}

export default Home;