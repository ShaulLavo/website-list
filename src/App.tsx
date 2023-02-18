import './App.css';
import { useDebounce, useLocalStorage } from 'usehooks-ts';
import Search from './Search';
import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import WebsiteList from './WebsiteList';
import { Website } from './types';
import './app.css';

export default function App() {
  const [websites, setWebsites] = useLocalStorage<Website[]>('websites', []);
  const [isListLoading, setIsListLoading] = useState(false);

  const darkTheme = createTheme({
    palette: {
      mode: true ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <Search setWebsites={setWebsites} setIsListLoading={setIsListLoading} />
        <WebsiteList setWebsites={setWebsites} isListLoading={isListLoading} websites={websites} />
      </div>
    </ThemeProvider>

  );
}



