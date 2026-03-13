-- =============================================
-- Gestão Financeira - Setup do Banco de Dados
-- Execute este SQL no Supabase SQL Editor
-- =============================================

-- Tabela de categorias
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('income', 'expense')),
  color VARCHAR(7) NOT NULL DEFAULT '#7C3AED',
  icon VARCHAR(50) NOT NULL DEFAULT 'Wallet',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de transações
CREATE TABLE IF NOT EXISTS transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  description VARCHAR(255) NOT NULL,
  amount DECIMAL(12,2) NOT NULL CHECK (amount > 0),
  type VARCHAR(20) NOT NULL CHECK (type IN ('income', 'expense')),
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de configurações do usuário
CREATE TABLE IF NOT EXISTS user_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  currency VARCHAR(3) NOT NULL DEFAULT 'BRL',
  language VARCHAR(10) NOT NULL DEFAULT 'pt-BR',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(date DESC);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(type);
CREATE INDEX IF NOT EXISTS idx_transactions_category ON transactions(category_id);
CREATE INDEX IF NOT EXISTS idx_categories_type ON categories(type);

-- Habilitar RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- Políticas permissivas (sem autenticação - acesso público)
CREATE POLICY "Allow all on categories" ON categories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on transactions" ON transactions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on user_settings" ON user_settings FOR ALL USING (true) WITH CHECK (true);

-- =============================================
-- Seed: Categorias padrão
-- =============================================
INSERT INTO categories (name, type, color, icon) VALUES
  ('Salário', 'income', '#10B981', 'Briefcase'),
  ('Freelance', 'income', '#3B82F6', 'Wallet'),
  ('Investimentos', 'income', '#8B5CF6', 'TrendingUp'),
  ('Outros (Receita)', 'income', '#06B6D4', 'DollarSign'),
  ('Alimentação', 'expense', '#EF4444', 'Utensils'),
  ('Transporte', 'expense', '#F59E0B', 'Car'),
  ('Moradia', 'expense', '#7C3AED', 'Home'),
  ('Saúde', 'expense', '#EC4899', 'Heart'),
  ('Educação', 'expense', '#6366F1', 'GraduationCap'),
  ('Lazer', 'expense', '#14B8A6', 'Music'),
  ('Compras', 'expense', '#F97316', 'ShoppingCart'),
  ('Outros (Despesa)', 'expense', '#E11D48', 'Zap');

-- Configurações padrão
INSERT INTO user_settings (currency, language) VALUES ('BRL', 'pt-BR');
