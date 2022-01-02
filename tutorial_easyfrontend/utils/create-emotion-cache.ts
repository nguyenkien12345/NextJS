// Copy file createEmotionCache.ts trong folder src từ https://codesandbox.io/s/github/mui-org/material-ui/tree/master/examples/nextjs-with-typescript?file=/src/theme.ts:0-332
import createCache from '@emotion/cache';

// prepend: true moves MUI styles to the top of the <head> so they're loaded first.
// It allows developers to easily override MUI styles with other styling solutions, like CSS modules.
function createEmotionCache() {
  // Trong tất cả các style các class mà nó render ra đều có chữ lfc ở đầu => Class của chúng ta lúc nào cũng có chữ lfc (có thể thay chữ lfc bằng bất kỳ chữ nào khác)
  return createCache({ key: 'lfc', prepend: true });
}

export {createEmotionCache};