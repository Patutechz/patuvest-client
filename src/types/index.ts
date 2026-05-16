// ── Account ──────────────────────────────────────────────────
export interface LoginDto {
  email: string
  password: string
}

export interface RegisterDto {
  firstname: string
  lastname: string
  address: string
  country: string
  phone: string
  username: string
  email: string
  password: string
}

export interface NewUserDto {
  userId: string
  userName: string
  email: string
  token: string
  walletBalance: number
  createdAt: string
}

// ── Wallet ────────────────────────────────────────────────────
export interface WalletTransactionDto {
  id: number
  amount: number
  type: 'Deposit' | 'Withdrawal' | 'InvestmentDebit' | 'InvestmentReturn'
  description: string
  balanceAfter: number
  createdAt: string
}

export interface WalletDto {
  userId: string
  balance: number
  recentTransactions: WalletTransactionDto[]
}

// ── Investment ────────────────────────────────────────────────
export interface InvestmentPlanDto {
  id: number
  name: string
  description: string
  minimumAmount: number
  maximumAmount: number
  returnRate: number
  durationDays: number
  isActive: boolean
}

export interface InvestmentDto {
  id: number
  planName: string
  planDescription: string
  amountInvested: number
  expectedReturn: number
  returnRate: number
  status: 'Active' | 'Matured' | 'Cancelled'
  createdAt: string
  maturityDate: string
  daysRemaining: number
}
