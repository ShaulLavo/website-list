import {
  List,
  ListItem,
  ListItemIcon,
  Link
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { SetValue, Website } from './types';
import { Rings } from 'react-loader-spinner';
import './WebsiteList.css';
interface WebsiteListProps {
  websites: Website[];
  isListLoading: boolean;
  setWebsites: SetValue<Website[]>;
}
export default function WebsiteList({ websites, setWebsites, isListLoading }: WebsiteListProps) {

  const deleteItem = (url: string) => {
    const filteredWebsites = websites.filter(website => website.url !== url);
    setWebsites(filteredWebsites);
  };

  const Placeholder = () => (
    <div>
      <p>Looks like your list is empty</p>
      <p>Search for a website or enter a URL</p>
    </div>
  );


  const ListComponent = () => {
    return (
      <List>
        {websites.map(website => {
          return (
            <ListItem
              disablePadding
              key={website.url}
              style={{ justifyContent: 'space-between' }}
            >
              <ListItemIcon>
                <img src={website.favicon} />
              </ListItemIcon>
              <Link
                underline="hover"
                color="text.primary"
                href={website.url}
                style={{ width: '100%' }}
              >
                {website.title}
              </Link>
              <ListItemIcon
                style={{ justifyContent: 'flex-end' }}
              >
                <ClearIcon
                  onClick={() => deleteItem(website.url)}
                  className='clearIcon'
                />
              </ListItemIcon>

            </ListItem>
          );
        })}
      </List>
    );
  };

  return (
    <div style={{ position: 'relative', display: 'flex' }}>
      {!!websites?.length ? <ListComponent /> : <Placeholder />}
      {isListLoading &&
        <Rings
          height="100%"
          width="100%"
          color="#888"
          wrapperStyle={{
            justifyContent: 'center',
            position: 'absolute',
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}
        />}
    </div>

  );
}
