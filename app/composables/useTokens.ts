import type { Tokens } from '~/models/tokens'

export const useTokens = () => {
  const tokens = useState<Tokens | undefined>('tokens')

  return {
    tokens,
  }
}
