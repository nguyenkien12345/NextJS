import React from 'react';
import useSWR from 'swr';

export interface StudentDetailProps {
    studentId: string
}

function StudentDetail ({studentId}: StudentDetailProps) {

  const {data, error, mutate, isValidating} = useSWR(`/students/${studentId}`,{
    revalidateOnFocus: false,
    dedupingInterval: 10000
  });

  const handleMutate = () => {
    // Nếu ta để false thì nó sẽ lấy dữ liệu trong hàm mutate và set dữ liệu cứng luôn cho local data của mình, đồng thời nó cũng sẽ không gọi req lại lên api
    // Nếu ta để true  thì nó sẽ lấy dữ liệu trong hàm mutate và set dữ liệu tạm thời cho local data của mình (cho tất cả những nơi mình sử dụng hook useSWR với cái dữ liệu tạm trong hàm mutate), đồng thời bên dưới nó trigger 1 cái request để đi gọi lại api cho mình và khi có dữ liệu mới nó sẽ cập nhật cái data mới cho mình
    mutate({name: 'Nguyễn Trung Kiên', age: 21},true);
  }

  return (
    <div>
      <h1>Name: {data?.name || '-----'}</h1>
      <h1>Age: {data?.age || '-----'}</h1>
      <button onClick={handleMutate}>Mutate</button>
    </div>
  );
}

export default StudentDetail;

// + useSWR nhận tham số là key hoặc URL. Nếu như bạn truyền vào useSWR là 1 URL thì bạn sẽ không cần truyền vào 1 fetcher vì khi bạn truyền vào useSWR là 1 URL thì nó sẽ sử dụng cái default Fetcher bạn định nghĩa ở trên SWRConfig trong file _app.tsx thì lúc này bên file _app.tsx nó sẽ hiểu là fetcher: (/students/${studentId}) => axiosClient.get(/students/${studentId})

// + /students/${studentId} được coi như là 1 key

// + Còn trong trường hợp bạn tự định nghĩa 1 key riêng thì ví dụ như sau: 
// const {data, error, mutate, isValidating} = useSWR(`abcd`,() => axiosClient.get(/students/abcd)); => Không nên làm như này

// Các options cần lưu ý:
// revalidateOnFocus: Khi mà bạn ra khỏi tab next js chuyển sang 1 tab bất kỳ nào khác và khi bạn quay trở lại tab next js nếu bạn có gọi api thì nó sẽ request Api thêm 1 lần nữa lên server. Nghĩa là ban đầu bạn ở tab next js nó đã req Api 1 lần rồi nhưng khi bạn đã qua tab khác sau đó quay lại thì nó sẽ req lại api thêm 1 lần nữa

// dedupingInterval: 10000 => Nếu nó có gọi req Api thì trong vòng 10s nó sẽ không gọi lại api. Nghĩa là trong 10s này bạn có click gọi api bao nhiêu lần thì nó cũng sẽ ko gọi mà phải sau 10s sau nó mới đi gọi lại api

// mutate: Thay đổi dữ liệu, data