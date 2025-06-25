import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Phone, 
  MessageCircle, 
  Shield, 
  Heart, 
  Calendar, 
  Info,
  Users,
  Clock,
  Star,
  ArrowRight,
  PhoneCall,
  AlertTriangle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const { currentUser } = useAuth();

  const emergencyContacts = [
    {
      name: 'Línea Nacional de Prevención del Suicidio',
      number: '988',
      description: 'Disponible 24/7 para crisis emocionales',
      type: 'emergency'
    },
    {
      name: 'Línea de Ayuda contra el Acoso',
      number: '1-800-273-8255',
      description: 'Apoyo especializado en bullying y ciberbullying',
      type: 'support'
    },
    {
      name: 'Servicios de Emergencia',
      number: '911',
      description: 'Para situaciones de peligro inmediato',
      type: 'emergency'
    }
  ];

  const specialists = [
    {
      name: 'Dr. María González',
      specialty: 'Psicóloga Clínica',
      rating: 4.9,
      experience: '15 años',
      available: true,
      image: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    },
    {
      name: 'Dr. Carlos Ruiz',
      specialty: 'Psiquiatra',
      rating: 4.8,
      experience: '12 años',
      available: true,
      image: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    },
    {
      name: 'Dra. Ana Martínez',
      specialty: 'Terapia Familiar',
      rating: 4.9,
      experience: '10 años',
      available: false,
      image: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    }
  ];

  const quickActions = [
    {
      title: 'Información y Recursos',
      description: 'Artículos sobre acoso y ciberbullying',
      icon: Info,
      link: '/information',
      color: 'from-blue-500 to-purple-600'
    },
    {
      title: 'Foro Comunitario',
      description: 'Comparte experiencias de forma anónima',
      icon: Users,
      link: '/forum',
      color: 'from-green-500 to-teal-600'
    },
    {
      title: 'Agenda Emocional',
      description: 'Gestiona tu bienestar diario',
      icon: Calendar,
      link: '/agenda',
      color: 'from-purple-500 to-pink-600'
    }
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-6">
            Bienvenido a{' '}
            <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              Escucharte
            </span>
          </h1>
          <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto mb-8">
            Tu espacio seguro para el bienestar emocional y la prevención del acoso. 
            Aquí encontrarás apoyo, recursos y una comunidad que te comprende.
          </p>
          {currentUser && (
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 max-w-2xl mx-auto border border-white/20">
              <p className="text-lg text-gray-700">
                Hola, <span className="font-semibold text-teal-600">{currentUser.displayName || 'Usuario'}</span>
              </p>
              <p className="text-gray-600 mt-2">
                ¿Cómo podemos ayudarte hoy?
              </p>
            </div>
          )}
        </div>

        {/* Emergency Section */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl shadow-xl p-8 text-white mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <AlertTriangle className="h-8 w-8" />
              <h2 className="text-3xl font-bold">¿Necesitas Ayuda Inmediata?</h2>
            </div>
            <p className="text-xl mb-6 opacity-90">
              Si estás en una situación de emergencia o crisis, no estás solo. 
              Contacta inmediatamente a estos servicios de apoyo.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="bg-white/20 backdrop-blur-md rounded-xl p-6 border border-white/30">
                  <div className="flex items-center space-x-3 mb-3">
                    <Phone className="h-6 w-6" />
                    <h3 className="font-bold text-lg">{contact.name}</h3>
                  </div>
                  <p className="text-2xl font-bold mb-2">{contact.number}</p>
                  <p className="text-sm opacity-90">{contact.description}</p>
                  <button className="mt-4 bg-white text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-2">
                    <PhoneCall className="h-4 w-4" />
                    <span>Llamar Ahora</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Specialists Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Consulta con Especialistas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conecta con profesionales de la salud mental especializados en apoyo emocional y prevención del acoso
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {specialists.map((specialist, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-all duration-300">
                <div className="text-center mb-6">
                  <img
                    src={specialist.image}
                    alt={specialist.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-lg"
                  />
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{specialist.name}</h3>
                  <p className="text-teal-600 font-medium mb-2">{specialist.specialty}</p>
                  
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span>{specialist.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{specialist.experience}</span>
                    </div>
                  </div>

                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    specialist.available 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      specialist.available ? 'bg-green-400' : 'bg-gray-400'
                    }`}></div>
                    {specialist.available ? 'Disponible' : 'Ocupado'}
                  </div>
                </div>

                <button 
                  disabled={!specialist.available}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                    specialist.available
                      ? 'bg-gradient-to-r from-teal-500 to-blue-600 text-white hover:from-teal-600 hover:to-blue-700'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>{specialist.available ? 'Iniciar Consulta' : 'No Disponible'}</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Explora Nuestros Recursos
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Accede a herramientas y recursos diseñados para tu bienestar emocional
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link
                  key={index}
                  to={action.link}
                  className="group bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${action.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-teal-600 transition-colors duration-300">
                    {action.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {action.description}
                  </p>
                  
                  <div className="flex items-center text-teal-600 font-medium group-hover:text-teal-700 transition-colors duration-300">
                    <span>Explorar</span>
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Support Message */}
        <div className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-2xl shadow-xl p-8 text-white text-center">
          <Heart className="h-16 w-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl font-bold mb-4">
            No Estás Solo
          </h2>
          <p className="text-xl mb-6 opacity-90 max-w-3xl mx-auto">
            En Escucharte creemos que cada persona merece sentirse segura, valorada y escuchada. 
            Nuestra comunidad está aquí para apoyarte en cada paso de tu camino hacia el bienestar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/forum"
              className="bg-white text-teal-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <Users className="h-5 w-5" />
              <span>Únete a la Comunidad</span>
            </Link>
            <Link
              to="/information"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-teal-600 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <Shield className="h-5 w-5" />
              <span>Aprende Más</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;