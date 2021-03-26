import React from 'react';
import Container from '@material-ui/core/Container';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import AlternateEmailOutlinedIcon from '@material-ui/icons/AlternateEmailOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import { makeStyles, StylesContext } from '@material-ui/styles';

const useStyles = makeStyles({
    shelterPhoto: {
    },
    mapPhoto: {
    },
});

const ContactPage = () => {
    const classes = useStyles();
    return (
        <Container>
            <Container>
                <PhoneOutlinedIcon />
                <LocationOnOutlinedIcon />
                <AlternateEmailOutlinedIcon />
                <PersonOutlineOutlinedIcon />
            </Container>
            <Container >

            </Container>
            <Container >

            </Container>

        </Container>
    );
};

export default ContactPage;