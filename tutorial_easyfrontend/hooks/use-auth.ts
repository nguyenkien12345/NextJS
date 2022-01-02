import useSWR from "swr";
import { PublicConfiguration } from 'swr/dist/types';
import { authApi } from 'apis/auth-api';

function useAuth(options?: Partial<PublicConfiguration>){
    // Đổi tên biến data thành profile
    const { data: profile, error, mutate } = useSWR('/profile',{
        revalidateOnFocus: false,
        dedupingInterval: 60 * 60 * 1000, // 1 hour
        ...options,                       // Các Options khác nếu có truyền vô
    })

    // Trước khi fetch API login thì ban đầu vào profile vs error là undefined
    const firstLoading = profile === undefined && error === undefined;

    async function login(){
        await authApi.login({
            username: 'NguyenTrungKien',
            password: '123456789'
        });
        // Sau khi đăng nhập thành công, để mutate() rỗng, không truyền gì vào thì nó sẽ đi trigger lại cái api và fetch lại cái profile chứ không hề truyền vào cái dữ liệu tạm nào
        await mutate();
    }

    async function logout(){
        await authApi.logout();
        // Sau khi đăng xuất xong thành công, nó sẽ gắn dữ liệu lại về là rỗng, false là không cần đi gọi lại api
        await mutate({}, false);
    }

    return { 
        // Cho phép các component khác sử dụng những dữ liệu này
        firstLoading,
        profile,
        error,
        login,
        logout,
    }
}

export { useAuth };

