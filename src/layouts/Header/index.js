import * as C from './style';
import {ReactComponent as Logo} from '../../assets/ftn_logo.svg';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { height } from '@mui/system';

export const Header = () => {
    return (
        <C.Container>
            <C.Header>
                <C.Logo href="">
                    <Logo />
                </C.Logo>
                <Stack spacing={2} direction="row" style={{height: '40px'}}>
                    <Button sx={{padding: '0 30px'}} size="small" variant="text">Entrar</Button>
                    <Button variant="contained">Cadastrar</Button>
                </Stack>
            </C.Header>
        </C.Container>
    );
}