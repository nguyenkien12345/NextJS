/**
 * @type {import('next').NextConfig}
 */

// const withImages = require("next-images")
const path = require('path')

const nextConfig = {
  reactStrictMode: true,
  images: {
    disableStaticImages: true
  },
  // webpack: (config, options) => {
  //   // (Lưu ý quan trọng) Không được phép thay thế, sửa object có sẵn của nextjs mà chỉ được phép thêm vào thông quá push
  //   config.module.rules.push(
  //       {
  //         // Kiếm những file có đuôi là png,jpg,gif để nó sử dụng module loader vào trong đó
  //         test: /\.(png|jpg|gif)$/i, 
  //         use: [
  //           {
  //             loader: 'url-loader',
  //           },
  //         ],
  //       },
  //   )
  //   // Nexj Js đã cấu hình sẵn 1 phần webpack. Toàn bộ phần cầu hình nó sẽ chạy lần đầu tiên ở phía server và biên dịch ở phía server.
  //   // Cho nên tất cả phần console.log dành cho phía server nó sẽ hiển thị trên terminal chứ ko in ra ở browser
  //   console.log(config.module.rules);
  //   return config
  // },
  // withImages();
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}

module.exports = nextConfig



