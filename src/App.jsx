import { useState } from 'react'
import { Button, Box, TextField, Card, CardContent, Typography} from '@mui/material';
import Alert from '@mui/material/Alert';  
import axios from 'axios';
import './App.css'


function App() {
  const [endereco, setEndereco] = useState({});
  const [erro, setErro] = useState(false);
  const [cep, setCep] = useState('');
  
  const axiosClient = axios.create({
    baseURL: "https://viacep.com.br/ws"
  });

  const pesquisaCep = () => {
    setEndereco(null);
    axiosClient.get(`/${cep}/json/`)
    .then((data) => {
      setErro(false);
      setEndereco(data.data);
    })
    .catch(setErro(true))
    .finally();
  };

  return (
    <Box>
      <Card sx={{ padding: "16px", marginBottom: "16px"}}>
        <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
          Consultar CEP
        </Typography>
        <TextField id="filled-basic" label="Cep" variant="filled" onChange={(e) => setCep(e.target.value)}/>
        <Button variant="outlined" onClick={pesquisaCep} sx={{margin: "1rem"}}>Consultar</Button>        
      </Card>
      {(endereco && endereco.localidade != undefined) &&
      <Card >
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Logradouro
          </Typography>
          <Typography variant="h5" component="div">
            {endereco.logradouro}          
          </Typography>

          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Bairro
          </Typography>
          <Typography variant="h5" component="div">
          {endereco.bairro}
          </Typography>

          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Cidade
          </Typography>
          <Typography variant="h5" component="div">
            {endereco.localidade}
          </Typography>

          <Typography sx={{ fontSize: 14,}} color="text.secondary" gutterBottom>
            Complemento
          </Typography>
          <Typography variant="h5" component="div">
            {endereco.uf}
          </Typography>

        </CardContent>
      </Card>
      }
      {erro && <Alert severity="error"> Ocorreu um erro ao buscar este cep</Alert>}

    </Box>
  )
}

export default App