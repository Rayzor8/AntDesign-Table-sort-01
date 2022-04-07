import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Table, Button} from 'antd';
import axios from 'axios';
import columns from './colums';

const SearchBar = () => {
   const [characters, setCharacters] = useState([]);
   const [page, setPage] = useState(1);
   const [pageSize, setPageSize] = useState(10);

   useEffect(() => {
      const URL = `https://rickandmortyapi.com/graphql`;
      const fetchData = async () => {
         const result = await axios(URL, {
            method: 'post',
            data: {
               query: `
                  {
                     characters {
                        results {
                           id,
                           name,
                           status,
                           gender
                        }
                     }
                  }
               `,
            },
         });
         setCharacters(result.data.data.characters.results);
      };
      fetchData();
   }, []);

   

   return (
      <Container>
         <Table
            columns={columns}
            dataSource={characters}
            style={{ width: '1000px', margin: '0 auto' }}
            pagination={{
               current: page,
               pageSize: pageSize,
               onChange: (page, pageSize) => {
                  setPage(page);
                  setPageSize(pageSize);
               },
            }}
         />
      </Container>
   );
};

const Container = styled.div`
   margin-top: 1rem;
`;


export default SearchBar;
