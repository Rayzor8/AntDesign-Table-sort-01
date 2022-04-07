import { SearchOutlined } from '@ant-design/icons';
import { Input, Tag, Button } from 'antd';
import styled from 'styled-components';

const columns = [
   {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      sorter: (record1, record2) => record1.id > record2.id,
   },
   {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filterDropdown: ({ selectedKeys, setSelectedKeys, confirm }) => {
         return (
            <DropDownSearch>
               <Input
                  size="large"
                  autoFocus
                  placeholder="Search Name here..."
                  onPressEnter={() => confirm()}
                  onBlur={() => confirm()}
                  value={selectedKeys[0]}
                  onChange={(e) =>
                     setSelectedKeys(e.target.value ? [e.target.value] : [])
                  }
               ></Input>

               <ButtonSearch
                  onClick={() => confirm()}
                  type="primary"
                  size="large"
               >
                  Search
               </ButtonSearch>
            </DropDownSearch>
         );
      },
      filterIcon: () => {
         return <SearchOutlined style={{ width: '100%' }} />;
      },
      onFilter: (value, record) =>
         record.name.toLowerCase().includes(value.toLowerCase()),
   },
   {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
         let color = 'green';
         if (status === 'Dead') color = 'red';
         if (status === 'unknown') color = 'default';
         return (
            <Tag color={color} key={status}>
               {status?.toUpperCase()}
            </Tag>
         );
      },
   },
   {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      filters: [
         { text: 'Male', value: 'Male' },
         { text: 'Female', value: 'Female' },
      ],
      onFilter: (value, record) => {
         return record.gender === value;
      },
   },
];

const DropDownSearch = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
`;

const ButtonSearch = styled(Button)`
   position: static;
   display: block;
   border: 0;
   height: 100%;
`;

export default columns;
