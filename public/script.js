document.addEventListener('DOMContentLoaded', () => {
  const tarefaForm = document.getElementById('tarefaForm');
  const listaTarefas = document.getElementById('listaTarefas');
  
  // Carregar tarefas ao iniciar a página
  carregarTarefas();
  
  // Evento de submissão do formulário
  tarefaForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(tarefaForm);
    const tarefa = {
      titulo: formData.get('titulo'),
      descricao: formData.get('descricao'),
      data_limite: formData.get('data_limite'),
      prioridade: formData.get('prioridade')
    };
    
    try {
      const response = await fetch('/api/tarefas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tarefa)
      });
      
      if (!response.ok) {
        throw new Error('Erro ao criar tarefa');
      }
      
      const novaTarefa = await response.json();
      tarefaForm.reset();
      carregarTarefas();
      alert('Tarefa criada com sucesso!');
    } catch (error) {
      console.error('Erro:', error);
      alert('Falha ao criar tarefa. Tente novamente.');
    }
  });
  
  // Função para carregar tarefas da API
  async function carregarTarefas() {
    try {
      const response = await fetch('/api/tarefas');
      if (!response.ok) {
        throw new Error('Erro ao buscar tarefas');
      }
      
      const tarefas = await response.json();
      exibirTarefas(tarefas);
    } catch (error) {
      console.error('Erro:', error);
      listaTarefas.innerHTML = '<p>Erro ao carregar tarefas. Tente novamente mais tarde.</p>';
    }
  }
  
  // Função para exibir tarefas na página
  function exibirTarefas(tarefas) {
    if (tarefas.length === 0) {
      listaTarefas.innerHTML = '<p>Nenhuma tarefa encontrada. Crie uma nova tarefa!</p>';
      return;
    }
    
    let html = '';
    
    tarefas.forEach(tarefa => {
      const prioridadeClasse = getPrioridadeClasse(tarefa.prioridade);
      const prioridadeTexto = getPrioridadeTexto(tarefa.prioridade);
      const dataLimiteFormatada = formatarData(tarefa.data_limite);
      const dataCriacaoFormatada = formatarDataHora(tarefa.data_criacao);
      
      html += `
        <div class="tarefa-item ${prioridadeClasse}">
          <h3>${tarefa.titulo}</h3>
          <div class="tarefa-meta">
            <span>Prioridade: ${prioridadeTexto}</span> | 
            <span>Criado em: ${dataCriacaoFormatada}</span>
            ${dataLimiteFormatada ? ` | <span class="data-limite">Prazo: ${dataLimiteFormatada}</span>` : ''}
          </div>
          ${tarefa.descricao ? `<div class="tarefa-descricao">${tarefa.descricao}</div>` : ''}
        </div>
      `;
    });
    
    listaTarefas.innerHTML = html;
  }
  
  // Funções auxiliares
  function getPrioridadeClasse(prioridade) {
    switch (parseInt(prioridade)) {
      case 3: return 'prioridade-alta';
      case 2: return 'prioridade-media';
      default: return 'prioridade-baixa';
    }
  }
  
  function getPrioridadeTexto(prioridade) {
    switch (parseInt(prioridade)) {
      case 3: return 'Alta';
      case 2: return 'Média';
      default: return 'Baixa';
    }
  }
  
  function formatarData(dataString) {
    if (!dataString) return '';
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
  }
  
  function formatarDataHora(dataString) {
    if (!dataString) return '';
    const data = new Date(dataString);
    return `${data.toLocaleDateString('pt-BR')} ${data.toLocaleTimeString('pt-BR')}`;
  }
});
