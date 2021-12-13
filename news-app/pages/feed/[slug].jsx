import React from 'react';
import Toolbar from '../../components/Toolbar';
import styles from '../../styles/Feed.module.css';
import { useRouter } from 'next/router';

export const getServerSideProps = async context => {
    try{
        // Vì ta đặt tên file là [slug].jsx nên ở đây phải để là slug nếu đặt tên file là [id].jsx thì ở đây phải để là id
        const pageNumber = context.query.slug;
        if(!pageNumber || pageNumber < 1 || pageNumber > 5){
            return { props: 
                {
                    articles: [], 
                    pageNumber:1
                } 
            }
        }
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&pageSize=5&page=${pageNumber}`,
            {
              headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`,
              },
            },
          );
        const data = await response.json();
        const {articles} = data;
        return { 
            props: { articles: articles, pageNumber: parseInt(pageNumber) }
         }
    }
    catch(error){
        console.log(error);
    }
}

function Feed({pageNumber, articles}) {

    const router = useRouter();

    const handleDetail = (url) => {
        window.location.href = url;
    }

    const handlePreviousPage = (pageNumber) => {
        if(pageNumber > 1){
            router.push(`/feed/${pageNumber - 1}`).then(() => window.scrollTo(0,0));
        }
    }

    const handleNextPage = (pageNumber) => {
        if(pageNumber < 5){
            router.push(`/feed/${pageNumber + 1}`).then(() => window.scrollTo(0,0));
        }
    }

    return (
        <div className='page-container'>
            <Toolbar/>
            <div className={styles.main}>
                {articles.map((article,index) => 
                    <div className={styles.post} key={index}>
                        <h1 onClick={() => handleDetail(article.url)}>{article.title}</h1>
                        <p>{article.description}</p>
                        {article.urlToImage && <img src={article.urlToImage} onClick={() => handleDetail(article.url)} />}
                    </div>
                )}
            </div>

            <div className={styles.paginator}>
                <div onClick={() => handlePreviousPage(pageNumber)} 
                    className={pageNumber === 1 ? styles.disabled : styles.active}>
                    Previous Page
                </div>

                <div>#{pageNumber}</div>

                <div onClick={() => handleNextPage(pageNumber)} 
                    className={pageNumber === 5 ? styles.disabled : styles.active}>
                    Next Page
                </div>
            </div>
        </div>
    )
}

export default Feed;
