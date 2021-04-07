import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

interface Props {
    color: string;
    width: number;
    height: number;
}

const useStyles = makeStyles({
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const PawIcon = (props: Props) => {
    const classes = useStyles(props);
    return (
        <div className={classes.wrapper}>
            <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} viewBox="0 0 160 140">
                <path
                    d="m63.131 73.951c-2.411 5.7096-4.7584 11.269-10.458 14.061-10.024 4.9104-12.383 7.2043-16.258 13.745-6.771 11.43-3.4347 32.37 18.658 36.94 7.6183 1.576 11.674 0.112 16.32-1.566 3.9477-1.425 8.3223-3.004 15.671-3.004v-78.068c-16.378 0-20.231 9.1239-23.934 17.893zm47.867 0c2.411 5.7095 4.759 11.269 10.459 14.061 10.024 4.9104 12.383 7.2043 16.257 13.745 6.771 11.43 3.435 32.37-18.658 36.94-7.618 1.576-11.673 0.112-16.32-1.566-3.9477-1.425-8.3223-3.004-15.671-3.004v-78.068c16.378 0 20.231 9.1239 23.933 17.893z"
                    clipRule="evenodd"
                    fill={props.color}
                    fillRule="evenodd"
                />
                <ellipse
                    transform="rotate(-21.19 31.357 59.73)"
                    cx="31.357"
                    cy="59.73"
                    rx="15.042"
                    ry="22.252"
                    fill={props.color}
                />
                <ellipse
                    transform="matrix(-.93239 -.36146 -.36146 .93239 141.58 59.73)"
                    rx="15.042"
                    ry="22.252"
                    fill={props.color}
                />
                <ellipse
                    transform="rotate(-10.883 64.062 27.313)"
                    cx="64.062"
                    cy="27.313"
                    rx="16.602"
                    ry="24.56"
                    fill={props.color}
                />
                <ellipse
                    transform="matrix(-.98201 -.18881 -.18881 .98201 108.88 27.314)"
                    rx="16.602"
                    ry="24.56"
                    fill={props.color}
                />
            </svg>
        </div>
    );
};

export default PawIcon;
