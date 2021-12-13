import fs from 'fs';                                                // File system
import path from 'path';



export const BooksApi = {
    getBooks() {
        const booksDir = path.join(process.cwd(), 'books');         // Trả về thư mục, đường dẫn để lấy ra những quyển sách
        const bookFileNames = fs.readdirSync(booksDir);             // Lấy ra file của những quyển sách (book1.txt và book2.txt)
        const booksData = bookFileNames.map(bookFileName => {
        const fullBookPath = path.join(booksDir,bookFileName);      // Lấy ra đường dẫn đầy đủ của cuốn sách đó
        const bookContent = fs.readFileSync(fullBookPath,'utf8');   // Lấy ra nội dung của quyển sách đó
        return {
            bookName: bookFileName.replace(/\.txt$/,''),            // Trả về tên file không lấy đuôi txt
            bookContent: bookContent                                // Trả về nội dung cuốn sách
        }
    })
    return booksData;
    }
}

// Lý thuyết

// + Trong NextJS, nơi mà mình viết code thì nó lại khác với nơi mà mình chạy code không giống như nhiều ứng dụng khác thì nơi viết code cũng chính là nơi chạy code.

// + Trong nextjs muốn đọc thông tin gì từ trong hệ thống ra thì nên dùng process.

// console.log("booksDir: ",booksDir); => booksDir:  G:\NextJs\my-app-nextjs\books
// console.log("bookFileNames: ",bookFileNames); => bookFileNames:  [ 'book1.txt', 'book2.txt' ]
// console.log("fullBookPath: ",fullBookPath); => fullBookPath:  G:\NextJs\my-app-nextjs\books\book1.txt
// console.log("bookContent: ",bookContent); => bookContent:  Nguyễn Trung Kiên
// console.log("fullBookPath: ",fullBookPath); => fullBookPath:  G:\NextJs\my-app-nextjs\books\book2.txt
// console.log("bookContent: ",bookContent); => bookContent:  Liverpool Fc
//                                                  booksData:  [
// console.log("booksData: ",booksData);                          { bookName: 'book1', bookContent: 'Nguyễn Trung Kiên ' },
//                                                                { bookName: 'book2', bookContent: 'Liverpool Fc' }
//                                                              ]