import { AppShell, Header } from '@mantine/core';
import './App.css';
import { Navbar } from './Header';
import { ListContainer } from './ListContainer';

function App() {
  return (
    <AppShell
      padding="md"
      header={<Header sx={{width:"100%"}} height={60} p="xs"><Navbar/></Header>}>
        <ListContainer/>
    </AppShell>
    
  );
}

export default App;
