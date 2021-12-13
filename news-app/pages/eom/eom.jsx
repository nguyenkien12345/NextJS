import React from 'react';
import Toolbar from '../../components/toolbar';
import styles from '../../styles/EOM.module.css';

export const getServerSideProps = async context => {
    try{
        const response = await fetch('https://my-json-server.typicode.com/portexe/next-news/employeeOfTheMonth');
        const data = await response.json();
        return {props: {employee: data}};
    }
    catch(error){
        console.log(error);
    }
}

function Eom({employee}) {
    return (
        <div className='page-container'>
            <Toolbar/>
            <div className={styles.main}>
                <h1>Employee Of The Month</h1>
                <div className={styles.employeeOfTheMonth}>
                    <h3>{employee.name}</h3>
                    <h6>{employee.position}</h6>
                    <img src={employee.image}/>
                    <p>{employee.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Eom;
