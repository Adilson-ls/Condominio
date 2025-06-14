import React, { useState, useEffect, createContext, useContext } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, collection, onSnapshot, addDoc, updateDoc, deleteDoc, query } from 'firebase/firestore';

// Definição do contexto do Firebase para compartilhar instâncias de DB e Auth
const FirebaseContext = createContext(null);

// Provedor do contexto do Firebase para a aplicação
// Este componente inicializa o Firebase e a autenticação, disponibilizando-os para os componentes filhos.
function FirebaseProvider({ children }) {
    const [db, setDb] = useState(null); // Estado para a instância do Firestore
    const [auth, setAuth] = useState(null); // Estado para a instância do Auth
    const [userId, setUserId] = useState(null); // Estado para o ID do usuário autenticado
    const [isAuthReady, setIsAuthReady] = useState(false); // Estado para indicar se a autenticação está pronta

    useEffect(() => {
        // Bloco useEffect para inicializar o Firebase e configurar o listener de autenticação
        // Este efeito é executado apenas uma vez, no carregamento do componente.

        // Obtém o ID do aplicativo do ambiente, ou usa um padrão se não definido
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
        // Analisa a configuração do Firebase do ambiente
        const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};

        try {
            // Inicializa o aplicativo Firebase
            const app = initializeApp(firebaseConfig);
            // Obtém a instância do Firestore
            const firestoreDb = getFirestore(app);
            // Obtém a instância do Firebase Authentication
            const firebaseAuth = getAuth(app);

            // Atualiza os estados com as instâncias do Firebase
            setDb(firestoreDb);
            setAuth(firebaseAuth);

            // Listener para mudanças no estado de autenticação (login/logout)
            const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
                if (user) {
                    // Se houver um usuário logado, define o userId
                    setUserId(user.uid);
                } else {
                    // Se não houver usuário logado, tenta fazer login anônimo ou com token customizado
                    try {
                        const token = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;
                        if (token) {
                            // Se um token inicial for fornecido, tenta autenticar com ele
                            await signInWithCustomToken(firebaseAuth, token);
                        } else {
                            // Caso contrário, faz login anonimamente
                            await signInAnonymously(firebaseAuth);
                        }
                    } catch (error) {
                        console.error("Erro ao fazer login anônimo ou com token:", error);
                    }
                }
                // Define isAuthReady como true após a verificação inicial de autenticação
                setIsAuthReady(true);
            });

            // Retorna uma função de limpeza para desinscrever o listener quando o componente é desmontado
            return () => unsubscribe();
        } catch (error) {
            console.error("Erro ao inicializar Firebase:", error);
        }
    }, []); // O array de dependências vazio garante que o efeito seja executado apenas uma vez

    // Renderiza os componentes filhos, passando as instâncias do Firebase e o userId via contexto
    return (
        <FirebaseContext.Provider value={{ db, auth, userId, isAuthReady }}>
            {children}
        </FirebaseContext.Provider>
    );
}

// Hook personalizado para usar o contexto do Firebase facilmente em qualquer componente filho
function useFirebase() {
    return useContext(FirebaseContext);
}

// Componente de Mensagem de Alerta/Confirmação
// Exibe uma caixa de diálogo modal para mensagens de alerta ou confirmação do usuário.
const AlertDialog = ({ message, onConfirm, onCancel, showCancel = true }) => {
    if (!message) return null; // Não renderiza se não houver mensagem

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 shadow-xl max-w-sm w-full transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="text-center">
                    <p className="text-lg font-semibold text-gray-900 mb-4">{message}</p>
                    <div className="flex justify-center space-x-4">
                        <button
                            onClick={onConfirm}
                            className="px-6 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                        >
                            Confirmar
                        </button>
                        {showCancel && ( // Opcionalmente exibe o botão Cancelar
                            <button
                                onClick={onCancel}
                                className="px-6 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition duration-150 ease-in-out"
                            >
                                Cancelar
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Componente de Cartão do Dashboard
// Usado para exibir um item navegável no painel principal do aplicativo.
const DashboardCard = ({ icon, title, description, onClick }) => (
    <div
        className="flex flex-col items-center justify-center p-6 bg-gray-800 text-white rounded-lg shadow-lg hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
        onClick={onClick} // Função chamada ao clicar no cartão
    >
        <div className="text-4xl mb-3">{icon}</div> {/* Ícone do cartão */}
        <h3 className="text-xl font-semibold mb-1">{title}</h3> {/* Título do cartão */}
        <p className="text-sm text-gray-400 text-center">{description}</p> {/* Descrição do cartão */}
    </div>
);

// Definições dos Ícones Lucide-React (SVGs embutidos)
// Cada função retorna um SVG para ser usado como ícone nos cartões do Dashboard e outras partes da UI.

// Ícone de Usuários
const UsersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87a4 4 0 0 0-7 0v2" />
        <circle cx="16" cy="7" r="4" />
    </svg>
);
// Ícone de Calendário com Marca de Verificação
const CalendarCheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar-check">
        <path d="M8 2v4" />
        <path d="M16 2v4" />
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <path d="M3 10h18" />
        <path d="m9 16 2 2 4-4" />
    </svg>
);
// Ícone de Carro
const CarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-car">
        <path d="M19 17H5c-1.1 0-1.9-.9-1.9-2V6c0-1.1.9-2 1.9-2h14c1.1 0 1.9.9 1.9 2v9c0 1.1-.9 2-1.9 2Z" />
        <circle cx="7" cy="17" r="2" />
        <circle cx="17" cy="17" r="2" />
    </svg>
);
// Ícone de Pata de Animal
const PawPrintIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-paw-print">
        <circle cx="11" cy="4" r="2" />
        <circle cx="18" cy="8" r="2" />
        <circle cx="20" cy="16" r="2" />
        <path d="M9 10v6a3 3 0 0 0 3 3v0a3 3 0 0 0 3-3V10a6 6 0 0 0-6 0Z" />
        <circle cx="6" cy="12" r="2" />
    </svg>
);
// Ícone de Prancheta com Lista
const ClipboardListIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clipboard-list">
        <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <path d="M12 11h4" />
        <path d="M12 16h4" />
        <path d="M8 11h.01" />
        <path d="M8 16h.01" />
    </svg>
);
// Ícone de Balão de Mensagem com Mais Opções
const MessageCircleMoreIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle-more">
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
        <path d="M8 12h.01" />
        <path d="M12 12h.01" />
        <path d="M16 12h.01" />
    </svg>
);
// Ícone de Martelo (para Manutenções/Serviços)
const HammerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-hammer">
        <path d="m15 12-8.37 8.37a1.99 1.99 0 0 1-2.83 0L2 17l2.83-2.83a1.99 1.99 0 0 1 0-2.83L12 6" />
        <path d="m17.67 9.33 1.41-1.41a2 2 0 1 1 2.83 2.83L20 12" />
        <path d="m15 12 4 4" />
        <path d="m16 10 3 3" />
        <path d="m14 8 2 2" />
    </svg>
);
// Ícone de Arquivo de Texto
const FileTextIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text">
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        <path d="M10 9H8" />
        <path d="M16 13H8" />
        <path d="M16 17H8" />
    </svg>
);
// Ícone de Megafone
const MegaphoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-megaphone">
        <path d="M3 11a9 9 0 0 1 18 0v2a9 9 0 0 1-18 0v-2Z" />
        <path d="M12 2v20" />
        <path d="M10 13l-4.72 2.76A2 2 0 0 0 5 18v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2a2 2 0 0 0-1.28-1.87L14 13" />
    </svg>
);
// Ícone de Aperto de Mãos (para Contratos)
const HandshakeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-handshake">
        <path d="M15 11.5V17h3a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3l-8.5 5.5v3.5" />
        <path d="M11 15.5V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7.5l7.5-7.5a2 2 0 0 1 2 2Z" />
    </svg>
);

