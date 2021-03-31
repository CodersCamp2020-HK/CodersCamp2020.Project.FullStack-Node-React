import React from 'react';
import { Button, Paper, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const AdoptionApplicationFirstStep: React.FC = () => {
    return (
        <Paper variant="outlined">
            <Typography>
                Przypominamy, że szukamy dla zwierząt dobrych (czyli sprawdzonych) domów na całe ich życie. Adopcja to zobowiązanie wobec żywej, czującej istoty, na co najmniej 10-15 lat. Jest to również zobowiązanie wobec nas i obecnego właściciela zwierzęcia. Przygarniając bezdomne, skrzywdzone zwierzę, składamy mu jednocześnie obietnicę, że zadbamy o jego przyszłość i że nic złego już je nie spotka. Chcemy dotrzymać słowa i liczymy na to, że Państwo nam w tym pomożecie.
            </Typography>
            <Typography>
                Wpisz numer ewidencyjny zwierzęcia
            </Typography>
            <TextField variant="outlined" size="medium" color="secondary" value="Nr ewidencyjny"></TextField>
            <Button>SPRAWDŹ</Button>
        </Paper>
    )
}

export default AdoptionApplicationFirstStep;