"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Wrench,
  ShoppingCart,
  Package,
  Wallet,
  Users,
  BarChart3,
  Settings,
  Printer,
  Gift,
  Smartphone,
  Shield,
  Infinity,
  ScanBarcode,
  ExternalLink,
  Check,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Store,
  Cog,
  Rocket,
  Star,
  MessageCircle,
} from "lucide-react";

const CTA_URL =
  "https://cellflow.com.br/cadastro?utm_source=lp&utm_medium=cta&utm_campaign=landing";

const WHATSAPP_NUMBER = "5548998649898";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Quero saber mais sobre o CellFlow.")}`;

/* ============================================================
   DATA
   ============================================================ */

const NAV_LINKS = [
  { label: "Funcionalidades", href: "#funcionalidades" },
  { label: "Como Funciona", href: "#como-funciona" },
  { label: "Preço", href: "#preco" },
  { label: "FAQ", href: "#faq" },
];

const FEATURES = [
  {
    icon: Wrench,
    title: "Ordens de Serviço",
    description:
      "Controle cada reparo: entrada do aparelho, diagnóstico, peças usadas, status e entrega ao cliente.",
  },
  {
    icon: ShoppingCart,
    title: "PDV — Ponto de Venda",
    description:
      "Venda rápida com busca de produtos, carrinho, múltiplas formas de pagamento e cupom.",
  },
  {
    icon: Package,
    title: "Estoque",
    description:
      "Controle entradas, saídas, alertas de estoque mínimo e histórico completo de movimentações.",
  },
  {
    icon: Wallet,
    title: "Caixa",
    description:
      "Abertura, fechamento, sangria, suprimento e resumo por forma de pagamento.",
  },
  {
    icon: Users,
    title: "Clientes",
    description:
      "Cadastro completo, histórico de compras e serviços, aniversários e busca por CEP.",
  },
  {
    icon: BarChart3,
    title: "Relatórios",
    description:
      "Vendas, lucro líquido, ranking de produtos e serviços, tudo com exportação CSV.",
  },
  {
    icon: Settings,
    title: "Serviços",
    description:
      "Cadastre tipos de reparo com preço, tempo estimado e categorias (celular, videogame, tablet).",
  },
  {
    icon: Printer,
    title: "Impressão de Cupom",
    description:
      "Cupom de venda e OS para impressora térmica ou padrão, com layout configurável.",
  },
  {
    icon: Gift,
    title: "Programa de Indicação",
    description:
      "Indique outras lojas e ganhe meses grátis de acesso para cada indicação bem-sucedida.",
  },
];

const SCREENSHOTS = [
  {
    id: "dashboard",
    title: "Dashboard",
    description: "Visão geral com KPIs de vendas, OS, faturamento e indicadores do dia.",
  },
  {
    id: "pdv",
    title: "PDV — Ponto de Venda",
    description: "Tela de venda rápida com busca, carrinho e múltiplos pagamentos.",
  },
  {
    id: "os",
    title: "Ordem de Serviço",
    description: "Controle completo do reparo com status, peças e diagnóstico.",
  },
  {
    id: "caixa",
    title: "Caixa",
    description: "Controle financeiro com abertura, fechamento e movimentações.",
  },
  {
    id: "estoque",
    title: "Estoque",
    description: "Gestão de produtos com alertas, entradas, saídas e histórico.",
  },
  {
    id: "acompanhamento",
    title: "Acompanhamento Público",
    description: "Link exclusivo para o cliente acompanhar o status da OS em tempo real.",
  },
];

const STEPS = [
  {
    icon: Store,
    number: "1",
    title: "Cadastre sua loja",
    description:
      "Crie sua conta gratuita com nome da empresa, email e senha. Sem burocracia.",
  },
  {
    icon: Cog,
    number: "2",
    title: "Configure o sistema",
    description:
      "Preencha os dados da empresa, configure a impressora e cadastre seus produtos e serviços.",
  },
  {
    icon: Rocket,
    number: "3",
    title: "Comece a vender",
    description:
      "Abra o caixa, crie ordens de serviço, faça vendas e acompanhe tudo pelo dashboard.",
  },
];

