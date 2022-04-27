import { Button, Grid } from '@mui/material';
import { ChangeEventHandler } from 'react';
import InputField from '../../UI/input-field/input-field';

interface RegistrationHomeProps {
    changed: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    clicked: React.MouseEventHandler<HTMLButtonElement>;
    storeName: string | undefined | null;
}

export const RegistrationHome = ({ changed, clicked, storeName }: RegistrationHomeProps) => {
    return (
        <div className="main" >
            <div className='center'>
                <h1>Register With Us!</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis sit lectus ut <br />ullamcorper enim, ullamcorpe.</p>
                <Grid container spacing={1} >
                    <Grid item xs={12} sm={12} md={12} lg={8} xl={9}>
                        <InputField fullWidth onChange={changed} type="text" placeholder='Company or Business name' color='primary' />
                    </Grid>
                    <Grid item xs={12} md={12} lg={4} xl={3}>
                        <Button variant='contained' color='primary' fullWidth onClick={clicked} style={{ height: 56 }} > Register Here For Selling</Button>
                    </Grid>
                </Grid>
            </div>
        </div >
    )
}