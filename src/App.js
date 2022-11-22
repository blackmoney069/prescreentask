import { AppShell, Header } from '@mantine/core';
import './App.css';
import { Navbar } from './Header';

function App() {
  return (
    <AppShell
      padding="md"
      header={<Header sx={{width:"100%"}} height={60} p="xs"><Navbar/></Header>}>

    </AppShell>
  );
}

export default App;