const BENEFITS = [
  {
    icon: Wrench,
    title: "Feito para assistência técnica",
    description:
      "Não é um sistema genérico. Cada funcionalidade foi pensada para lojas de celular e assistência.",
  },
  {
    icon: Smartphone,
    title: "Funciona no celular",
    description:
      "Responsivo e instalável como app (PWA). Use no celular, tablet ou computador.",
  },
  {
    icon: Shield,
    title: "Seus dados ficam seguros",
    description:
      "Infraestrutura em nuvem com criptografia, backups automáticos e isolamento total por empresa.",
  },
  {
    icon: Infinity,
    title: "Sem limite de uso",
    description:
      "No plano anual, tudo é ilimitado: usuários, produtos, vendas e ordens de serviço.",
  },
  {
    icon: ScanBarcode,
    title: "Leitor de código de barras",
    description:
      "Suporte nativo a leitura de código de barras para agilizar vendas e cadastros.",
  },
  {
    icon: ExternalLink,
    title: "Acompanhamento pelo cliente",
    description:
      "Envie um link público para o cliente acompanhar o status da OS em tempo real.",
  },
];

const PLAN_FEATURES = [
  "Usuários ilimitados",
  "Produtos ilimitados",
  "Ordens de serviço ilimitadas",
  "Vendas ilimitadas",
  "PDV completo",
  "Controle de estoque",
  "Gestão de caixa",
  "Relatórios completos + exportação CSV",
  "Impressão de cupom (térmica/padrão)",
  "Backup dos dados",
  "Suporte prioritário",
  "Programa de indicação",
];

const COMPARISON = [
  { feature: "Usuários", trial: "1", annual: "Ilimitados" },
  { feature: "Produtos", trial: "50", annual: "Ilimitados" },
  { feature: "OS por mês", trial: "30", annual: "Ilimitadas" },
  { feature: "Vendas por mês", trial: "30", annual: "Ilimitadas" },
  { feature: "PDV", trial: true, annual: true },
  { feature: "Estoque", trial: true, annual: true },
  { feature: "Caixa", trial: true, annual: true },
  { feature: "Relatórios", trial: "Básico", annual: "Completo + CSV" },
  { feature: "Impressão", trial: true, annual: true },
  { feature: "Backup", trial: false, annual: true },
  { feature: "Suporte", trial: "Email", annual: "Prioritário" },
  { feature: "Indicação", trial: false, annual: true },
  { feature: "Duração", trial: "7 dias", annual: "12 meses" },
];

const FAQ_ITEMS = [
  {
    question: "O teste grátis tem alguma limitação?",
    answer:
      "O trial dura 7 dias e tem limites de 1 usuário, 50 produtos, 30 ordens de serviço e 30 vendas por mês. Após assinar o plano anual, tudo fica ilimitado.",
  },
  {
    question: "Preciso de cartão de crédito para testar?",
    answer:
      "Não. O cadastro é 100% gratuito, sem dados de pagamento. Você só paga quando decidir assinar o plano anual.",
  },
  {
    question: "Quais formas de pagamento são aceitas?",
    answer:
      "PIX e cartão de crédito. O plano custa R$ 150/mês (12x no cartão) ou R$ 1.800 à vista via PIX.",
  },
  {
    question: "Posso cancelar a qualquer momento?",
    answer:
      "Sim. Você pode cancelar direto pelo sistema. Seus dados ficam disponíveis até o fim do período pago.",
  },
  {
    question: "Funciona no celular?",
    answer:
      "Sim. O sistema é responsivo e pode ser instalado como aplicativo (PWA). Funciona em qualquer navegador moderno.",
  },
  {
    question: "Meus dados ficam seguros?",
    answer:
      "Sim. Usamos infraestrutura em nuvem com criptografia, backups automáticos e isolamento total por empresa. Cada loja acessa apenas seus próprios dados.",
  },
  {
    question: "Como funciona o programa de indicação?",
    answer:
      "Você recebe um link exclusivo. Para cada loja indicada que assinar o plano e permanecer ativa por pelo menos 1 mês, você ganha 1 mês grátis. Sem limite de indicações.",
  },
  {
    question: "O sistema funciona offline?",
    answer:
      "O CellFlow é um sistema online (SaaS). Você precisa de conexão com a internet para usar. Isso garante que seus dados estejam sempre sincronizados e seguros na nuvem.",
  },
  {
    question: "Consigo importar dados de outro sistema?",
    answer:
      "No momento não temos importação automática, mas o cadastro de produtos e clientes é rápido e intuitivo. A maioria dos lojistas cadastra tudo em menos de 1 hora.",
  },
];