// Componente do Dashboard (Página Principal)
// Exibe os cartões que dão acesso aos diferentes módulos do aplicativo.
const Dashboard = ({ onNavigate }) => {
    const { userId } = useFirebase(); // Obtém o ID do usuário do contexto Firebase
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6 font-sans">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-12 animate-fade-in-down">
                AURORA <span className="text-blue-600">Gestão de Condomínios</span>
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full max-w-6xl">
                {/* Cartões clicáveis para navegar para cada módulo */}
                <DashboardCard
                    icon={<MegaphoneIcon />}
                    title="Assembleias"
                    description="Gerencie reuniões e decisões do condomínio."
                    onClick={() => console.log('Navegar para Assembleias')} // Placeholder para navegação
                />
                <DashboardCard
                    icon={<UsersIcon />}
                    title="Cadastros"
                    description="Gerencie moradores, veículos e animais de estimação."
                    onClick={() => onNavigate('Cadastros')} // Navega para o módulo de Cadastros
                />
                <DashboardCard
                    icon={<MessageCircleMoreIcon />}
                    title="Mensagens"
                    description="Comunique-se com os moradores de forma eficiente."
                    onClick={() => console.log('Navegar para Mensagens')} // Placeholder para navegação
                />
                <DashboardCard
                    icon={<FileTextIcon />}
                    title="Documentos"
                    description="Acesse e organize todos os documentos importantes."
                    onClick={() => console.log('Navegar para Documentos')} // Placeholder para navegação
                />
                <DashboardCard
                    icon={<HandshakeIcon />}
                    title="Contratos"
                    description="Mantenha o controle de todos os contratos."
                    onClick={() => console.log('Navegar para Contratos')} // Placeholder para navegação
                />
                <DashboardCard
                    icon={<HammerIcon />}
                    title="Manutenções"
                    description="Planeje e registre as manutenções do condomínio."
                    onClick={() => console.log('Navegar para Manutenções')} // Placeholder para navegação
                />
                <DashboardCard
                    icon={<CalendarCheckIcon />}
                    title="Reservas"
                    description="Gerencie e agende o uso de áreas comuns."
                    onClick={() => onNavigate('Reservas')} // Navega para o módulo de Reservas
                />
                <DashboardCard
                    icon={<ClipboardListIcon />}
                    title="Portaria"
                    description="Controle de acesso e registro de visitantes."
                    onClick={() => onNavigate('Portaria')} // Navega para o módulo de Portaria
                />
                <DashboardCard
                    icon={<HammerIcon />}
                    title="Serviços"
                    description="Gerencie os serviços oferecidos no condomínio."
                    onClick={() => console.log('Navegar para Serviços')} // Placeholder para navegação
                />
            </div>
            {/* Exibe o ID do usuário autenticado */}
            <p className="mt-8 text-sm text-gray-600">ID do Usuário: {userId || 'Carregando...'}</p>
        </div>
    );
};

