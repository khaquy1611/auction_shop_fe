import React from 'react'
import NotFound  from './images/404.png';
import styles from './NotFound.module.sass';

function NotFoundComponents() {
    return (
        <div className={styles.center}>
            <img className={styles.mobileimg} src={NotFound} alt="404" />
            <h1 className={styles.h1}>404</h1>
        </div>
    )
}

export default React.memo(NotFoundComponents);