/* ============================================================
   COMPONENTS
   ============================================================ */

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left font-medium text-gray-900 hover:text-primary transition-colors cursor-pointer"
      >
        <span className="pr-4">{question}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-gray-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 pb-5" : "max-h-0"
        }`}
      >
        <p className="text-gray-600 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

/* ============================================================
   PAGE
   ============================================================ */

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeScreenshot, setActiveScreenshot] = useState(0);

  return (
    <div className="min-h-screen">
      {/* ==================== HEADER ==================== */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <Image
              src="/logo.jpeg"
              alt="CellFlow"
              width={36}
              height={36}
              className="rounded-lg"
            />
            <span className="text-xl font-bold text-gray-900">CellFlow</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-3 md:flex">
            <a
              href="https://cellflow.com.br/login"
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
            >
              Entrar
            </a>
            <a
              href={CTA_URL}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark transition-colors"
            >
              Começar Grátis
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-gray-100 bg-white px-4 pb-4 md:hidden">
            <nav className="flex flex-col gap-3 pt-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-gray-600 hover:text-primary py-2"
                >
                  {link.label}
                </a>
              ))}
              <hr className="my-2 border-gray-100" />
              <a
                href="https://cellflow.com.br/login"
                className="text-sm font-medium text-gray-600 py-2"
              >
                Entrar
              </a>
              <a
                href={CTA_URL}
                className="mt-1 rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-semibold text-white"
              >
                Começar Grátis
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-white pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Star className="h-4 w-4" />
              7 dias grátis para testar
            </div>

            {/* Headline */}
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Sua assistência técnica{" "}
              <span className="text-primary">organizada</span> de verdade
            </h1>

            {/* Subheadline */}
            <p className="mt-6 text-lg text-gray-600 sm:text-xl">
              Ordens de serviço, vendas, estoque, caixa e clientes em um só
              lugar. O sistema que lojas de celular e assistências técnicas
              precisam para parar de perder dinheiro.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href={CTA_URL}
                className="cta-pulse inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-primary-dark transition-all"
              >
                Começar Grátis por 7 Dias
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="#preco"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-8 py-4 text-base font-semibold text-gray-700 hover:border-primary hover:text-primary transition-all"
              >
                Ver preço
              </a>
            </div>

            <p className="mt-4 text-sm text-gray-400">
              Sem cartão de crédito. Cancele quando quiser.
            </p>
          </div>

          {/* Hero Screenshot */}
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="hero-screenshot rounded-2xl bg-white p-2 shadow-2xl ring-1 ring-gray-200">
              <Image
                src="/screenshots/dashboard.png"
                alt="Dashboard do CellFlow - Visão geral com KPIs de vendas, OS e faturamento"
                width={1440}
                height={900}
                className="rounded-xl w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SOCIAL PROOF / HIGHLIGHTS ==================== */}
      <section className="border-y border-gray-100 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              { value: "100%", label: "Online — sem instalação" },
              { value: "7 dias", label: "Grátis para testar" },
              { value: "Ilimitado", label: "No plano anual" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-extrabold text-primary sm:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FEATURES ==================== */}
      <section id="funcionalidades" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Tudo que sua loja precisa em um só sistema
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Do balcão ao financeiro — todas as funcionalidades para rodar sua
              assistência sem planilha, sem caderno.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feat) => (
              <div
                key={feat.title}
                className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
              >
                <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <feat.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {feat.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SCREENSHOTS ==================== */}
      <section className="bg-gray-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Veja o sistema por dentro
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Prints reais do CellFlow. Sem maquete, sem photoshop.
            </p>
          </div>

          {/* Tab navigation */}
          <div className="mt-12 flex flex-wrap justify-center gap-2">
            {SCREENSHOTS.map((ss, i) => (
              <button
                key={ss.id}
                onClick={() => setActiveScreenshot(i)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all cursor-pointer ${
                  activeScreenshot === i
                    ? "bg-primary text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {ss.title}
              </button>
            ))}
          </div>

          {/* Active screenshot */}
          <div className="mx-auto mt-8 max-w-4xl">
            <div className={`rounded-2xl bg-white p-2 shadow-xl ring-1 ring-gray-200 ${
              SCREENSHOTS[activeScreenshot].id === "acompanhamento" ? "max-w-sm mx-auto" : ""
            }`}>
              <Image
                src={`/screenshots/${SCREENSHOTS[activeScreenshot].id}.png`}
                alt={SCREENSHOTS[activeScreenshot].title}
                width={SCREENSHOTS[activeScreenshot].id === "acompanhamento" ? 430 : 1440}
                height={SCREENSHOTS[activeScreenshot].id === "acompanhamento" ? 932 : 900}
                className="rounded-xl w-full h-auto"
              />
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-lg font-semibold text-gray-900">
                {SCREENSHOTS[activeScreenshot].title}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {SCREENSHOTS[activeScreenshot].description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section id="como-funciona" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Comece em 3 passos
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Sem instalação, sem contrato. Crie sua conta e comece a usar agora.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {STEPS.map((step) => (
              <div key={step.number} className="relative text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white text-2xl font-bold shadow-lg">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {step.title}
                </h3>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== BENEFITS ==================== */}
      <section className="bg-gray-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Por que escolher o CellFlow?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Diferenciais que fazem o CellFlow ser a escolha certa para sua
              loja.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b) => (
              <div
                key={b.title}
                className="flex gap-4 rounded-2xl bg-white p-6 shadow-sm"
              >
                <div className="shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <b.icon className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{b.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">
                    {b.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PRICING ==================== */}
      <section id="preco" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Preço simples e transparente
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Um único plano com tudo incluso. Sem surpresas, sem taxa escondida.
            </p>
          </div>

          {/* Pricing Card */}
          <div className="mx-auto mt-12 max-w-md">
            <div className="rounded-3xl border-2 border-primary bg-white p-8 shadow-xl relative">
              {/* Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-white shadow-md">
                  Mais popular
                </span>
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900">
                  Plano Anual
                </h3>
                <div className="mt-4">
                  <span className="text-5xl font-extrabold text-gray-900">
                    R$ 150
                  </span>
                  <span className="text-lg text-gray-500"> /mês</span>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  12x no cartão ou R$ 1.800 à vista
                </p>
              </div>

              <ul className="mt-8 space-y-3">
                {PLAN_FEATURES.map((feat) => (
                  <li key={feat} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm text-gray-700">{feat}</span>
                  </li>
                ))}
              </ul>

              <a
                href={CTA_URL}
                className="mt-8 block w-full rounded-xl bg-primary py-4 text-center text-base font-bold text-white shadow-lg hover:bg-primary-dark transition-colors"
              >
                Começar Grátis por 7 Dias
              </a>
              <p className="mt-3 text-center text-xs text-gray-400">
                Sem cartão de crédito no trial
              </p>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="mx-auto mt-16 max-w-2xl">
            <h3 className="mb-6 text-center text-xl font-semibold text-gray-900">
              Trial vs Plano Anual
            </h3>
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-6 py-3 text-left font-semibold text-gray-900">
                      Recurso
                    </th>
                    <th className="px-6 py-3 text-center font-semibold text-gray-900">
                      Trial (7 dias)
                    </th>
                    <th className="px-6 py-3 text-center font-semibold text-primary">
                      Plano Anual
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row, i) => (
                    <tr
                      key={row.feature}
                      className={i % 2 === 0 ? "" : "bg-gray-50"}
                    >
                      <td className="px-6 py-3 font-medium text-gray-700">
                        {row.feature}
                      </td>
                      <td className="px-6 py-3 text-center text-gray-500">
                        {typeof row.trial === "boolean" ? (
                          row.trial ? (
                            <Check className="mx-auto h-5 w-5 text-green-500" />
                          ) : (
                            <X className="mx-auto h-5 w-5 text-gray-300" />
                          )
                        ) : (
                          row.trial
                        )}
                      </td>
                      <td className="px-6 py-3 text-center font-medium text-gray-900">
                        {typeof row.annual === "boolean" ? (
                          row.annual ? (
                            <Check className="mx-auto h-5 w-5 text-green-500" />
                          ) : (
                            <X className="mx-auto h-5 w-5 text-gray-300" />
                          )
                        ) : (
                          row.annual
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section id="faq" className="bg-gray-50 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Perguntas frequentes
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Tire suas dúvidas sobre o CellFlow.
            </p>
          </div>

          <div className="mt-12">
            {FAQ_ITEMS.map((item) => (
              <FAQItem
                key={item.question}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FINAL CTA ==================== */}
      <section className="bg-primary py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Pronto para organizar sua loja?
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Comece agora com 7 dias grátis. Sem compromisso, sem cartão de
            crédito.
          </p>
          <a
            href={CTA_URL}
            className="mt-10 inline-flex items-center gap-2 rounded-xl bg-white px-10 py-4 text-base font-bold text-primary shadow-xl hover:bg-gray-50 transition-colors"
          >
            Criar conta grátis
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </section>

      {/* ==================== WHATSAPP FLOATING BUTTON ==================== */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale conosco pelo WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#1ebe5b] transition-colors"
      >
        <MessageCircle className="h-7 w-7" />
      </a>

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-gray-900 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Image
                src="/logo.jpeg"
                alt="CellFlow"
                width={28}
                height={28}
                className="rounded-md"
              />
              <span className="text-lg font-bold text-white">CellFlow</span>
            </div>

            {/* Links */}
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <a
                href="https://cellflow.com.br/termos"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Termos de Uso
              </a>
              <a
                href="https://cellflow.com.br/privacidade"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Privacidade
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Contato
              </a>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
            <p>
              &copy; {new Date().getFullYear()} CellFlow. Todos os direitos
              reservados.
            </p>
            <p className="mt-2">
              CNPJ: 26.630.862/0001-91
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
