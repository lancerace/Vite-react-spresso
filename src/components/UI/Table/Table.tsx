import { Table, Pagination, Form } from 'react-bootstrap';
import useTable from './Table.hooks';
import { BsSearch } from 'react-icons/bs';
import styles from './Table.module.scss';

const SampleTable = ({ className, data, headers, sortByColumns, setJsonViewIds }: any) => {
  const [getters, actions] = useTable(data, setJsonViewIds);
  const { page, perPage, sortBy, searchTerm, selectedRows, filteredData }: any = getters;
  const { setPage, setSearchTerm, handleCheckboxChange, handleSort }: any = actions;

  return (
    <div className={className}>
      <Form.Group controlId='search' id='search' className='flex border-2 shadow-lg mb-2'>
        <BsSearch className={`${styles.searchIcon} mr-2`} />
        <Form.Control
          type='text'
          placeholder='Search by name or category...'
          value={searchTerm}
          className='w-full'
          onChange={e => setSearchTerm(e.target.value)}
        />
      </Form.Group>

      <Table striped bordered hover className='border-2 shadow-md'>
        <thead>
          <tr>
            <th>
              <input type='checkbox' />
            </th>
            {headers.map((column: any, index: number) => {
              return (
                <th key={`${index}-headers-column`} onClick={() => sortByColumns.includes(column) && handleSort(column)}>
                  {column} {sortByColumns.includes(column) && (sortBy === null ? '▲' : sortBy === column ? '▼' : '▲')}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan={6}>No data found</td>
            </tr>
          ) : (
            filteredData.map((item: any, index: number) => (
              <tr key={`${item.id}-${index}-filteredData`}>
                <td>
                  <input type='checkbox' onChange={e => handleCheckboxChange(e, item.id)} checked={selectedRows.includes(item.id)} />
                </td>
                {headers.map((column: any, index: number) => (
                  <td key={`${index}-filteredData-headers`}>{item[column]}</td>
                ))}
                {/*<td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>*/}
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <Pagination className={([styles.pagination, styles.pageLink].join(''), 'flex border-2 shadow-md mt-6 justify-between p-2')}>
        <Pagination.Prev onClick={() => setPage((prevPage: any) => Math.max(prevPage - 1, 1))} disabled={page === 1} />
        <Pagination.Item active>{page}</Pagination.Item>
        <Pagination.Next
          onClick={() => setPage((prevPage: any) => Math.min(prevPage + 1, Math.ceil(data.length / perPage)))}
          disabled={page === Math.ceil(data.length / perPage)}
        />
      </Pagination>
    </div>
  );
};

export default SampleTable;
