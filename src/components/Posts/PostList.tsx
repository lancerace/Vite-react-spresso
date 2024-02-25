import { useQuery } from '@tanstack/react-query';
import SampleTable from '../UI/Table/Table';
import Spinner from '../UI/Spinner';
import { IPostItems, getItems } from '../../api/posts/posts';
import { useState } from 'react';
import JSONViewBox from '../UI/JSONView/JSONViewBox';

const PostList = () => {
  const { data, isLoading, isSuccess }: { data?: IPostItems[]; isLoading: boolean; isSuccess: boolean } = useQuery({
    queryKey: ['getItems'],
    queryFn: getItems
  });
  const [jsonViewIds, setJsonViewIds] = useState<any>([]);

  if (isLoading) return <Spinner />;
  return (
    <div className='h-screen flex flex-col items-center'>
      <div>
        Click <b>quantity</b> or <b>price</b> to sort asc order, click again to return to default
      </div>
      {isSuccess && (
        <SampleTable
          data={data}
          headers={data && Object.keys(data[0])}
          sortByColumns={['price', 'quantity']}
          className='flex flex-col'
          setJsonViewIds={setJsonViewIds}
        />
      )}

      <JSONViewBox data={data} jsonViewIds={jsonViewIds} />
    </div>
  );
};

export default PostList;
