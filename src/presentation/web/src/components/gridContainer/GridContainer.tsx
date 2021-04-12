import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    container: {
        minHeight: 'calc(100vh - 70px - 4rem)',
        display: 'flex',
        justifyContent: (props: Props) => `${props.justify}`,
        alignItems: (props: Props) => `${props.align}`,
    },
});

type JustifyType = 'center' | 'flex-start' | 'flex-end' | 'space-around' | 'space-between' | 'space-evenly';
type AlignType = 'center' | 'flex-start' | 'flex-end' | 'stretch' | 'baseline';
type Spacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

interface Props {
    justify: JustifyType;
    align: AlignType;
    spacing: Spacing;
}

const GridContainer: React.FC<Props> = ({ children, align, justify, spacing }) => {
    const classes = useStyles({ align, justify, spacing });
    return (
        <Container className={classes.container}>
            <Grid container justify={justify} alignItems={align} spacing={spacing}>
                {children}
            </Grid>
        </Container>
    );
};

export default GridContainer;
