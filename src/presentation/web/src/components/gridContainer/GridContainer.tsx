import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    wrapper: {
        overflow: 'hidden',
        maxWidth: 1280,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '0 20px',
    },
    grid: {
        paddingTop: (props: Props) => `${props.marginTop}px`,
        paddingBottom: (props: Props) => `${props.marginBottom}px`,
        minHeight: (props: Props) =>
            `calc(100vh - 70px - 4rem + ${props.spacing * 8}px - ${props.marginTop}px - ${props.marginBottom}px)`,
    },
});

type JustifyType = 'center' | 'flex-start' | 'flex-end' | 'space-around' | 'space-between' | 'space-evenly';
type AlignType = 'center' | 'flex-start' | 'flex-end' | 'stretch' | 'baseline';
type Spacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

interface Props {
    justify: JustifyType;
    align: AlignType;
    spacing: Spacing;
    marginTop: number;
    marginBottom: number;
}

const GridContainer: React.FC<Props> = ({ children, align, justify, spacing, marginTop, marginBottom }) => {
    const classes = useStyles({ align, justify, spacing, marginTop, marginBottom });
    return (
        <div className={classes.wrapper}>
            <Grid container justify={justify} alignItems={align} spacing={spacing} className={classes.grid}>
                {children}
            </Grid>
        </div>
    );
};

export default GridContainer;