// Componente do Módulo de Portaria
// Gerencia o registro de entrada e saída de visitantes.
const Portaria = ({ onNavigate }) => {
    const { db, userId, isAuthReady } = useFirebase(); // Obtém instâncias do Firebase e estado de autenticação
    const [visitors, setVisitors] = useState([]); // Estado para armazenar a lista de visitantes
    // Estados para os campos do formulário de registro de visitante
    const [visitorName, setVisitorName] = useState('');
    const [visitorCpfRg, setVisitorCpfRg] = useState('');
    const [visitorVehicle, setVisitorVehicle] = useState('');
    const [visitorBadge, setVisitorBadge] = useState('');
    // Estados para o modal de alerta/confirmação
    const [alertMessage, setAlertMessage] = useState(null);
    const [confirmAction, setConfirmAction] = useState(null);

    // Efeito para buscar visitantes do Firestore em tempo real
    useEffect(() => {
        if (db && userId && isAuthReady) {
            // Cria uma referência para a coleção de visitantes do usuário atual
            const visitorsRef = collection(db, `artifacts/${__app_id}/users/${userId}/visitors`);
            const q = query(visitorsRef); // Cria uma query (pode ser expandida com filtros)

            // Assina as mudanças na coleção em tempo real
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const fetchedVisitors = snapshot.docs.map(doc => ({
                    id: doc.id, // Adiciona o ID do documento
                    ...doc.data() // Pega todos os dados do documento
                }));
                // Ordena os visitantes pela hora de entrada (mais recente primeiro)
                fetchedVisitors.sort((a, b) => b.entryTime.toDate() - a.entryTime.toDate());
                setVisitors(fetchedVisitors); // Atualiza o estado com os visitantes
            }, (error) => {
                console.error("Erro ao buscar visitantes:", error);
                setAlertMessage("Erro ao carregar visitantes. Por favor, tente novamente.");
            });

            // Retorna a função de unsubscribe para limpar o listener ao desmontar o componente
            return () => unsubscribe();
        }
    }, [db, userId, isAuthReady]); // Dependências: re-executa se db, userId ou isAuthReady mudarem

    // Lida com o registro de um novo visitante
    const handleRegisterVisitor = async () => {
        if (!visitorName.trim()) {
            setAlertMessage("Por favor, insira o nome do visitante.");
            return;
        }
        if (!db || !userId) {
            setAlertMessage("Sistema não pronto. Tente novamente mais tarde.");
            return;
        }

        try {
            // Adiciona um novo documento na coleção de visitantes
            await addDoc(collection(db, `artifacts/${__app_id}/users/${userId}/visitors`), {
                name: visitorName,
                cpfRg: visitorCpfRg,
                vehiclePlate: visitorVehicle,
                badge: visitorBadge,
                entryTime: new Date(), // Registra a hora atual de entrada
                exitTime: null, // Inicialmente sem hora de saída
            });
            // Limpa os campos do formulário
            setVisitorName('');
            setVisitorCpfRg('');
            setVisitorVehicle('');
            setVisitorBadge('');
            setAlertMessage("Visitante registrado com sucesso!");
        } catch (error) {
            console.error("Erro ao registrar visitante:", error);
            setAlertMessage("Erro ao registrar visitante. Por favor, tente novamente.");
        }
    };

    // Lida com o registro da saída de um visitante
    const handleRegisterExit = (visitorId) => {
        // Define uma ação de confirmação para ser executada após a confirmação do usuário
        setConfirmAction(() => async () => {
            if (!db || !userId) {
                setAlertMessage("Sistema não pronto. Tente novamente mais tarde.");
                return;
            }
            try {
                // Obtém a referência do documento do visitante e atualiza a hora de saída
                const visitorRef = doc(db, `artifacts/${__app_id}/users/${userId}/visitors`, visitorId);
                await updateDoc(visitorRef, {
                    exitTime: new Date() // Registra a hora atual de saída
                });
                setAlertMessage("Saída registrada com sucesso!");
            } catch (error) {
                console.error("Erro ao registrar saída:", error);
                setAlertMessage("Erro ao registrar saída. Por favor, tente novamente.");
            } finally {
                setConfirmAction(null); // Limpa a ação de confirmação
                setAlertMessage(null); // Limpa o alerta
            }
        });
        setAlertMessage("Tem certeza que deseja registrar a saída deste visitante?"); // Exibe a mensagem de confirmação
    };

    // Função de callback para o botão "Confirmar" do AlertDialog
    const handleConfirm = () => {
        if (confirmAction) {
            confirmAction(); // Executa a ação pendente
        }
        setAlertMessage(null); // Sempre limpa a mensagem de alerta após a interação do usuário
    };

    // Função de callback para o botão "Cancelar" do AlertDialog
    const handleCancel = () => {
        setAlertMessage(null); // Limpa a mensagem de alerta
        setConfirmAction(null); // Limpa a ação de confirmação
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 font-sans">
            {/* Componente de alerta/confirmação */}
            <AlertDialog
                message={alertMessage}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                showCancel={confirmAction !== null} // Mostra o cancelar apenas se for uma ação de confirmação
            />
            {/* Barra de navegação do módulo de portaria */}
            <nav className="flex items-center justify-between py-4 border-b border-gray-200">
                <button
                    onClick={() => onNavigate('Dashboard')} // Botão para voltar ao Dashboard
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
                >
                    {/* Ícone de seta para a esquerda */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left mr-2">
                        <path d="m12 19-7-7 7-7" />
                        <path d="M19 12H5" />
                    </svg>
                    Voltar para o Dashboard
                </button>
                <h2 className="text-3xl font-bold text-gray-800">Controle de Portaria</h2>
                {/* Exibe o ID do usuário */}
                <div className="text-gray-600">ID do Usuário: {userId || 'Carregando...'}</div>
            </nav>

            {/* Seção de Registro de Visita */}
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Registrar uma visita</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Campos de input para dados do visitante */}
                    <input
                        type="text"
                        placeholder="Nome do visitante ou prestador de serviço"
                        value={visitorName}
                        onChange={(e) => setVisitorName(e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                    <input
                        type="text"
                        placeholder="CPF, RG ou Placa do veículo"
                        value={visitorCpfRg}
                        onChange={(e) => setVisitorCpfRg(e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                    <input
                        type="text"
                        placeholder="Placa do veículo (opcional)"
                        value={visitorVehicle}
                        onChange={(e) => setVisitorVehicle(e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                    <input
                        type="text"
                        placeholder="Crachá (opcional)"
                        value={visitorBadge}
                        onChange={(e) => setVisitorBadge(e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <button
                    onClick={handleRegisterVisitor} // Botão para registrar a visita
                    className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Registrar Visita
                </button>
            </div>

            {/* Seção de Visitantes Ativos */}
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Visitantes Ativos</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                {/* Cabeçalhos da tabela */}
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visitante</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CPF/RG</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Veículo</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crachá</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entrada</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Saída</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ação</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {visitors.length === 0 ? (
                                <tr>
                                    {/* Mensagem se não houver visitantes */}
                                    <td colSpan="7" className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">Nenhum visitante ativo.</td>
                                </tr>
                            ) : (
                                // Mapeia e exibe cada visitante
                                visitors.map((visitor) => (
                                    <tr key={visitor.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{visitor.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{visitor.cpfRg}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{visitor.vehiclePlate}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{visitor.badge}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {/* Formata a data de entrada */}
                                            {visitor.entryTime ? new Date(visitor.entryTime.seconds * 1000).toLocaleString() : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {/* Formata a data de saída ou exibe 'Ainda ativo' */}
                                            {visitor.exitTime ? new Date(visitor.exitTime.seconds * 1000).toLocaleString() : 'Ainda ativo'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            {!visitor.exitTime && ( // Mostra o botão de saída apenas se o visitante ainda estiver ativo
                                                <button
                                                    onClick={() => handleRegisterExit(visitor.id)} // Botão para registrar a saída
                                                    className="text-red-600 hover:text-red-900 ml-2"
                                                >
                                                    Registrar Saída
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Outras seções da portaria podem ser adicionadas aqui (Mensagens, Reservas, Correspondências, Chaves) */}
        </div>
    );
};

// Componente do Módulo de Reservas
// Permite aos usuários adicionar, visualizar e gerenciar reservas de espaços comuns.
const Reservas = ({ onNavigate }) => {
    const { db, userId, isAuthReady } = useFirebase(); // Obtém instâncias do Firebase e estado de autenticação
    const [reservations, setReservations] = useState([]); // Estado para armazenar a lista de reservas
    // Estados para os campos do formulário de reserva
    const [selectedSpace, setSelectedSpace] = useState('');
    const [reservationDate, setReservationDate] = useState('');
    const [reservationTime, setReservationTime] = useState('');
    const [responsible, setResponsible] = useState('');
    // Estados para o modal de alerta/confirmação
    const [alertMessage, setAlertMessage] = useState(null);
    const [confirmAction, setConfirmAction] = useState(null);

    // Lista de espaços disponíveis para reserva (baseado nas imagens fornecidas)
    const availableSpaces = [
        "Espaço Gourmet", "Quadra Esportiva", "Salão de Festas", "Sauna Seca",
        "Sauna Úmida", "Sala de Massagem", "Salão de Beleza", "Sports Grill",
        "Stand Up Paddle", "Sunset Grill", "Bicicletas"
    ];

    // Efeito para buscar reservas do Firestore em tempo real
    useEffect(() => {
        if (db && userId && isAuthReady) {
            // Cria uma referência para a coleção de reservas do usuário atual
            const reservationsRef = collection(db, `artifacts/${__app_id}/users/${userId}/reservations`);
            const q = query(reservationsRef); // Cria uma query

            // Assina as mudanças na coleção em tempo real
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const fetchedReservations = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                // Ordena as reservas por data e hora
                fetchedReservations.sort((a, b) => {
                    const dateTimeA = new Date(`${a.date}T${a.time}`);
                    const dateTimeB = new Date(`${b.date}T${b.time}`);
                    return dateTimeA - dateTimeB;
                });
                setReservations(fetchedReservations); // Atualiza o estado
            }, (error) => {
                console.error("Erro ao buscar reservas:", error);
                setAlertMessage("Erro ao carregar reservas. Por favor, tente novamente.");
            });

            // Retorna a função de unsubscribe
            return () => unsubscribe();
        }
    }, [db, userId, isAuthReady]); // Dependências

    // Lida com a adição de uma nova reserva
    const handleAddReservation = async () => {
        if (!selectedSpace || !reservationDate || !reservationTime || !responsible.trim()) {
            setAlertMessage("Por favor, preencha todos os campos da reserva.");
            return;
        }
        if (!db || !userId) {
            setAlertMessage("Sistema não pronto. Tente novamente mais tarde.");
            return;
        }

        try {
            // Adiciona um novo documento na coleção de reservas
            await addDoc(collection(db, `artifacts/${__app_id}/users/${userId}/reservations`), {
                spaceName: selectedSpace,
                date: reservationDate,
                time: reservationTime,
                responsible: responsible,
                status: 'Pendente', // Status inicial da reserva
                createdAt: new Date()
            });
            // Limpa os campos do formulário
            setSelectedSpace('');
            setReservationDate('');
            setReservationTime('');
            setResponsible('');
            setAlertMessage("Reserva adicionada com sucesso!");
        } catch (error) {
            console.error("Erro ao adicionar reserva:", error);
            setAlertMessage("Erro ao adicionar reserva. Por favor, tente novamente.");
        }
    };

    // Lida com a exclusão de uma reserva
    const handleDeleteReservation = (reservationId) => {
        setConfirmAction(() => async () => {
            if (!db || !userId) {
                setAlertMessage("Sistema não pronto. Tente novamente mais tarde.");
                return;
            }
            try {
                // Exclui o documento da reserva
                await deleteDoc(doc(db, `artifacts/${__app_id}/users/${userId}/reservations`, reservationId));
                setAlertMessage("Reserva excluída com sucesso!");
            } catch (error) {
                console.error("Erro ao excluir reserva:", error);
                setAlertMessage("Erro ao excluir reserva. Por favor, tente novamente.");
            } finally {
                setConfirmAction(null);
                setAlertMessage(null);
            }
        });
        setAlertMessage("Tem certeza que deseja excluir esta reserva?");
    };

    // Funções de callback para o AlertDialog (Confirmar/Cancelar)
    const handleConfirm = () => {
        if (confirmAction) {
            confirmAction();
        }
        setAlertMessage(null);
    };

    const handleCancel = () => {
        setAlertMessage(null);
        setConfirmAction(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 font-sans">
            {/* Componente de alerta/confirmação */}
            <AlertDialog
                message={alertMessage}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                showCancel={confirmAction !== null}
            />
            {/* Barra de navegação do módulo de reservas */}
            <nav className="flex items-center justify-between py-4 border-b border-gray-200">
                <button
                    onClick={() => onNavigate('Dashboard')}
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
                >
                    {/* Ícone de seta para a esquerda */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left mr-2">
                        <path d="m12 19-7-7 7-7" />
                        <path d="M19 12H5" />
                    </svg>
                    Voltar para o Dashboard
                </button>
                <h2 className="text-3xl font-bold text-gray-800">Gerenciamento de Reservas</h2>
                {/* Exibe o ID do usuário */}
                <div className="text-gray-600">ID do Usuário: {userId || 'Carregando...'}</div>
            </nav>

            {/* Seção para adicionar nova reserva */}
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Adicionar Nova Reserva</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Select para escolher o espaço */}
                    <select
                        value={selectedSpace}
                        onChange={(e) => setSelectedSpace(e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Selecione o Espaço</option>
                        {availableSpaces.map((space, index) => (
                            <option key={index} value={space}>{space}</option>
                        ))}
                    </select>
                    {/* Inputs para data, hora e responsável */}
                    <input
                        type="date"
                        value={reservationDate}
                        onChange={(e) => setReservationDate(e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                    <input
                        type="time"
                        value={reservationTime}
                        onChange={(e) => setReservationTime(e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                    <input
                        type="text"
                        placeholder="Responsável pela reserva"
                        value={responsible}
                        onChange={(e) => setResponsible(e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <button
                    onClick={handleAddReservation} // Botão para adicionar reserva
                    className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Adicionar Reserva
                </button>
            </div>

            {/* Seção de Reservas Agendadas */}
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Reservas Agendadas</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                {/* Cabeçalhos da tabela */}
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Espaço</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hora</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Responsável</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {reservations.length === 0 ? (
                                <tr>
                                    {/* Mensagem se não houver reservas */}
                                    <td colSpan="6" className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">Nenhuma reserva agendada.</td>
                                </tr>
                            ) : (
                                // Mapeia e exibe cada reserva
                                reservations.map((reservation) => (
                                    <tr key={reservation.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{reservation.spaceName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.date}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.time}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.responsible}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {/* Exibe o status com cores diferentes */}
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                reservation.status === 'Confirmada' ? 'bg-green-100 text-green-800' :
                                                reservation.status === 'Pendente' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                                {reservation.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => handleDeleteReservation(reservation.id)} // Botão para excluir reserva
                                                className="text-red-600 hover:text-red-900 ml-2"
                                            >
                                                Excluir
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// Componente do Módulo de Cadastros
// Gerencia as abas para Condomínios, Veículos e Animais de Estimação.
const Cadastros = ({ onNavigate }) => {
    const [activeTab, setActiveTab] = useState('condominios'); // Estado para controlar a aba ativa

    // Componente auxiliar para os botões de aba
    const TabButton = ({ tabId, children }) => (
        <button
            onClick={() => setActiveTab(tabId)} // Define a aba ativa ao clicar
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors duration-200 ${
                activeTab === tabId ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
        >
            {children}
        </button>
    );

    return (
        <div className="min-h-screen bg-gray-50 p-6 font-sans">
            {/* Barra de navegação do módulo de cadastros */}
            <nav className="flex items-center justify-between py-4 border-b border-gray-200">
                <button
                    onClick={() => onNavigate('Dashboard')}
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
                >
                    {/* Ícone de seta para a esquerda */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left mr-2">
                        <path d="m12 19-7-7 7-7" />
                        <path d="M19 12H5" />
                    </svg>
                    Voltar para o Dashboard
                </button>
                <h2 className="text-3xl font-bold text-gray-800">Gerenciamento de Cadastros</h2>
                {/* Exibe o ID do usuário */}
                <div className="text-gray-600">ID do Usuário: {useFirebase().userId || 'Carregando...'}</div>
            </nav>

            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                {/* Botões das abas */}
                <div className="flex border-b border-gray-200 mb-4">
                    <TabButton tabId="condominios">Condomínios</TabButton>
                    <TabButton tabId="veiculos">Veículos</TabButton>
                    <TabButton tabId="animais">Animais de Estimação</TabButton>
                </div>

                {/* Renderiza o componente da aba ativa */}
                {activeTab === 'condominios' && <CondominioTab />}
                {activeTab === 'veiculos' && <VeiculosTab />}
                {activeTab === 'animais' && <AnimaisTab />}
            </div>
        </div>
    );
};

// Sub-componente para a aba de Condomínios dentro de Cadastros
// Gerencia o cadastro de unidades e moradores.
const CondominioTab = () => {
    const { db, userId, isAuthReady } = useFirebase(); // Obtém instâncias do Firebase e estado de autenticação
    const [units, setUnits] = useState([]); // Estado para armazenar a lista de unidades
    // Estados para os campos do formulário de unidade
    const [newUnitNumber, setNewUnitNumber] = useState('');
    const [newResidentName, setNewResidentName] = useState('');
    const [newResidentPhone, setNewResidentPhone] = useState('');
    // Estados para o modal de alerta/confirmação
    const [alertMessage, setAlertMessage] = useState(null);
    const [confirmAction, setConfirmAction] = useState(null);

    // Efeito para buscar unidades do Firestore em tempo real
    useEffect(() => {
        if (db && userId && isAuthReady) {
            // Cria uma referência para a coleção de unidades do usuário atual
            const unitsRef = collection(db, `artifacts/${__app_id}/users/${userId}/units`);
            const q = query(unitsRef); // Cria uma query

            // Assina as mudanças na coleção em tempo real
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const fetchedUnits = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                // Ordena as unidades pelo número da unidade
                fetchedUnits.sort((a, b) => a.unitNumber.localeCompare(b.unitNumber));
                setUnits(fetchedUnits); // Atualiza o estado
            }, (error) => {
                console.error("Erro ao buscar unidades:", error);
                setAlertMessage("Erro ao carregar unidades. Por favor, tente novamente.");
            });

            // Retorna a função de unsubscribe
            return () => unsubscribe();
        }
    }, [db, userId, isAuthReady]); // Dependências

    // Lida com a adição de uma nova unidade/morador
    const handleAddUnit = async () => {
        if (!newUnitNumber.trim() || !newResidentName.trim()) {
            setAlertMessage("Por favor, preencha o número da unidade e o nome do morador.");
            return;
        }
        if (!db || !userId) {
            setAlertMessage("Sistema não pronto. Tente novamente mais tarde.");
            return;
        }

        try {
            // Adiciona um novo documento na coleção de unidades
            await addDoc(collection(db, `artifacts/${__app_id}/users/${userId}/units`), {
                unitNumber: newUnitNumber,
                residentName: newResidentName,
                phone: newResidentPhone,
                createdAt: new Date()
            });
            // Limpa os campos do formulário
            setNewUnitNumber('');
            setNewResidentName('');
            setNewResidentPhone('');
            setAlertMessage("Unidade adicionada com sucesso!");
        } catch (error) {
            console.error("Erro ao adicionar unidade:", error);
            setAlertMessage("Erro ao adicionar unidade. Por favor, tente novamente.");
        }
    };

    // Lida com a exclusão de uma unidade
    const handleDeleteUnit = (unitId) => {
        setConfirmAction(() => async () => {
            if (!db || !userId) {
                setAlertMessage("Sistema não pronto. Tente novamente mais tarde.");
                return;
            }
            try {
                // Exclui o documento da unidade
                await deleteDoc(doc(db, `artifacts/${__app_id}/users/${userId}/units`, unitId));
                setAlertMessage("Unidade excluída com sucesso!");
            } catch (error) {
                console.error("Erro ao excluir unidade:", error);
                setAlertMessage("Erro ao excluir unidade. Por favor, tente novamente.");
            } finally {
                setConfirmAction(null);
                setAlertMessage(null);
            }
        });
        setAlertMessage("Tem certeza que deseja excluir esta unidade?");
    };

    // Funções de callback para o AlertDialog (Confirmar/Cancelar)
    const handleConfirm = () => {
        if (confirmAction) {
            confirmAction();
        }
        setAlertMessage(null);
    };

    const handleCancel = () => {
        setAlertMessage(null);
        setConfirmAction(null);
    };

    return (
        <div>
            {/* Componente de alerta/confirmação */}
            <AlertDialog
                message={alertMessage}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                showCancel={confirmAction !== null}
            />
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Adicionar Nova Unidade/Morador</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {/* Campos para número da unidade, nome do morador e telefone */}
                <input
                    type="text"
                    placeholder="Número da Unidade"
                    value={newUnitNumber}
                    onChange={(e) => setNewUnitNumber(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                    type="text"
                    placeholder="Nome do Morador"
                    value={newResidentName}
                    onChange={(e) => setNewResidentName(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                    type="text"
                    placeholder="Telefone (opcional)"
                    value={newResidentPhone}
                    onChange={(e) => setNewResidentPhone(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <button
                onClick={handleAddUnit} // Botão para adicionar unidade
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
                Adicionar Unidade
            </button>

            <h4 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Lista de Unidades/Moradores</h4>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {/* Cabeçalhos da tabela */}
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unidade</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome do Morador</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefone</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {units.length === 0 ? (
                            <tr>
                                {/* Mensagem se não houver unidades */}
                                <td colSpan="4" className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">Nenhuma unidade cadastrada.</td>
                            </tr>
                        ) : (
                            // Mapeia e exibe cada unidade
                            units.map((unit) => (
                                <tr key={unit.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{unit.unitNumber}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{unit.residentName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{unit.phone || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => handleDeleteUnit(unit.id)} // Botão para excluir unidade
                                            className="text-red-600 hover:text-red-900 ml-2"
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Sub-componente para a aba de Veículos dentro de Cadastros
// Gerencia o cadastro de veículos.
const VeiculosTab = () => {
    const { db, userId, isAuthReady } = useFirebase(); // Obtém instâncias do Firebase e estado de autenticação
    const [vehicles, setVehicles] = useState([]); // Estado para armazenar a lista de veículos
    // Estados para os campos do formulário de veículo
    const [newVehicleType, setNewVehicleType] = useState('');
    const [newVehiclePlate, setNewVehiclePlate] = useState('');
    const [newVehicleMake, setNewVehicleMake] = useState('');
    const [newVehicleModel, setNewVehicleModel] = useState('');
    const [newVehicleColor, setNewVehicleColor] = useState('');
    const [newVehicleResponsible, setNewVehicleResponsible] = useState('');
    const [newVehicleUnit, setNewVehicleUnit] = useState('');
    const [isForeignPlate, setIsForeignPlate] = useState(false); // Checkbox para placa estrangeira
    const [isArmoredVehicle, setIsArmoredVehicle] = useState(false); // Checkbox para veículo blindado
    // Estados para o modal de alerta/confirmação
    const [alertMessage, setAlertMessage] = useState(null);
    const [confirmAction, setConfirmAction] = useState(null);

    // Efeito para buscar veículos do Firestore em tempo real
    useEffect(() => {
        if (db && userId && isAuthReady) {
            // Cria uma referência para a coleção de veículos do usuário atual
            const vehiclesRef = collection(db, `artifacts/${__app_id}/users/${userId}/vehicles`);
            const q = query(vehiclesRef); // Cria uma query

            // Assina as mudanças na coleção em tempo real
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const fetchedVehicles = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                // Ordena os veículos pela placa
                fetchedVehicles.sort((a, b) => a.plate.localeCompare(b.plate));
                setVehicles(fetchedVehicles); // Atualiza o estado
            }, (error) => {
                console.error("Erro ao buscar veículos:", error);
                setAlertMessage("Erro ao carregar veículos. Por favor, tente novamente.");
            });

            // Retorna a função de unsubscribe
            return () => unsubscribe();
        }
    }, [db, userId, isAuthReady]); // Dependências

    // Lida com a adição de um novo veículo
    const handleAddVehicle = async () => {
        if (!newVehiclePlate.trim() || !newVehicleResponsible.trim()) {
            setAlertMessage("Por favor, preencha a placa e o responsável do veículo.");
            return;
        }
        if (!db || !userId) {
            setAlertMessage("Sistema não pronto. Tente novamente mais tarde.");
            return;
        }

        try {
            // Adiciona um novo documento na coleção de veículos
            await addDoc(collection(db, `artifacts/${__app_id}/users/${userId}/vehicles`), {
                type: newVehicleType,
                plate: newVehiclePlate,
                make: newVehicleMake,
                model: newVehicleModel,
                color: newVehicleColor,
                responsible: newVehicleResponsible,
                unit: newVehicleUnit,
                isForeignPlate: isForeignPlate,
                isArmoredVehicle: isArmoredVehicle,
                createdAt: new Date()
            });
            // Limpa os campos do formulário
            setNewVehicleType('');
            setNewVehiclePlate('');
            setNewVehicleMake('');
            setNewVehicleModel('');
            setNewVehicleColor('');
            setNewVehicleResponsible('');
            setNewVehicleUnit('');
            setIsForeignPlate(false);
            setIsArmoredVehicle(false);
            setAlertMessage("Veículo adicionado com sucesso!");
        } catch (error) {
            console.error("Erro ao adicionar veículo:", error);
            setAlertMessage("Erro ao adicionar veículo. Por favor, tente novamente.");
        }
    };

    // Lida com a exclusão de um veículo
    const handleDeleteVehicle = (vehicleId) => {
        setConfirmAction(() => async () => {
            if (!db || !userId) {
                setAlertMessage("Sistema não pronto. Tente novamente mais tarde.");
                return;
            }
            try {
                // Exclui o documento do veículo
                await deleteDoc(doc(db, `artifacts/${__app_id}/users/${userId}/vehicles`, vehicleId));
                setAlertMessage("Veículo excluído com sucesso!");
            } catch (error) {
                console.error("Erro ao excluir veículo:", error);
                setAlertMessage("Erro ao excluir veículo. Por favor, tente novamente.");
            } finally {
                setConfirmAction(null);
                setAlertMessage(null);
            }
        });
        setAlertMessage("Tem certeza que deseja excluir este veículo?");
    };

    // Funções de callback para o AlertDialog (Confirmar/Cancelar)
    const handleConfirm = () => {
        if (confirmAction) {
            confirmAction();
        }
        setAlertMessage(null);
    };

    const handleCancel = () => {
        setAlertMessage(null);
        setConfirmAction(null);
    };

    return (
        <div>
            {/* Componente de alerta/confirmação */}
            <AlertDialog
                message={alertMessage}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                showCancel={confirmAction !== null}
            />
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Adicionar Novo Veículo</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Campos para tipo, placa, marca, modelo, cor, responsável e unidade */}
                <input
                    type="text"
                    placeholder="Tipo (ex: Automóvel)"
                    value={newVehicleType}
                    onChange={(e) => setNewVehicleType(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                    type="text"
                    placeholder="Placa"
                    value={newVehiclePlate}
                    onChange={(e) => setNewVehiclePlate(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                    type="text"
                    placeholder="Marca"
                    value={newVehicleMake}
                    onChange={(e) => setNewVehicleMake(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                    type="text"
                    placeholder="Modelo"
                    value={newVehicleModel}
                    onChange={(e) => setNewVehicleModel(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                    type="text"
                    placeholder="Cor"
                    value={newVehicleColor}
                    onChange={(e) => setNewVehicleColor(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                    type="text"
                    placeholder="Responsável"
                    value={newVehicleResponsible}
                    onChange={(e) => setNewVehicleResponsible(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                    type="text"
                    placeholder="Unidade"
                    value={newVehicleUnit}
                    onChange={(e) => setNewVehicleUnit(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                {/* Checkboxes para placa estrangeira e veículo blindado */}
                <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={isForeignPlate}
                            onChange={(e) => setIsForeignPlate(e.target.checked)}
                            className="mr-2"
                        />
                        Placa estrangeira?
                    </label>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={isArmoredVehicle}
                            onChange={(e) => setIsArmoredVehicle(e.target.checked)}
                            className="mr-2"
                        />
                        Veículo blindado?
                    </label>
                </div>
            </div>
            <button
                onClick={handleAddVehicle} // Botão para adicionar veículo
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
                Adicionar Veículo
            </button>

            <h4 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Lista de Veículos</h4>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {/* Cabeçalhos da tabela */}
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Placa</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marca/Modelo</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cor</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Responsável</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unidade</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {vehicles.length === 0 ? (
                            <tr>
                                {/* Mensagem se não houver veículos */}
                                <td colSpan="7" className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">Nenhum veículo cadastrado.</td>
                            </tr>
                        ) : (
                            // Mapeia e exibe cada veículo
                            vehicles.map((vehicle) => (
                                <tr key={vehicle.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{vehicle.type}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vehicle.plate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vehicle.make}/{vehicle.model}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vehicle.color}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vehicle.responsible}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vehicle.unit}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => handleDeleteVehicle(vehicle.id)} // Botão para excluir veículo
                                            className="text-red-600 hover:text-red-900 ml-2"
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Sub-componente para a aba de Animais de Estimação dentro de Cadastros
// Gerencia o cadastro de animais de estimação.
const AnimaisTab = () => {
    const { db, userId, isAuthReady } = useFirebase(); // Obtém instâncias do Firebase e estado de autenticação
    const [pets, setPets] = useState([]); // Estado para armazenar a lista de animais
    // Estados para os campos do formulário de animal de estimação
    const [newPetName, setNewPetName] = useState('');
    const [newPetType, setNewPetType] = useState('');
    const [newPetBreed, setNewPetBreed] = useState('');
    const [newPetResponsible, setNewPetResponsible] = useState('');
    const [newPetUnit, setNewPetUnit] = useState('');
    // Estados para o modal de alerta/confirmação
    const [alertMessage, setAlertMessage] = useState(null);
    const [confirmAction, setConfirmAction] = useState(null);

    // Efeito para buscar animais de estimação do Firestore em tempo real
    useEffect(() => {
        if (db && userId && isAuthReady) {
            // Cria uma referência para a coleção de animais de estimação do usuário atual
            const petsRef = collection(db, `artifacts/${__app_id}/users/${userId}/pets`);
            const q = query(petsRef); // Cria uma query

            // Assina as mudanças na coleção em tempo real
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const fetchedPets = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                // Ordena os animais pelo nome
                fetchedPets.sort((a, b) => a.name.localeCompare(b.name));
                setPets(fetchedPets); // Atualiza o estado
            }, (error) => {
                console.error("Erro ao buscar animais de estimação:", error);
                setAlertMessage("Erro ao carregar animais de estimação. Por favor, tente novamente.");
            });

            // Retorna a função de unsubscribe
            return () => unsubscribe();
        }
    }, [db, userId, isAuthReady]); // Dependências

    // Lida com a adição de um novo animal de estimação
    const handleAddPet = async () => {
        if (!newPetName.trim() || !newPetType.trim() || !newPetResponsible.trim()) {
            setAlertMessage("Por favor, preencha o nome, tipo e responsável do animal.");
            return;
        }
        if (!db || !userId) {
            setAlertMessage("Sistema não pronto. Tente novamente mais tarde.");
            return;
        }

        try {
            // Adiciona um novo documento na coleção de animais de estimação
            await addDoc(collection(db, `artifacts/${__app_id}/users/${userId}/pets`), {
                name: newPetName,
                animalType: newPetType,
                breed: newPetBreed,
                responsible: newPetResponsible,
                unit: newPetUnit,
                createdAt: new Date()
            });
            // Limpa os campos do formulário
            setNewPetName('');
            setNewPetType('');
            setNewPetBreed('');
            setNewPetResponsible('');
            setNewPetUnit('');
            setAlertMessage("Animal de estimação adicionado com sucesso!");
        } catch (error) {
            console.error("Erro ao adicionar animal de estimação:", error);
            setAlertMessage("Erro ao adicionar animal de estimação. Por favor, tente novamente.");
        }
    };

    // Lida com a exclusão de um animal de estimação
    const handleDeletePet = (petId) => {
        setConfirmAction(() => async () => {
            if (!db || !userId) {
                setAlertMessage("Sistema não pronto. Tente novamente mais tarde.");
                return;
            }
            try {
                // Exclui o documento do animal de estimação
                await deleteDoc(doc(db, `artifacts/${__app_id}/users/${userId}/pets`, petId));
                setAlertMessage("Animal de estimação excluído com sucesso!");
            } catch (error) {
                console.error("Erro ao excluir animal de estimação:", error);
                setAlertMessage("Erro ao excluir animal de estimação. Por favor, tente novamente.");
            } finally {
                setConfirmAction(null);
                setAlertMessage(null);
            }
        });
        setAlertMessage("Tem certeza que deseja excluir este animal de estimação?");
    };

    // Funções de callback para o AlertDialog (Confirmar/Cancelar)
    const handleConfirm = () => {
        if (confirmAction) {
            confirmAction();
        }
        setAlertMessage(null);
    };

    const handleCancel = () => {
        setAlertMessage(null);
        setConfirmAction(null);
    };

    return (
        <div>
            {/* Componente de alerta/confirmação */}
            <AlertDialog
                message={alertMessage}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                showCancel={confirmAction !== null}
            />
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Adicionar Novo Animal de Estimação</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Campos para nome, tipo, raça, responsável e unidade do animal */}
                <input
                    type="text"
                    placeholder="Nome do animal"
                    value={newPetName}
                    onChange={(e) => setNewPetName(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                    type="text"
                    placeholder="Tipo (ex: Cachorro, Gato)"
                    value={newPetType}
                    onChange={(e) => setNewPetType(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                    type="text"
                    placeholder="Raça (opcional)"
                    value={newPetBreed}
                    onChange={(e) => setNewPetBreed(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                    type="text"
                    placeholder="Responsável"
                    value={newPetResponsible}
                    onChange={(e) => setNewPetResponsible(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                    type="text"
                    placeholder="Unidade"
                    value={newPetUnit}
                    onChange={(e) => setNewPetUnit(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <button
                onClick={handleAddPet} // Botão para adicionar animal
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
                Adicionar Animal
            </button>

            <h4 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Lista de Animais de Estimação</h4>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {/* Cabeçalhos da tabela */}
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Raça</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Responsável</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unidade</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {pets.length === 0 ? (
                            <tr>
                                {/* Mensagem se não houver animais */}
                                <td colSpan="6" className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">Nenhum animal de estimação cadastrado.</td>
                            </tr>
                        ) : (
                            // Mapeia e exibe cada animal
                            pets.map((pet) => (
                                <tr key={pet.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{pet.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pet.animalType}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pet.breed || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pet.responsible}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pet.unit}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => handleDeletePet(pet.id)} // Botão para excluir animal
                                            className="text-red-600 hover:text-red-900 ml-2"
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


// Componente principal da aplicação
// Gerencia a navegação entre os diferentes módulos do aplicativo.
const App = () => {
    const [currentPage, setCurrentPage] = useState('Dashboard'); // Estado para controlar a página atual

    // Função para navegar para uma página específica
    const navigateTo = (page) => {
        setCurrentPage(page);
    };

    return (
        // O FirebaseProvider envolve toda a aplicação para fornecer acesso ao Firebase
        <FirebaseProvider>
            <div className="min-h-screen bg-gray-100 font-sans">
                {/* Carregamento do Tailwind CSS CDN para estilização */}
                <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
                {/* Carregamento da fonte Inter do Google Fonts */}
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

                {/* Renderização condicional dos módulos com base na página atual */}
                {currentPage === 'Dashboard' && <Dashboard onNavigate={navigateTo} />}
                {currentPage === 'Portaria' && <Portaria onNavigate={navigateTo} />}
                {currentPage === 'Reservas' && <Reservas onNavigate={navigateTo} />}
                {currentPage === 'Cadastros' && <Cadastros onNavigate={navigateTo} />}

                {/* Pode adicionar mais componentes para outras páginas aqui conforme o desenvolvimento */}
            </div>
        </FirebaseProvider>
    );
};

export default App; // Exporta o componente App como o componente padrão
