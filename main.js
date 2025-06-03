import { pegarDados } from './firebase.js';
import {
  graficoLinhaComMedia,
  graficoBarraHorizontal,
  graficoRoscaComparativa,
  graficoBarrasMensal
} from './graficos.js';

const filtroSelect = document.getElementById('filtroMeses');
const ctxLinha = document.getElementById('graficoLinha').getContext('2d');
const ctxBarraH = document.getElementById('graficoBarraHorizontal').getContext('2d');
const ctxRosca = document.getElementById('graficoRosca').getContext('2d');
const ctxBarras = document.getElementById('graficoBarras').getContext('2d');

let chartLinha, chartBarraH, chartRosca, chartBarras;

function formatarDadosFirebase(snapshot) {
  return Object.entries(snapshot).map(([key, val]) => {
    const data = new Date(val.timestamp);
    return {
      id: key,
      data: data.toISOString().split('T')[0],
      consumo: parseFloat(val.consumo)
    };
  }).sort((a, b) => new Date(a.data) - new Date(b.data));
}

function filtrarPorPeriodo(dados, meses) {
  const agora = new Date();
  const limite = new Date();
  limite.setMonth(agora.getMonth() - meses + 1);
  return dados.filter(item => new Date(item.data) >= limite);
}

function exibirMetricas(dados) {
  const total = dados.reduce((acc, item) => acc + item.consumo, 0);
  const media = (total / dados.length).toFixed(2);
  const pico = Math.max(...dados.map(d => d.consumo));
  const menor = Math.min(...dados.map(d => d.consumo));

  document.getElementById('info-total').textContent = `Total: ${total.toFixed(2)} kWh`;
  document.getElementById('info-media').textContent = `Média: ${media} kWh`;
  document.getElementById('info-pico').textContent = `Pico: ${pico} kWh`;
  document.getElementById('info-menor').textContent = `Menor: ${menor} kWh`;
}

async function carregarGraficos(periodo = 12) {
  const dadosRaw = await pegarDados();
  const dados = formatarDadosFirebase(dadosRaw);
  const dadosFiltrados = filtrarPorPeriodo(dados, periodo);

  if (chartLinha) chartLinha.destroy();
  if (chartBarraH) chartBarraH.destroy();
  if (chartRosca) chartRosca.destroy();
  if (chartBarras) chartBarras.destroy();

  chartLinha = graficoLinhaComMedia(ctxLinha, dadosFiltrados);
  chartBarraH = graficoBarraHorizontal(ctxBarraH, dadosFiltrados);
  chartRosca = graficoRoscaComparativa(ctxRosca, dadosFiltrados);
  chartBarras = graficoBarrasMensal(ctxBarras, dadosFiltrados);

  exibirMetricas(dadosFiltrados);
}

filtroSelect.addEventListener('change', (e) => {
  const meses = parseInt(e.target.value);
  carregarGraficos(meses);
});

carregarGraficos();
