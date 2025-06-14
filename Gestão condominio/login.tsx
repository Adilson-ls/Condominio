import React, { useState, useEffect } from 'react'; // Importa React e os hooks useState e useEffect

// Componente para a tela de Login (simplificado)
const Login = ({ onLogin }) => {
  // Estados para armazenar o nome de usuário e a senha digitados
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Função para lidar com o clique no botão de login
  const handleLogin = () => {
    // Simulação de login: se usuário e senha forem preenchidos, considera-se logado
    if (username && password) {
      onLogin(true); // Chama a função onLogin passada como prop para indicar login bem-sucedido
    } else {
      // Exibe um alerta se os campos não estiverem preenchidos (em um app real, seria um modal customizado)
      alert('Por favor, insira usuário e senha.');
    }
  };

  return (
    // Contêiner principal da tela de login, centralizado na tela
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-sans">
      {/* Card de login com sombra e cantos arredondados */}
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        {/* Título da tela de login */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Login do Condomínio</h2>
        {/* Campo de usuário */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="username">
            Usuário
          </label>
          <input
            type="text"
            id="username"
            className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            placeholder="Seu usuário"
            value={username} // Valor do input controlado pelo estado
            onChange={(e) => setUsername(e.target.value)} // Atualiza o estado ao digitar
          />
        </div>
        {/* Campo de senha */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
            Senha
          </label>
          <input
            type="password"
            id="password"
            className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            placeholder="Sua senha"
            value={password} // Valor do input controlado pelo estado
            onChange={(e) => setPassword(e.target.value)} // Atualiza o estado ao digitar
          />
        </div>
        {/* Botão de Entrar */}
        <button
          onClick={handleLogin} // Chama handleLogin ao clicar
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 transform hover:scale-105"
        >
          Entrar
        </button>
        {/* Mensagem de instrução para o login de simulação */}
        <p className="text-center text-gray-500 text-xs mt-6">
          Preencha com qualquer coisa para simular o acesso.
        </p>
      </div>
    </div>
  );
};

// Componente para o Painel/Dashboard do condomínio
const Dashboard = () => {
  // Estado para armazenar a lista de visitas agendadas (dados mock)
  const [visits, setVisits] = useState([
    { id: 1, resident: 'Maria Silva', visitor: 'João Costa', date: '15/06/2025', time: '10:00' },
    { id: 2, resident: 'Carlos Mendes', visitor: 'Ana Pereira', date: '16/06/2025', time: '14:30' },
    { id: 3, resident: 'Fernanda Lima', visitor: 'Pedro Souza', date: '17/06/2025', time: '09:15' },
  ]);

  // Estado para armazenar a lista de avisos e comunicados (dados mock)
  const [announcements, setAnnouncements] = useState([
    'Aviso: Manutenção da piscina nos dias 20 e 21 de Junho.',
    'Comunicado: Nova política de uso do salão de festas. Verifique o regimento interno.',
    'Lembrete: Reunião de condomínio dia 25/06 às 19h no salão de festas.',
  ]);

  return (
    // Contêiner principal do painel
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      {/* Título do painel */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Painel do Condomínio</h1>

      {/* Seção de Visitas Agendadas */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 transform transition-all duration-300 hover:scale-[1.01]">
        {/* Título da seção de visitas com ícone SVG */}
        <h2 className="text-2xl font-bold text-gray-800 mb-5 flex items-center">
          <svg className="w-7 h-7 mr-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
          Visitas Agendadas
        </h2>
        {/* Renderiza a tabela de visitas se houver visitas, senão uma mensagem */}
        {visits.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              {/* Cabeçalho da tabela */}
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">
                    Morador
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Visitante
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">
                    Hora
                  </th>
                </tr>
              </thead>
              {/* Corpo da tabela, mapeando as visitas para linhas */}
              <tbody className="bg-white divide-y divide-gray-200">
                {visits.map((visit) => (
                  <tr key={visit.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{visit.resident}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{visit.visitor}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{visit.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{visit.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">Nenhuma visita agendada para hoje.</p>
        )}
      </div>

      {/* Seção de Avisos e Comunicados */}
      <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-[1.01]">
        {/* Título da seção de avisos com ícone SVG */}
        <h2 className="text-2xl font-bold text-gray-800 mb-5 flex items-center">
          <svg className="w-7 h-7 mr-3 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
          Avisos e Comunicados
        </h2>
        {/* Renderiza a lista de avisos se houver, senão uma mensagem */}
        {announcements.length > 0 ? (
          <ul className="space-y-3">
            {announcements.map((announcement, index) => (
              <li key={index} className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-4 rounded-lg">
                <p className="text-sm font-medium">{announcement}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">Nenhum aviso ou comunicado no momento.</p>
        )}
      </div>
    </div>
  );
};

// Componente para a tela de Reservas de Áreas Comuns
const Reservations = () => {
  // Estados para controlar o formulário de reserva
  const [selectedArea, setSelectedArea] = useState('Salão de Festas'); // Área selecionada
  const [reservationDate, setReservationDate] = useState(''); // Data e horário da reserva
  const [reservationDescription, setReservationDescription] = useState(''); // Descrição/motivo da reserva
  const [reservations, setReservations] = useState([]); // Lista de reservas feitas (mock)

  // Dados mock de disponibilidade de áreas comuns
  const areaAvailability = {
    'Salão de Festas': ['10/07/2025 (Manhã)', '10/07/2025 (Noite)', '12/07/2025 (Tarde)'],
    'Churrasqueira': ['15/07/2025 (Manhã)', '15/07/2025 (Tarde)', '16/07/2025 (Noite)'],
    'Quadra Esportiva': ['20/07/2025 (Manhã)', '20/07/2025 (Tarde)', '21/07/2025 (Noite)'],
  };

  // Função para lidar com a solicitação de reserva
  const handleMakeReservation = () => {
    // Verifica se todos os campos estão preenchidos
    if (selectedArea && reservationDate && reservationDescription) {
      // Cria um novo objeto de reserva
      const newReservation = {
        id: reservations.length + 1, // ID simples baseado no tamanho do array
        area: selectedArea,
        date: reservationDate,
        description: reservationDescription,
        status: 'Pendente' // Status inicial da reserva
      };
      // Adiciona a nova reserva à lista de reservas
      setReservations([...reservations, newReservation]);
      // Limpa os campos do formulário
      setReservationDate('');
      setReservationDescription('');
      // Exibe um alerta de sucesso (em um app real, seria um modal customizado)
      alert('Reserva solicitada com sucesso! Aguarde a aprovação.');
    } else {
      // Exibe um alerta se algum campo estiver vazio
      alert('Por favor, preencha todos os campos da reserva.');
    }
  };

  return (
    // Contêiner principal da tela de reservas
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      {/* Título da tela de reservas */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Reservas de Áreas Comuns</h1>

      {/* Formulário de Nova Reserva */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 transform transition-all duration-300 hover:scale-[1.01]">
        {/* Título da seção de formulário com ícone SVG */}
        <h2 className="text-2xl font-bold text-gray-800 mb-5 flex items-center">
          <svg className="w-7 h-7 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2h-2zM11 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2z"></path></svg>
          Fazer Nova Reserva
        </h2>
        {/* Grid para os campos de seleção de área e data */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="area">
              Área Comum
            </label>
            <select
              id="area"
              className="shadow-sm border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              value={selectedArea} // Valor controlado pelo estado
              onChange={(e) => setSelectedArea(e.target.value)} // Atualiza o estado
            >
              <option value="Salão de Festas">Salão de Festas</option>
              <option value="Churrasqueira">Churrasqueira</option>
              <option value="Quadra Esportiva">Quadra Esportiva</option>
              <option value="Academia">Academia</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="date">
              Data e Horário (Ex: 10/07/2025 (Manhã))
            </label>
            <input
              type="text"
              id="date"
              className="shadow-sm border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              placeholder="Ex: 10/07/2025 (Manhã)"
              value={reservationDate} // Valor controlado pelo estado
              onChange={(e) => setReservationDate(e.target.value)} // Atualiza o estado
            />
          </div>
        </div>
        {/* Campo de descrição da reserva */}
        <div className="mt-6">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="description">
            Descrição / Motivo
          </label>
          <textarea
            id="description"
            rows="3"
            className="shadow-sm border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 resize-y"
            placeholder="Descreva o motivo da sua reserva..."
            value={reservationDescription} // Valor controlado pelo estado
            onChange={(e) => setReservationDescription(e.target.value)} // Atualiza o estado
          ></textarea>
        </div>
        {/* Botão para solicitar reserva */}
        <button
          onClick={handleMakeReservation} // Chama handleMakeReservation ao clicar
          className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 transform hover:scale-105"
        >
          Solicitar Reserva
        </button>
      </div>

      {/* Seção de Disponibilidade das Áreas */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 transform transition-all duration-300 hover:scale-[1.01]">
        {/* Título da seção de disponibilidade com ícone SVG */}
        <h2 className="text-2xl font-bold text-gray-800 mb-5 flex items-center">
          <svg className="w-7 h-7 mr-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
          Disponibilidade das Áreas Comuns
        </h2>
        {/* Mapeia e exibe a disponibilidade para cada área */}
        {Object.entries(areaAvailability).map(([area, dates]) => (
          <div key={area} className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">{area}</h3>
            {dates.length > 0 ? (
              <ul className="list-disc list-inside text-gray-600 ml-4">
                {dates.map((date, index) => (
                  <li key={index} className="mb-1">{date}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">Nenhuma disponibilidade listada para esta área no momento.</p>
            )}
          </div>
        ))}
      </div>

      {/* Seção Minhas Reservas (Mock) */}
      <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-[1.01]">
        {/* Título da seção de minhas reservas com ícone SVG */}
        <h2 className="text-2xl font-bold text-gray-800 mb-5 flex items-center">
          <svg className="w-7 h-7 mr-3 text-purple-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2h-2zM11 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2z"></path></svg>
          Minhas Reservas
        </h2>
        {/* Renderiza a tabela de reservas se houver, senão uma mensagem */}
        {reservations.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              {/* Cabeçalho da tabela */}
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">
                    Área
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descrição
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">
                    Status
                  </th>
                </tr>
              </thead>
              {/* Corpo da tabela, mapeando as reservas para linhas */}
              <tbody className="bg-white divide-y divide-gray-200">
                {reservations.map((res) => (
                  <tr key={res.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{res.area}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{res.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{res.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {/* Badge de status com cor dinâmica baseada no status */}
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        res.status === 'Aprovada' ? 'bg-green-100 text-green-800' :
                        res.status === 'Pendente' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {res.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">Nenhuma reserva solicitada ainda.</p>
        )}
      </div>
    </div>
  );
};

// Componente para a tela de Condôminos
const Residents = () => {
  // Estado para armazenar a lista de condôminos (dados mock)
  const [residents, setResidents] = useState([
    { id: 1, unit: '101', name: 'João da Silva', phone: '(11) 98765-4321', email: 'joao.silva@email.com' },
    { id: 2, unit: '102', name: 'Ana Paula Santos', phone: '(11) 91234-5678', email: 'ana.santos@email.com' },
    { id: 3, unit: '201', name: 'Pedro Henrique Costa', phone: '(11) 99876-1234', email: 'pedro.costa@email.com' },
    { id: 4, unit: '202', name: 'Mariana Oliveira', phone: '(11) 97654-3210', email: 'mariana.oliveira@email.com' },
    { id: 5, unit: '301', name: 'Ricardo Pereira', phone: '(11) 96543-2109', email: 'ricardo.pereira@email.com' },
  ]);

  return (
    // Contêiner principal da tela de condôminos
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      {/* Título da tela de condôminos */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Lista de Condôminos</h1>

      {/* Seção da lista de condôminos */}
      <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-[1.01]">
        {/* Título da seção com ícone SVG */}
        <h2 className="text-2xl font-bold text-gray-800 mb-5 flex items-center">
          <svg className="w-7 h-7 mr-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
          Condôminos Cadastrados
        </h2>
        {/* Renderiza a tabela de condôminos se houver, senão uma mensagem */}
        {residents.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              {/* Cabeçalho da tabela */}
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">
                    Unidade
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nome
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Telefone
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">
                    Email
                  </th>
                </tr>
              </thead>
              {/* Corpo da tabela, mapeando os condôminos para linhas */}
              <tbody className="bg-white divide-y divide-gray-200">
                {residents.map((resident) => (
                  <tr key={resident.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{resident.unit}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{resident.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{resident.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{resident.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">Nenhum condômino cadastrado.</p>
        )}
      </div>
    </div>
  );
};

// Componente principal do aplicativo
const App = () => {
  // Estado para controlar se o usuário está logado
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Estado para controlar qual página está sendo exibida (dashboard, reservations, residents)
  const [currentPage, setCurrentPage] = useState('dashboard');

  // useEffect para configurar estilos globais e carregar o Tailwind CSS apenas uma vez
  useEffect(() => {
    // Define a fonte "Inter" globalmente para o corpo do documento
    document.body.style.fontFamily = 'Inter, sans-serif';
    // Cria e anexa o script do Tailwind CSS ao cabeçalho do documento
    const script = document.createElement('script');
    script.src = 'https://cdn.tailwindcss.com';
    document.head.appendChild(script);
    // Função de limpeza para remover o script quando o componente for desmontado
    return () => {
      document.head.removeChild(script);
    };
  }, []); // O array vazio [] garante que este efeito seja executado apenas uma vez

  // Função para renderizar a página correta com base no estado 'currentPage'
  const renderPage = () => {
    // Se o usuário não estiver logado, exibe o componente de Login
    if (!isLoggedIn) {
      return <Login onLogin={setIsLoggedIn} />;
    }

    // Com base na página atual, renderiza o componente correspondente
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'reservations':
        return <Reservations />;
      case 'residents':
        return <Residents />;
      default:
        // Padrão para o Dashboard se a página não for reconhecida
        return <Dashboard />;
    }
  };

  return (
    // Contêiner flexível que organiza a barra de navegação e o conteúdo principal
    <div className="flex min-h-screen bg-gray-100">
      {/* Barra de navegação lateral, visível apenas se o usuário estiver logado */}
      {isLoggedIn && (
        <nav className="w-64 bg-gray-800 text-white p-6 shadow-lg rounded-r-xl sticky top-0 h-screen overflow-y-auto">
          {/* Título do aplicativo na barra de navegação */}
          <div className="text-3xl font-extrabold mb-10 text-center text-blue-300">
            CondoApp
          </div>
          {/* Lista de botões de navegação */}
          <ul className="space-y-4">
            <li>
              {/* Botão para o Painel */}
              <button
                onClick={() => setCurrentPage('dashboard')} // Define a página atual para 'dashboard'
                className={`flex items-center w-full px-4 py-3 rounded-lg text-lg font-medium transition duration-200 ease-in-out transform hover:scale-[1.02]
                  ${currentPage === 'dashboard' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-300 hover:bg-gray-700'}
                `}
              >
                <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                Painel
              </button>
            </li>
            <li>
              {/* Botão para Reservas */}
              <button
                onClick={() => setCurrentPage('reservations')} // Define a página atual para 'reservations'
                className={`flex items-center w-full px-4 py-3 rounded-lg text-lg font-medium transition duration-200 ease-in-out transform hover:scale-[1.02]
                  ${currentPage === 'reservations' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-300 hover:bg-gray-700'}
                `}
              >
                <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
                Reservas
              </button>
            </li>
            <li>
              {/* Botão para Condôminos */}
              <button
                onClick={() => setCurrentPage('residents')} // Define a página atual para 'residents'
                className={`flex items-center w-full px-4 py-3 rounded-lg text-lg font-medium transition duration-200 ease-in-out transform hover:scale-[1.02]
                  ${currentPage === 'residents' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-300 hover:bg-gray-700'}
                `}
              >
                <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                Condôminos
              </button>
            </li>
            <li>
              {/* Botão para Sair */}
              <button
                onClick={() => setIsLoggedIn(false)} // Define isLoggedIn para false para deslogar
                className="flex items-center w-full px-4 py-3 rounded-lg text-lg font-medium text-gray-300 hover:bg-red-700 transition duration-200 ease-in-out transform hover:scale-[1.02]"
              >
                <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10 0a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zM5 4a1 1 0 100 2h10a1 1 0 100-2H5zm0 4a1 1 0 100 2h10a1 1 0 100-2H5zm0 4a1 1 0 100 2h10a1 1 0 100-2H5z" clipRule="evenodd"></path></svg>
                Sair
              </button>
            </li>
          </ul>
        </nav>
      )}
      {/* Seção principal do conteúdo, que renderiza a página atual */}
      <main className="flex-1">
        {renderPage()}
      </main>
    </div>
  );
};

export default App; // Exporta o componente principal do aplicativo
