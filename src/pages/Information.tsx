import React, { useState } from 'react';
import { 
  Search, 
  BookOpen, 
  Shield, 
  AlertTriangle, 
  Heart, 
  Users, 
  Phone,
  ExternalLink,
  ChevronRight,
  Filter,
  Clock,
  Star
} from 'lucide-react';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'bullying' | 'cyberbullying' | 'prevention' | 'support' | 'resources';
  readTime: number;
  rating: number;
  image: string;
  tags: string[];
  author: string;
  publishDate: string;
}

const Information: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const categories = {
    all: { name: 'Todos', icon: BookOpen, color: 'text-gray-600' },
    bullying: { name: 'Acoso Escolar', icon: AlertTriangle, color: 'text-red-600' },
    cyberbullying: { name: 'Ciberbullying', icon: Shield, color: 'text-blue-600' },
    prevention: { name: 'Prevención', icon: Heart, color: 'text-green-600' },
    support: { name: 'Apoyo', icon: Users, color: 'text-purple-600' },
    resources: { name: 'Recursos', icon: Phone, color: 'text-teal-600' }
  };

  const articles: Article[] = [
    {
      id: '1',
      title: 'Identificando las Señales del Acoso Escolar',
      excerpt: 'Aprende a reconocer los signos tempranos del bullying y cómo actuar de manera efectiva.',
      content: `El acoso escolar es un problema serio que afecta a millones de estudiantes. Es importante reconocer las señales para poder intervenir a tiempo.

**Señales físicas:**
- Lesiones inexplicables
- Ropa dañada o perdida
- Pérdida de apetito
- Dolores de cabeza o estómago frecuentes

**Señales emocionales:**
- Cambios súbitos en el comportamiento
- Pérdida de amigos o actividades sociales
- Sentimientos de impotencia
- Problemas para dormir o pesadillas

**Señales académicas:**
- Disminución en las calificaciones
- Pérdida de interés en el trabajo escolar
- No querer ir a la escuela
- Pérdida de concentración

**¿Qué hacer si sospechas acoso?**
1. Mantén la calma y escucha sin juzgar
2. Documenta los incidentes
3. Contacta a la escuela inmediatamente
4. Busca apoyo profesional si es necesario
5. Refuerza la autoestima del menor

Recuerda: el acoso no es culpa de la víctima y siempre hay ayuda disponible.`,
      category: 'bullying',
      readTime: 8,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['señales', 'identificación', 'prevención', 'padres'],
      author: 'Dra. María González',
      publishDate: '2024-01-15'
    },
    {
      id: '2',
      title: 'Ciberbullying: Protégete en el Mundo Digital',
      excerpt: 'Estrategias efectivas para prevenir y responder al acoso en línea.',
      content: `El ciberbullying es el uso de tecnología digital para intimidar, amenazar o humillar a otros. A diferencia del bullying tradicional, puede ocurrir las 24 horas del día.

**Formas comunes de ciberbullying:**
- Mensajes amenazantes o insultantes
- Difusión de rumores en línea
- Exclusión de grupos digitales
- Suplantación de identidad
- Compartir información privada sin consentimiento

**Estrategias de prevención:**
1. **Configura la privacidad:** Ajusta las configuraciones de privacidad en todas las redes sociales
2. **Piensa antes de publicar:** Una vez en internet, es difícil eliminar completamente el contenido
3. **No compartas información personal:** Evita compartir datos como dirección, teléfono o ubicación
4. **Sé selectivo con los contactos:** Solo acepta solicitudes de personas que conoces

**Si eres víctima de ciberbullying:**
- No respondas a las provocaciones
- Guarda evidencia (capturas de pantalla)
- Bloquea al acosador
- Reporta el comportamiento a la plataforma
- Busca apoyo de adultos de confianza

**Herramientas útiles:**
- Configuraciones de privacidad en redes sociales
- Aplicaciones de control parental
- Filtros de contenido
- Reportes a plataformas digitales

La educación digital es clave para navegar seguro en internet.`,
      category: 'cyberbullying',
      readTime: 10,
      rating: 4.9,
      image: 'https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['internet', 'redes sociales', 'seguridad digital', 'prevención'],
      author: 'Dr. Carlos Ruiz',
      publishDate: '2024-01-10'
    },
    {
      id: '3',
      title: 'Construyendo Resiliencia Emocional',
      excerpt: 'Desarrolla herramientas para fortalecer tu bienestar mental y emocional.',
      content: `La resiliencia emocional es la capacidad de adaptarse y recuperarse de situaciones difíciles. Es una habilidad que se puede desarrollar y fortalecer.

**¿Qué es la resiliencia?**
La resiliencia no significa que no experimentarás dificultades o angustia. Significa que tienes las herramientas para manejar estos desafíos de manera saludable.

**Componentes de la resiliencia:**
1. **Autoconciencia:** Reconocer tus emociones y reacciones
2. **Autorregulación:** Manejar tus emociones de manera efectiva
3. **Optimismo realista:** Mantener esperanza mientras reconoces los desafíos
4. **Flexibilidad mental:** Adaptarse a nuevas situaciones
5. **Conexiones sociales:** Mantener relaciones de apoyo

**Estrategias para desarrollar resiliencia:**

**Cuidado personal:**
- Mantén rutinas saludables de sueño
- Ejercítate regularmente
- Come de manera balanceada
- Practica técnicas de relajación

**Mindfulness y meditación:**
- Practica la atención plena diariamente
- Usa aplicaciones de meditación
- Realiza ejercicios de respiración
- Mantén un diario de gratitud

**Construcción de relaciones:**
- Cultiva amistades positivas
- Busca mentores y modelos a seguir
- Participa en actividades comunitarias
- No tengas miedo de pedir ayuda

**Desarrollo de habilidades:**
- Aprende nuevas competencias
- Establece metas alcanzables
- Celebra pequeños logros
- Aprende de los errores

Recuerda: desarrollar resiliencia es un proceso continuo, no un destino.`,
      category: 'support',
      readTime: 12,
      rating: 4.7,
      image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['resiliencia', 'bienestar mental', 'autoayuda', 'crecimiento personal'],
      author: 'Dra. Ana Martínez',
      publishDate: '2024-01-05'
    },
    {
      id: '4',
      title: 'Recursos de Ayuda y Líneas de Apoyo',
      excerpt: 'Directorio completo de recursos disponibles para víctimas de acoso y sus familias.',
      content: `Cuando enfrentas situaciones de acoso, es fundamental saber que no estás solo y que hay recursos disponibles para ayudarte.

**Líneas de Crisis Nacional:**
- **Línea Nacional de Prevención del Suicidio:** 988
  - Disponible 24/7
  - Confidencial y gratuito
  - Apoyo en crisis emocionales

- **Línea de Ayuda contra el Acoso:** 1-800-273-8255
  - Especializada en bullying y ciberbullying
  - Consejeros entrenados
  - Recursos para padres y educadores

**Recursos en Línea:**
- **StopBullying.gov:** Información oficial del gobierno
- **Cyberbullying.org:** Recursos especializados en ciberbullying
- **PACER's National Bullying Prevention Center:** Materiales educativos

**Aplicaciones Móviles Útiles:**
- **STOPit:** Reporta incidentes de manera anónima
- **ReThink:** Previene el ciberbullying antes de que ocurra
- **Headspace:** Meditación y mindfulness para el bienestar

**Apoyo Legal:**
Si el acoso incluye amenazas, violencia física, o discriminación, puedes necesitar apoyo legal:
- Contacta a las autoridades locales
- Consulta con un abogado especializado
- Documenta todos los incidentes

**Recursos para Padres:**
- Grupos de apoyo locales
- Talleres de educación parental
- Recursos de las escuelas
- Organizaciones comunitarias

**Apoyo Profesional:**
- Psicólogos especializados en trauma
- Terapeutas familiares
- Consejeros escolares
- Trabajadores sociales

**Cómo usar estos recursos:**
1. No esperes hasta que la situación empeore
2. Mantén registros de todos los contactos
3. Sé persistente si no obtienes ayuda inmediata
4. Busca múltiples fuentes de apoyo

Recuerda: buscar ayuda es un signo de fortaleza, no de debilidad.`,
      category: 'resources',
      readTime: 15,
      rating: 4.9,
      image: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['recursos', 'ayuda', 'líneas de apoyo', 'emergencia'],
      author: 'Equipo Escucharte',
      publishDate: '2024-01-01'
    },
    {
      id: '5',
      title: 'Creando Ambientes Escolares Seguros',
      excerpt: 'Estrategias para educadores y administradores para prevenir el acoso en las escuelas.',
      content: `Crear un ambiente escolar seguro requiere el compromiso de toda la comunidad educativa. Aquí te presentamos estrategias efectivas.

**Elementos de una escuela segura:**
1. **Políticas claras:** Reglas específicas sobre el comportamiento esperado
2. **Supervisión efectiva:** Adultos presentes en áreas comunes
3. **Cultura de respeto:** Valores compartidos de inclusión y respeto
4. **Sistemas de reporte:** Mecanismos seguros para reportar incidentes

**Estrategias de prevención:**

**Para educadores:**
- Establece expectativas claras desde el primer día
- Modela comportamientos respetuosos
- Interviene inmediatamente ante cualquier signo de acoso
- Crea oportunidades para que todos los estudiantes participen

**Para administradores:**
- Desarrolla políticas anti-acoso comprensivas
- Proporciona entrenamiento regular al personal
- Establece consecuencias claras y consistentes
- Involucra a los padres en la prevención

**Programas efectivos:**
- **Programas de mediación entre pares:** Estudiantes entrenados ayudan a resolver conflictos
- **Círculos de paz:** Espacios para discutir problemas y encontrar soluciones
- **Educación socioemocional:** Enseña habilidades de empatía y comunicación
- **Actividades de construcción de comunidad:** Eventos que unen a la comunidad escolar

**Señales de una cultura escolar positiva:**
- Los estudiantes se sienten seguros para ser ellos mismos
- Hay diversidad en los grupos de amigos
- Los conflictos se resuelven de manera constructiva
- Todos los estudiantes tienen oportunidades de liderazgo

**Involucrando a las familias:**
- Comunicación regular sobre políticas escolares
- Talleres para padres sobre prevención del acoso
- Oportunidades de voluntariado en la escuela
- Canales abiertos de comunicación

**Medición del éxito:**
- Encuestas regulares sobre clima escolar
- Seguimiento de incidentes reportados
- Evaluación de programas de prevención
- Retroalimentación de estudiantes y familias

Una escuela segura beneficia a todos: estudiantes, educadores y familias.`,
      category: 'prevention',
      readTime: 11,
      rating: 4.6,
      image: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['escuelas', 'prevención', 'educadores', 'ambiente seguro'],
      author: 'Dr. Luis Hernández',
      publishDate: '2023-12-28'
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  if (selectedArticle) {
    return (
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <button
            onClick={() => setSelectedArticle(null)}
            className="flex items-center space-x-2 text-teal-600 hover:text-teal-700 mb-8 transition-colors duration-200"
          >
            <ChevronRight className="h-5 w-5 rotate-180" />
            <span>Volver a artículos</span>
          </button>

          {/* Article Header */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 mb-8 border border-white/20">
            <img
              src={selectedArticle.image}
              alt={selectedArticle.title}
              className="w-full h-64 object-cover rounded-xl mb-6"
            />
            
            <div className="flex items-center space-x-4 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                selectedArticle.category === 'bullying' ? 'bg-red-100 text-red-700' :
                selectedArticle.category === 'cyberbullying' ? 'bg-blue-100 text-blue-700' :
                selectedArticle.category === 'prevention' ? 'bg-green-100 text-green-700' :
                selectedArticle.category === 'support' ? 'bg-purple-100 text-purple-700' :
                'bg-teal-100 text-teal-700'
              }`}>
                {categories[selectedArticle.category].name}
              </span>
              
              <div className="flex items-center space-x-1 text-gray-600">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{selectedArticle.readTime} min lectura</span>
              </div>
              
              <div className="flex items-center space-x-1 text-gray-600">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm">{selectedArticle.rating}</span>
              </div>
            </div>

            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {selectedArticle.title}
            </h1>
            
            <div className="flex items-center space-x-4 text-gray-600 mb-6">
              <span>Por {selectedArticle.author}</span>
              <span>•</span>
              <span>{new Date(selectedArticle.publishDate).toLocaleDateString('es-ES')}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {selectedArticle.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Article Content */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-white/20">
            <div className="prose prose-lg max-w-none">
              {selectedArticle.content.split('\n').map((paragraph, index) => {
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return (
                    <h3 key={index} className="text-xl font-bold text-gray-800 mt-6 mb-3">
                      {paragraph.slice(2, -2)}
                    </h3>
                  );
                } else if (paragraph.startsWith('- ')) {
                  return (
                    <li key={index} className="text-gray-700 mb-2 ml-4">
                      {paragraph.slice(2)}
                    </li>
                  );
                } else if (paragraph.match(/^\d+\./)) {
                  return (
                    <li key={index} className="text-gray-700 mb-2 ml-4 list-decimal">
                      {paragraph.replace(/^\d+\.\s*/, '')}
                    </li>
                  );
                } else if (paragraph.trim()) {
                  return (
                    <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  );
                }
                return null;
              })}
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Artículos Relacionados</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles
                .filter(article => 
                  article.id !== selectedArticle.id && 
                  article.category === selectedArticle.category
                )
                .slice(0, 2)
                .map((article) => (
                  <div
                    key={article.id}
                    onClick={() => setSelectedArticle(article)}
                    className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/20 cursor-pointer hover:shadow-xl transition-all duration-300"
                  >
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-32 object-cover rounded-lg mb-4"
                    />
                    <h4 className="font-bold text-gray-800 mb-2">{article.title}</h4>
                    <p className="text-gray-600 text-sm">{article.excerpt}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Centro de Información
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Recursos educativos sobre acoso, ciberbullying y bienestar emocional
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 mb-8 border border-white/20">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar artículos, temas o palabras clave..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
              >
                {Object.entries(categories).map(([key, category]) => (
                  <option key={key} value={key}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-3 mb-8">
          {Object.entries(categories).map(([key, category]) => {
            const Icon = category.icon;
            return (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === key
                    ? 'bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-md'
                    : 'bg-white/80 text-gray-600 hover:text-teal-600 hover:bg-teal-50 border border-white/20'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden border border-white/20 cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    article.category === 'bullying' ? 'bg-red-100 text-red-700' :
                    article.category === 'cyberbullying' ? 'bg-blue-100 text-blue-700' :
                    article.category === 'prevention' ? 'bg-green-100 text-green-700' :
                    article.category === 'support' ? 'bg-purple-100 text-purple-700' :
                    'bg-teal-100 text-teal-700'
                  }`}>
                    {categories[article.category].name}
                  </span>
                  
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{article.readTime} min</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{article.rating}</span>
                  </div>
                  
                  <div className="flex items-center text-teal-600 font-medium">
                    <span className="text-sm">Leer más</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mt-4">
                  {article.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No se encontraron artículos
            </h3>
            <p className="text-gray-600">
              Intenta con otros términos de búsqueda o selecciona una categoría diferente
            </p>
          </div>
        )}

        {/* Emergency Resources */}
        <div className="mt-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl shadow-xl p-8 text-white">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">¿Necesitas Ayuda Inmediata?</h2>
            <p className="text-xl mb-6 opacity-90">
              Si estás en una situación de emergencia, no esperes. Contacta inmediatamente:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-white/20 backdrop-blur-md rounded-lg p-4">
                <Phone className="h-6 w-6 mx-auto mb-2" />
                <p className="font-bold">Línea Nacional</p>
                <p className="text-2xl font-bold">988</p>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-lg p-4">
                <Phone className="h-6 w-6 mx-auto mb-2" />
                <p className="font-bold">Emergencias</p>
                <p className="text-2xl font-bold">911</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;