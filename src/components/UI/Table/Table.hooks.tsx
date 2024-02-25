import { useMemo, useState, useEffect } from 'react';
import _ from 'lodash';

export default function useTable(data: any, setJsonViewIds: any) {
  const [page, setPage] = useState<number>(1); //current page
  const [perPage] = useState<number>(10);
  const [sortBy, setSortBy] = useState(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedRows, setSelectedRows] = useState<any>([]);

  // Paginated data
  const paginatedData = useMemo(() => {
    return data.slice((page - 1) * perPage, page * perPage);
  }, [data, page, perPage]);

  // Handle sorting
  const sortedData = useMemo(() => {
    if (sortBy === null) return paginatedData;

    return _.sortBy(paginatedData, item => parseFloat(item[sortBy]));
  }, [sortBy, paginatedData]);

  // Handle filtering by name and category
  const filteredData = useMemo(() => {
    return sortedData.filter(
      (item: any) => item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, sortedData]);

  useEffect(() => {
    setJsonViewIds(selectedRows);
  }, [selectedRows]);

  const handleSort = (column: any) => {
    const isColumnSortedByASC = column === sortBy;
    if (isColumnSortedByASC)
      setSortBy(null); //set back to default
    else setSortBy(column);
  };

  const handleCheckboxChange = (event: any, id: any) => {
    if (event.target.checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter((rowId: number) => rowId !== id));
    }
  };

  const getters = { page, perPage, sortBy, searchTerm, selectedRows, filteredData };

  const actions = { setPage, setSortBy, setSearchTerm, setSelectedRows, handleSort, handleCheckboxChange };

  return [getters, actions];
}
