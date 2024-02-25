import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../../api/users/users';
import Spinner from '../UI/Spinner';

const PostList = () => {
  const { data, isLoading, isSuccess }: any = useQuery({ queryKey: ['getUsers'], queryFn: getUsers, staleTime: 300000 });

  if (isLoading) return <Spinner />;

  return (
    <div className='h-screen flex justify-center items-center'>
      <>
        {isSuccess &&
          [data.data].map((data: any, index) => {
            return <div key={`post-${index}`}>{data.species.name}</div>;
          })}
      </>
    </div>
  );
};

export default PostList;
