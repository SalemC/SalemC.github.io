import React, { useMemo } from 'react';
import classnames from 'classnames';

import useGetAge from '../../../hooks/useGetAge';
import useStyles from './hooks/useStyles';
import { IProps } from './interfaces';

const Details: React.FC<IProps> = ({ visible }) => {
    const classes = useStyles();
    const age = useGetAge();

    const anOrA = useMemo(
        () => (age.toString().startsWith('8') || age === 18 ? 'an' : 'a'),
        [age],
    );

    return (
        <div
            className={classnames(
                classes.container,
                visible && classes.containerVisible,
            )}
        >
            <p className={classes.name}>Salem Cresswell</p>

            <p className={classes.profession}>SOFTWARE ENGINEER</p>

            <p className={classes.description}>
                Hey there! I&apos;m {anOrA} {age} year old full-stack software
                engineer. I mainly use the PHP framework Laravel &amp; the
                JavaScript framework React, paired with TypeScript.
            </p>
        </div>
    );
};

export default Details;
