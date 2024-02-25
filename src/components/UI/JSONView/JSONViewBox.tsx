import { IPostItems } from '../../../api/posts/posts';

const JSONViewBox = ({ data, jsonViewIds }: any) => (
  <div className='flex flex-col items-center border-2 shadow-lg'>
    <h2>Selected rows</h2>
    {data
      .filter((item: IPostItems) => jsonViewIds.includes(item.id))
      .map((item: IPostItems, index: number) => (
        <div key={`${index}-viewJsonItem`} className='bg-gray-100 rounded-md mb-2'>
          {JSON.stringify(item, null, 2)}
        </div>
      ))}
  </div>
);

export default JSONViewBox;
