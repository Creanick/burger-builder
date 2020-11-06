import React, { Fragment } from 'react';
import classes from './layout.module.css';
interface Props {
}
const Layout: React.FunctionComponent<Props> = ({ children }) => (
    <Fragment>
        <div>toolbar , side drawer , backdrop</div>
        <main className={classes.mainContent}>
            {children}
        </main>
    </Fragment>
);

export default Layout;