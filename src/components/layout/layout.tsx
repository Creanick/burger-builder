import React, { Fragment } from 'react';
import Toolbar from '../navigation/toolbar/toolbar';
import classes from './layout.module.css';
interface Props {
}
const Layout: React.FunctionComponent<Props> = ({ children }) => (
    <Fragment>
        <Toolbar/>
        <main className={classes.mainContent}>
            {children}
        </main>
    </Fragment>
);

export default Layout;