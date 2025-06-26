import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Home, 
  Info, 
  MessageSquare, 
  Calendar, 
  LogOut, 
  User,
  Heart,
  Shield
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const navigation = [
    { name: 'Inicio', href: '/', icon: Home },
    { name: 'Información', href: '/information', icon: Info },
    { name: 'Foro', href: '/forum', icon: MessageSquare },
    { name: 'Agenda Emocional', href: '/agenda', icon: Calendar },
    { name: 'Editar Perfil', href: '/edit-profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 flex flex-col">
      {/* Navigation Header */}
      <nav className="bg-white/90 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex flex-wrap justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 mb-2 md:mb-0 group">
              <div className="bg-gradient-to-r from-teal-500 to-blue-600 p-2 rounded-xl group-hover:scale-105 transition-transform">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent group-hover:underline">
                Escucharte
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-md scale-105'
                        : 'text-gray-600 hover:text-teal-600 hover:bg-teal-50 hover:scale-105'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* User Menu */}
            <div className="relative flex items-center space-x-2 md:space-x-4 mt-2 md:mt-0">
              {currentUser && (
                <div className="group flex items-center space-x-2 md:space-x-3 cursor-pointer relative">
                  {/* Foto de perfil */}
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt="Foto de perfil"
                      className="w-8 h-8 rounded-full border-2 border-blue-400 object-cover"
                    />
                  ) : (
                    <User className="h-8 w-8 text-gray-400 bg-gray-100 rounded-full p-1 border-2 border-blue-200" />
                  )}
                  {/* Nombre y menú */}
                  <span className="hidden sm:block font-medium text-xs md:text-base truncate max-w-[100px] md:max-w-xs">
                    {currentUser.displayName || currentUser.email}
                  </span>
                  {/* Menú desplegable */}
                  <div className="hidden group-hover:flex flex-col absolute top-10 right-0 bg-white shadow-lg rounded-lg border w-44 z-50 animate-fade-in">
                    <Link
                      to="/edit-profile"
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-t-lg transition-colors duration-200 text-sm"
                    >
                      <User className="h-5 w-5" />
                      <span>Editar Perfil</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-red-50 rounded-b-lg transition-colors duration-200 text-sm w-full text-left"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Salir</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-gray-200">
          <div className="flex justify-around py-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex flex-col items-center space-y-1 px-2 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'text-teal-600 bg-teal-50 scale-105'
                      : 'text-gray-600 hover:text-teal-600 hover:scale-105'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 w-full px-2 sm:px-4 md:px-0">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-white/20 mt-16">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Shield className="h-6 w-6 text-teal-600" />
              <span className="text-lg font-semibold text-gray-800">
                Tu bienestar es nuestra prioridad
              </span>
            </div>
            <p className="text-gray-600 mb-4 text-xs md:text-base">
              Escucharte es una plataforma segura y confidencial para el apoyo emocional y la prevención del acoso.
            </p>
            <div className="flex flex-wrap justify-center space-x-2 md:space-x-6 text-xs md:text-sm text-gray-500">
              <span>© 2024 Escucharte</span>
              <span>•</span>
              <span>Privacidad</span>
              <span>•</span>
              <span>Términos</span>
              <span>•</span>
              <span>Ayuda</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;