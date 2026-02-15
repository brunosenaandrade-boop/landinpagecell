import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://iyadhsrunjdfdacertoh.supabase.co";
const SERVICE_ROLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5YWRoc3J1bmpkZmRhY2VydG9oIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTcyNTg0MywiZXhwIjoyMDg1MzAxODQzfQ.-LKAS_aXM1AHGl_sq-Ep20XgXXzHx_Sg-z70MtqE2zM";

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const EMPRESA_ID = "c6ee6fb6-8ec0-4072-b447-57b6a645f403";
const USUARIO_ID = "a05c259b-e26d-4730-bc52-cf019a62bb3e";

async function seed() {
  console.log("Seeding test data...\n");

  // 1. Update empresa with full address
  const { error: empErr } = await supabase
    .from("empresas")
    .update({
      endereco: "Rua Augusta",
      numero: "1250",
      complemento: "Sala 3",
      bairro: "Consolação",
      cidade: "São Paulo",
      estado: "SP",
      cep: "01304-001",
      onboarding_completo: true,
    })
    .eq("id", EMPRESA_ID);
  if (empErr) console.error("Empresa update error:", empErr);
  else console.log("✓ Empresa atualizada");

  // 2. Get default categories
  const { data: catsProd } = await supabase
    .from("categorias_produtos")
    .select("id, nome")
    .eq("empresa_id", EMPRESA_ID);
  const { data: catsServ } = await supabase
    .from("categorias_servicos")
    .select("id, nome")
    .eq("empresa_id", EMPRESA_ID);

  const catMap = {};
  for (const c of catsProd || []) catMap[c.nome] = c.id;
  const catServMap = {};
  for (const c of catsServ || []) catServMap[c.nome] = c.id;

  console.log("✓ Categorias encontradas:", Object.keys(catMap).join(", "));

  // 3. Create products
  const produtos = [
    { codigo: "PEL-001", nome: "Película de Vidro 3D", descricao: "Película de vidro temperado cobertura total", custo: 4.5, preco_venda: 25.0, estoque_atual: 120, estoque_minimo: 10, unidade: "un", categoria: "Acessórios" },
    { codigo: "PEL-002", nome: "Película Privacidade", descricao: "Película anti-spy para telas", custo: 8.0, preco_venda: 40.0, estoque_atual: 45, estoque_minimo: 5, unidade: "un", categoria: "Acessórios" },
    { codigo: "CAP-001", nome: "Capinha Silicone Transparente", descricao: "Case TPU flexível anti-impacto", custo: 3.0, preco_venda: 20.0, estoque_atual: 200, estoque_minimo: 20, unidade: "un", categoria: "Capas" },
    { codigo: "CAP-002", nome: "Capinha Anti-Shock Premium", descricao: "Case militar com proteção nas bordas", custo: 12.0, preco_venda: 45.0, estoque_atual: 80, estoque_minimo: 10, unidade: "un", categoria: "Capas" },
    { codigo: "CAR-001", nome: "Carregador Turbo USB-C 33W", descricao: "Carregador rápido compatível com Samsung e Motorola", custo: 18.0, preco_venda: 55.0, estoque_atual: 35, estoque_minimo: 5, unidade: "un", categoria: "Carregadores" },
    { codigo: "CAR-002", nome: "Cabo USB-C 1m", descricao: "Cabo reforçado nylon USB-C", custo: 5.0, preco_venda: 20.0, estoque_atual: 150, estoque_minimo: 15, unidade: "un", categoria: "Carregadores" },
    { codigo: "FON-001", nome: "Fone Bluetooth i12 TWS", descricao: "Fone sem fio com case carregador", custo: 15.0, preco_venda: 50.0, estoque_atual: 60, estoque_minimo: 5, unidade: "un", categoria: "Fones de Ouvido" },
    { codigo: "PEC-001", nome: "Tela Samsung A12", descricao: "Display LCD + Touch Samsung Galaxy A12", custo: 85.0, preco_venda: 180.0, estoque_atual: 8, estoque_minimo: 3, unidade: "un", categoria: "Peças" },
    { codigo: "PEC-002", nome: "Tela Motorola G52", descricao: "Display OLED + Touch Moto G52", custo: 120.0, preco_venda: 250.0, estoque_atual: 5, estoque_minimo: 2, unidade: "un", categoria: "Peças" },
    { codigo: "PEC-003", nome: "Bateria iPhone 11", descricao: "Bateria compatível iPhone 11 3110mAh", custo: 35.0, preco_venda: 90.0, estoque_atual: 12, estoque_minimo: 3, unidade: "un", categoria: "Peças" },
    { codigo: "PEC-004", nome: "Conector de Carga USB-C", descricao: "Placa conector carga universal USB-C", custo: 8.0, preco_venda: 25.0, estoque_atual: 30, estoque_minimo: 5, unidade: "un", categoria: "Peças" },
    { codigo: "CEL-001", nome: "Samsung Galaxy A14 128GB", descricao: "Smartphone Samsung Galaxy A14 - Novo", custo: 650.0, preco_venda: 999.0, estoque_atual: 4, estoque_minimo: 1, unidade: "un", categoria: "Celulares" },
  ];

  const prodInsert = produtos.map((p) => ({
    empresa_id: EMPRESA_ID,
    categoria_id: catMap[p.categoria] || null,
    codigo: p.codigo,
    nome: p.nome,
    descricao: p.descricao,
    custo: p.custo,
    preco_venda: p.preco_venda,
    estoque_atual: p.estoque_atual,
    estoque_minimo: p.estoque_minimo,
    unidade: p.unidade,
    ativo: true,
  }));

  const { data: prodData, error: prodErr } = await supabase
    .from("produtos")
    .insert(prodInsert)
    .select("id, nome");
  if (prodErr) console.error("Produtos error:", prodErr);
  else console.log(`✓ ${prodData.length} produtos criados`);

  const prodMap = {};
  for (const p of prodData || []) prodMap[p.nome] = p.id;

  // 4. Create services
  const servicos = [
    { nome: "Troca de Tela", descricao: "Substituição de display LCD/OLED completo", tipo: "avancado", preco_base: 150.0, tempo_estimado: 60, categoria: "Celular" },
    { nome: "Troca de Bateria", descricao: "Substituição de bateria com diagnóstico", tipo: "basico", preco_base: 80.0, tempo_estimado: 30, categoria: "Celular" },
    { nome: "Troca de Conector de Carga", descricao: "Substituição do conector USB de carga", tipo: "basico", preco_base: 70.0, tempo_estimado: 40, categoria: "Celular" },
    { nome: "Reparo Placa (Micro Solda)", descricao: "Reparo em nível de placa com microssolda", tipo: "avancado", preco_base: 200.0, tempo_estimado: 120, categoria: "Celular" },
    { nome: "Limpeza Interna", descricao: "Limpeza completa com álcool isopropílico", tipo: "basico", preco_base: 40.0, tempo_estimado: 20, categoria: "Celular" },
    { nome: "Formatação e Backup", descricao: "Reset de fábrica com backup de dados", tipo: "basico", preco_base: 50.0, tempo_estimado: 45, categoria: "Celular" },
    { nome: "Troca Analógico Controle", descricao: "Substituição de analógico com drift", tipo: "basico", preco_base: 60.0, tempo_estimado: 30, categoria: "Videogame" },
    { nome: "Troca de Tela Tablet", descricao: "Substituição de tela touch + display tablet", tipo: "avancado", preco_base: 180.0, tempo_estimado: 90, categoria: "Tablet" },
  ];

  const servInsert = servicos.map((s) => ({
    empresa_id: EMPRESA_ID,
    categoria_id: catServMap[s.categoria] || null,
    nome: s.nome,
    descricao: s.descricao,
    tipo: s.tipo,
    preco_base: s.preco_base,
    tempo_estimado: s.tempo_estimado,
    ativo: true,
  }));

  const { data: servData, error: servErr } = await supabase
    .from("servicos")
    .insert(servInsert)
    .select("id, nome");
  if (servErr) console.error("Servicos error:", servErr);
  else console.log(`✓ ${servData.length} serviços criados`);

  const servMap = {};
  for (const s of servData || []) servMap[s.nome] = s.id;

  // 5. Create customers
  const clientes = [
    { nome: "Maria Santos", cpf: "123.456.789-00", email: "maria.santos@email.com", telefone: "(11) 98765-4321", whatsapp: "(11) 98765-4321", endereco: "Rua das Flores", numero: "456", bairro: "Vila Mariana", cidade: "São Paulo", estado: "SP", cep: "04015-001", data_nascimento: "1990-05-15", observacoes: "Cliente frequente, prefere atendimento por WhatsApp" },
    { nome: "Carlos Oliveira", cpf: "987.654.321-00", email: "carlos.oliveira@gmail.com", telefone: "(11) 91234-5678", whatsapp: "(11) 91234-5678", endereco: "Av. Paulista", numero: "1578", bairro: "Bela Vista", cidade: "São Paulo", estado: "SP", cep: "01310-200", data_nascimento: "1985-11-20" },
    { nome: "Ana Paula Ferreira", cpf: "456.789.123-00", email: "anapaula@hotmail.com", telefone: "(11) 99876-5432", whatsapp: "(11) 99876-5432", endereco: "Rua Oscar Freire", numero: "890", bairro: "Pinheiros", cidade: "São Paulo", estado: "SP", cep: "05409-010", data_nascimento: "1992-03-08" },
    { nome: "Pedro Henrique Lima", cpf: "321.654.987-00", telefone: "(11) 97654-3210", whatsapp: "(11) 97654-3210", endereco: "Rua Vergueiro", numero: "2100", bairro: "Liberdade", cidade: "São Paulo", estado: "SP", cep: "01504-001" },
    { nome: "Juliana Costa", email: "juliana.costa@email.com", telefone: "(11) 96543-2109", whatsapp: "(11) 96543-2109", cidade: "São Paulo", estado: "SP" },
    { nome: "Roberto Almeida", cpf: "654.321.987-00", telefone: "(11) 95432-1098", cidade: "Guarulhos", estado: "SP" },
    { nome: "Fernanda Ribeiro", email: "fernanda.r@gmail.com", telefone: "(11) 94321-0987", whatsapp: "(11) 94321-0987", cidade: "São Paulo", estado: "SP", observacoes: "Sempre traz iPhone" },
    { nome: "Lucas Mendes", telefone: "(11) 93210-9876", cidade: "Osasco", estado: "SP" },
  ];

  const cliInsert = clientes.map((c) => ({
    empresa_id: EMPRESA_ID,
    ...c,
    ativo: true,
  }));

  const { data: cliData, error: cliErr } = await supabase
    .from("clientes")
    .insert(cliInsert)
    .select("id, nome");
  if (cliErr) console.error("Clientes error:", cliErr);
  else console.log(`✓ ${cliData.length} clientes criados`);

  const cliMap = {};
  for (const c of cliData || []) cliMap[c.nome] = c.id;

  // 6. Update configuracoes for sequential numbers
  await supabase
    .from("configuracoes")
    .update({ proxima_os: 1, proxima_venda: 1 })
    .eq("empresa_id", EMPRESA_ID);

  // 7. Create service orders (various statuses)
  const now = new Date();
  const dayMs = 86400000;

  const ordensServico = [
    {
      cliente: "Maria Santos", numero: 1, status: "entregue",
      tipo_aparelho: "Celular", marca: "Samsung", modelo: "Galaxy A12", cor: "Preto",
      imei: "354678091234567", problema_relatado: "Tela quebrada após queda, touch não funciona",
      diagnostico: "Display LCD danificado, touch screen com rachadura",
      solucao: "Troca de tela completa (LCD + Touch)",
      valor_servicos: 150, valor_produtos: 180, valor_desconto: 0, valor_total: 330,
      forma_pagamento: "pix", pago: true,
      data_entrada: new Date(now - 10 * dayMs).toISOString(),
      data_previsao: new Date(now - 7 * dayMs).toISOString().split("T")[0],
      data_finalizacao: new Date(now - 8 * dayMs).toISOString(),
      data_entrega: new Date(now - 7 * dayMs).toISOString(),
      data_pagamento: new Date(now - 7 * dayMs).toISOString(),
    },
    {
      cliente: "Carlos Oliveira", numero: 2, status: "em_andamento",
      tipo_aparelho: "Celular", marca: "Motorola", modelo: "Moto G52", cor: "Azul",
      problema_relatado: "Bateria viciada, descarrega muito rápido",
      diagnostico: "Bateria com capacidade reduzida (62%)",
      valor_servicos: 80, valor_produtos: 0, valor_desconto: 0, valor_total: 80,
      forma_pagamento: "dinheiro", pago: false,
      data_entrada: new Date(now - 2 * dayMs).toISOString(),
      data_previsao: new Date(now + 1 * dayMs).toISOString().split("T")[0],
    },
    {
      cliente: "Ana Paula Ferreira", numero: 3, status: "aguardando_aprovacao",
      tipo_aparelho: "Celular", marca: "Apple", modelo: "iPhone 11", cor: "Branco",
      problema_relatado: "Não carrega, conector solto",
      diagnostico: "Conector lightning com mau contato, necessita troca",
      valor_servicos: 70, valor_produtos: 25, valor_desconto: 0, valor_total: 95,
      pago: false,
      data_entrada: new Date(now - 1 * dayMs).toISOString(),
      data_previsao: new Date(now + 2 * dayMs).toISOString().split("T")[0],
    },
    {
      cliente: "Pedro Henrique Lima", numero: 4, status: "aberta",
      tipo_aparelho: "Celular", marca: "Xiaomi", modelo: "Redmi Note 12", cor: "Verde",
      problema_relatado: "Tela com manchas escuras, apareceu do nada",
      valor_servicos: 0, valor_produtos: 0, valor_desconto: 0, valor_total: 0,
      pago: false,
      data_entrada: new Date(now).toISOString(),
      data_previsao: new Date(now + 3 * dayMs).toISOString().split("T")[0],
    },
    {
      cliente: "Juliana Costa", numero: 5, status: "finalizada",
      tipo_aparelho: "Celular", marca: "Samsung", modelo: "Galaxy S21", cor: "Rosa",
      problema_relatado: "Software travando, reiniciando sozinho",
      diagnostico: "Sistema corrompido após atualização",
      solucao: "Formatação completa com backup na nuvem",
      valor_servicos: 50, valor_produtos: 0, valor_desconto: 0, valor_total: 50,
      forma_pagamento: "credito", pago: true,
      data_entrada: new Date(now - 3 * dayMs).toISOString(),
      data_previsao: new Date(now - 1 * dayMs).toISOString().split("T")[0],
      data_finalizacao: new Date(now - 1 * dayMs).toISOString(),
      data_pagamento: new Date(now - 1 * dayMs).toISOString(),
    },
    {
      cliente: "Roberto Almeida", numero: 6, status: "entregue",
      tipo_aparelho: "Videogame", marca: "Sony", modelo: "DualSense PS5", cor: "Branco",
      problema_relatado: "Analógico com drift, personagem anda sozinho",
      diagnostico: "Analógico esquerdo desgastado",
      solucao: "Substituição do módulo analógico",
      valor_servicos: 60, valor_produtos: 0, valor_desconto: 0, valor_total: 60,
      forma_pagamento: "pix", pago: true,
      data_entrada: new Date(now - 5 * dayMs).toISOString(),
      data_previsao: new Date(now - 3 * dayMs).toISOString().split("T")[0],
      data_finalizacao: new Date(now - 4 * dayMs).toISOString(),
      data_entrega: new Date(now - 3 * dayMs).toISOString(),
      data_pagamento: new Date(now - 3 * dayMs).toISOString(),
    },
    {
      cliente: "Fernanda Ribeiro", numero: 7, status: "em_analise",
      tipo_aparelho: "Celular", marca: "Apple", modelo: "iPhone 13", cor: "Azul",
      problema_relatado: "Caiu na água, ligou mas ficou com manchas na tela",
      valor_servicos: 0, valor_produtos: 0, valor_desconto: 0, valor_total: 0,
      pago: false,
      data_entrada: new Date(now).toISOString(),
      data_previsao: new Date(now + 5 * dayMs).toISOString().split("T")[0],
    },
    {
      cliente: "Lucas Mendes", numero: 8, status: "aguardando_peca",
      tipo_aparelho: "Tablet", marca: "Samsung", modelo: "Galaxy Tab A7", cor: "Cinza",
      problema_relatado: "Tela trincada, touch funciona parcialmente",
      diagnostico: "Tela touch + display danificados, necessário peça importada",
      valor_servicos: 180, valor_produtos: 0, valor_desconto: 10, valor_total: 170,
      pago: false,
      data_entrada: new Date(now - 4 * dayMs).toISOString(),
      data_previsao: new Date(now + 7 * dayMs).toISOString().split("T")[0],
    },
  ];

  for (const os of ordensServico) {
    const { cliente, ...osData } = os;
    const { data: osRes, error: osErr } = await supabase
      .from("ordens_servico")
      .insert({
        empresa_id: EMPRESA_ID,
        cliente_id: cliMap[cliente],
        usuario_id: USUARIO_ID,
        tecnico_id: USUARIO_ID,
        ...osData,
        condicao_entrada: "Bom estado geral",
        acessorios: os.numero <= 4 ? "Carregador" : "",
      })
      .select("id, numero")
      .single();

    if (osErr) console.error(`OS #${os.numero} error:`, osErr);
    else console.log(`✓ OS #${osRes.numero} criada (${os.status})`);
  }

  // 8. Update next OS number
  await supabase
    .from("configuracoes")
    .update({ proxima_os: 9 })
    .eq("empresa_id", EMPRESA_ID);

  // 9. Create sales (past days for dashboard data)
  const vendasData = [
    { cliente: "Maria Santos", numero: 1, itens: [{ prod: "Película de Vidro 3D", qtd: 2, unit: 25, custo: 4.5 }, { prod: "Capinha Silicone Transparente", qtd: 1, unit: 20, custo: 3 }], forma: "dinheiro", dias: 8 },
    { cliente: "Carlos Oliveira", numero: 2, itens: [{ prod: "Carregador Turbo USB-C 33W", qtd: 1, unit: 55, custo: 18 }, { prod: "Cabo USB-C 1m", qtd: 2, unit: 20, custo: 5 }], forma: "pix", dias: 6 },
    { cliente: "Ana Paula Ferreira", numero: 3, itens: [{ prod: "Fone Bluetooth i12 TWS", qtd: 1, unit: 50, custo: 15 }, { prod: "Película Privacidade", qtd: 1, unit: 40, custo: 8 }], forma: "credito", dias: 5 },
    { cliente: "Juliana Costa", numero: 4, itens: [{ prod: "Capinha Anti-Shock Premium", qtd: 2, unit: 45, custo: 12 }, { prod: "Película de Vidro 3D", qtd: 2, unit: 25, custo: 4.5 }], forma: "debito", dias: 4 },
    { cliente: "Pedro Henrique Lima", numero: 5, itens: [{ prod: "Samsung Galaxy A14 128GB", qtd: 1, unit: 999, custo: 650 }], forma: "credito", dias: 3 },
    { cliente: "Roberto Almeida", numero: 6, itens: [{ prod: "Cabo USB-C 1m", qtd: 3, unit: 20, custo: 5 }, { prod: "Capinha Silicone Transparente", qtd: 2, unit: 20, custo: 3 }], forma: "dinheiro", dias: 2 },
    { cliente: "Fernanda Ribeiro", numero: 7, itens: [{ prod: "Película de Vidro 3D", qtd: 3, unit: 25, custo: 4.5 }, { prod: "Capinha Anti-Shock Premium", qtd: 1, unit: 45, custo: 12 }], forma: "pix", dias: 1 },
    { cliente: "Lucas Mendes", numero: 8, itens: [{ prod: "Carregador Turbo USB-C 33W", qtd: 1, unit: 55, custo: 18 }, { prod: "Fone Bluetooth i12 TWS", qtd: 1, unit: 50, custo: 15 }], forma: "dinheiro", dias: 0 },
  ];

  for (const v of vendasData) {
    const valorProdutos = v.itens.reduce((sum, i) => sum + i.qtd * i.unit, 0);
    const valorCusto = v.itens.reduce((sum, i) => sum + i.qtd * i.custo, 0);
    const valorTotal = valorProdutos;
    const lucro = valorTotal - valorCusto;

    const { data: vendaRes, error: vendaErr } = await supabase
      .from("vendas")
      .insert({
        empresa_id: EMPRESA_ID,
        cliente_id: cliMap[v.cliente],
        usuario_id: USUARIO_ID,
        numero: v.numero,
        valor_produtos: valorProdutos,
        valor_custo_total: valorCusto,
        valor_desconto: 0,
        valor_total: valorTotal,
        lucro_liquido: lucro,
        forma_pagamento: v.forma,
        cancelada: false,
        created_at: new Date(now - v.dias * dayMs).toISOString(),
      })
      .select("id, numero")
      .single();

    if (vendaErr) console.error(`Venda #${v.numero} error:`, vendaErr);
    else {
      // Insert items
      const itensInsert = v.itens.map((i) => ({
        venda_id: vendaRes.id,
        produto_id: prodMap[i.prod],
        descricao: i.prod,
        quantidade: i.qtd,
        valor_unitario: i.unit,
        valor_custo: i.custo,
        valor_total: i.qtd * i.unit,
        lucro_item: i.qtd * (i.unit - i.custo),
      }));
      await supabase.from("itens_venda").insert(itensInsert);
      console.log(`✓ Venda #${vendaRes.numero} criada (R$ ${valorTotal})`);
    }
  }

  // 10. Update next sale number
  await supabase
    .from("configuracoes")
    .update({ proxima_venda: 9 })
    .eq("empresa_id", EMPRESA_ID);

  // 11. Create cash register (open)
  const { data: caixaRes, error: caixaErr } = await supabase
    .from("caixa")
    .insert({
      empresa_id: EMPRESA_ID,
      usuario_abertura_id: USUARIO_ID,
      data_abertura: new Date(now - 0.5 * dayMs).toISOString(),
      valor_abertura: 200.0,
      status: "aberto",
      total_vendas: 0,
      total_os: 0,
      total_entradas: 0,
      total_saidas: 0,
      total_esperado: 200,
      diferenca: 0,
    })
    .select("id")
    .single();

  if (caixaErr) console.error("Caixa error:", caixaErr);
  else {
    // Add movements
    const movs = [
      { tipo: "venda", valor: 70, descricao: "Venda #1 - Películas e capinha" },
      { tipo: "venda", valor: 95, descricao: "Venda #2 - Carregador e cabos" },
      { tipo: "venda", valor: 90, descricao: "Venda #3 - Fone e película" },
      { tipo: "os", valor: 330, descricao: "OS #1 - Troca de tela Samsung A12" },
      { tipo: "os", valor: 60, descricao: "OS #6 - Troca analógico DualSense" },
      { tipo: "sangria", valor: -150, descricao: "Sangria - Retirada para pagamento fornecedor" },
      { tipo: "suprimento", valor: 100, descricao: "Suprimento - Troco adicional" },
    ];

    for (const m of movs) {
      await supabase.from("movimentacoes_caixa").insert({
        caixa_id: caixaRes.id,
        usuario_id: USUARIO_ID,
        tipo: m.tipo,
        valor: Math.abs(m.valor),
        descricao: m.descricao,
      });
    }

    // Update caixa totals
    await supabase
      .from("caixa")
      .update({
        total_vendas: 255,
        total_os: 390,
        total_entradas: 100,
        total_saidas: 150,
        total_esperado: 795,
      })
      .eq("id", caixaRes.id);

    console.log("✓ Caixa aberto com 7 movimentações");
  }

  console.log("\n✅ Seed completo!");
  console.log("\n📧 Login: teste.prints@cellflow.com.br");
  console.log("🔑 Senha: Teste@123456");
}

seed().catch(console.error);
