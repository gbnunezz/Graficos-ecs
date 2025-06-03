export function graficoLinhaComMedia(ctx, dados) {
  const labels = dados.map(d => d.data);
  const valores = dados.map(d => d.consumo);
  const media = valores.reduce((acc, v) => acc + v, 0) / valores.length;
  const medias = Array(valores.length).fill(media);

  return new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        { label: 'Consumo', data: valores, borderColor: 'blue', tension: 0.3 },
        { label: 'Média', data: medias, borderColor: 'orange', borderDash: [5, 5] }
      ]
    },
    options: { responsive: true }
  });
}

export function graficoBarraHorizontal(ctx, dados) {
  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: dados.map(d => d.data),
      datasets: [{ label: 'Consumo', data: dados.map(d => d.consumo), backgroundColor: 'green' }]
    },
    options: {
      indexAxis: 'y',
      responsive: true
    }
  });
}

export function graficoRoscaComparativa(ctx, dados) {
  const total = dados.reduce((acc, d) => acc + d.consumo, 0);
  const media = total / dados.length;

  return new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Total', 'Média x Meses'],
      datasets: [{
        label: 'Comparação',
        data: [total, media * dados.length],
        backgroundColor: ['#4BC0C0', '#FF6384']
      }]
    },
    options: { responsive: true }
  });
}

export function graficoBarrasMensal(ctx, dados) {
  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: dados.map(d => d.data),
      datasets: [{ label: 'Mensal', data: dados.map(d => d.consumo), backgroundColor: '#36A2EB' }]
    },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true } }
    }
  });
}
