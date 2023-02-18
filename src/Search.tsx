import { TextField, Stack, Autocomplete } from '@mui/material';
import { SyntheticEvent, useEffect, useState, ChangeEvent } from 'react';
import axios, { AxiosError } from 'axios';
import { useDebounce } from 'usehooks-ts';
import { SetValue, Website } from './types';


interface SearchProps {
  setWebsites: SetValue<Website[]>;
  setIsListLoading: SetValue<boolean>;
}

export default function Search({ setWebsites, setIsListLoading }: SearchProps) {

  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const debouncedQuery = useDebounce<string>(searchQuery, 500);
  const [websiteToSearch, setWebsiteToSearch] = useState('');
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsSearchLoading(true);
    setSearchQuery(event.target.value);
  };

  const handleSelect = (event: SyntheticEvent, value: string | null) => {
    if (value) {
      setWebsiteToSearch(value);
    }
  };

  const checkForDuplicates = (websites: Website[], websiteToAdd: Website) => {
    const isInList = websites.some(website => website.url === websiteToAdd.url);
    if (isInList) {
      setError('looks like this website is already apart of the list');
      return websites;
    }
    return [...websites, websiteToAdd];
  };


  // Fetch API 
  useEffect(() => {
    const getGoogleAutoComplete = async () => {
      if (!debouncedQuery.length) {
        console.log('got here');
        setSearchResults([]);
        setIsSearchLoading(false);
        return;
      }
      try {
        const { data, status } = await axios(`http://localhost:3000/auto-complete?search=${debouncedQuery}`);
        if (status === 200) {
          setError('');
          const dataSet = [...new Set<string>(data)];
          setSearchResults(dataSet);
        }
      } catch (error) {
        //TODO: handle errors
        console.log(error);
      } finally {
        setIsSearchLoading(false);
      }
    };

    getGoogleAutoComplete();
  }, [debouncedQuery]);


  useEffect(() => {

    const getWebsiteData = async () => {
      if (!websiteToSearch) return;

      setError('');
      setIsListLoading(true);
      try {
        const { data, status } = await axios(`http://localhost:3000/website?url=${websiteToSearch}`);
        if (status === 200) {
          setError('');
          setWebsites(current => checkForDuplicates(current, data));
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          setError(error?.response?.data || 'something went wrong');
        } else {
          setError('something went wrong');
        }
      } finally {
        setIsListLoading(false);
      }
    };

    getWebsiteData();
  }, [websiteToSearch]);


  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <p>
        {error}
      </p>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        options={searchResults}
        loading={isSearchLoading}
        onChange={handleSelect}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            const element = event.target as HTMLSelectElement;
            handleSelect(event, element.value);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search input"
            InputProps={{
              ...params.InputProps,
              type: 'search',
              onChange: handleChange

            }} 
          />
        )}
      />
    </Stack>
  );
}

