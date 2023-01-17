import type { AppProps } from 'next/app'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { queryClient } from '../src/config/AxiosClient'
import LoginVerification from '../src/hooks/LoginVerification'
import { TokenContainer } from '../src/hooks/TokenContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <TokenContainer>
        <LoginVerification>
          <Component {...pageProps} />
          <ReactQueryDevtools />
        </LoginVerification>
      </TokenContainer>
    </QueryClientProvider>
  )
}
