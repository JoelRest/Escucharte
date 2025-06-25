import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  MessageSquare, 
  Plus, 
  Heart, 
  MessageCircle, 
  Flag, 
  Shield, 
  Eye,
  EyeOff,
  Send,
  Search,
  Filter,
  Clock,
  TrendingUp,
  Users,
  Lock,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  isAnonymous: boolean;
  timestamp: Date;
  category: 'support' | 'report' | 'advice' | 'experience' | 'resources';
  likes: number;
  replies: number;
  isLiked: boolean;
  tags: string[];
  isResolved?: boolean;
}

interface Reply {
  id: string;
  postId: string;
  content: string;
  author: string;
  isAnonymous: boolean;
  timestamp: Date;
  likes: number;
  isLiked: boolean;
}

const Forum: React.FC = () => {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showNewPost, setShowNewPost] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'trending'>('recent');

  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'support' as const,
    isAnonymous: false,
    tags: [] as string[]
  });

  const [newReply, setNewReply] = useState({
    content: '',
    isAnonymous: false
  });

  const categories = {
    all: { name: 'Todos', icon: MessageSquare, color: 'text-gray-600', description: 'Todas las publicaciones' },
    support: { name: 'Apoyo', icon: Heart, color: 'text-pink-600', description: 'Buscar y ofrecer apoyo emocional' },
    report: { name: 'Denuncias', icon: Flag, color: 'text-red-600', description: 'Reportar situaciones de acoso' },
    advice: { name: 'Consejos', icon: MessageCircle, color: 'text-blue-600', description: 'Compartir y pedir consejos' },
    experience: { name: 'Experiencias', icon: Users, color: 'text-green-600', description: 'Compartir experiencias personales' },
    resources: { name: 'Recursos', icon: Shield, color: 'text-purple-600', description: 'Compartir recursos útiles' }
  };

  // Mock data initialization
  useEffect(() => {
    const mockPosts: Post[] = [
      {
        id: '1',
        title: 'Necesito ayuda con situación de acoso en mi escuela',
        content: 'Hola a todos. Estoy pasando por una situación difícil en mi escuela y no sé qué hacer. Un grupo de compañeros me está molestando constantemente y me siento muy solo. ¿Alguien ha pasado por algo similar? ¿Qué me recomiendan hacer?',
        author: 'Usuario Anónimo',
        isAnonymous: true,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        category: 'support',
        likes: 12,
        replies: 8,
        isLiked: false,
        tags: ['acoso escolar', 'ayuda', 'consejos'],
        isResolved: false
      },
      {
        id: '2',
        title: 'Cómo superé el ciberbullying - Mi historia',
        content: 'Quiero compartir mi experiencia para ayudar a otros que puedan estar pasando por lo mismo. Hace un año era víctima de ciberbullying y pensé que nunca iba a salir de esa situación. Hoy puedo decir que lo superé y quiero contarles cómo...',
        author: 'María G.',
        isAnonymous: false,
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        category: 'experience',
        likes: 25,
        replies: 15,
        isLiked: true,
        tags: ['ciberbullying', 'superación', 'historia personal'],
        isResolved: true
      },
      {
        id: '3',
        title: 'Recursos útiles para padres preocupados',
        content: 'Como padre que ha pasado por la experiencia de tener un hijo víctima de acoso, quiero compartir algunos recursos que me fueron muy útiles. Incluyo links a organizaciones, libros recomendados y estrategias que funcionaron en nuestro caso.',
        author: 'Carlos R.',
        isAnonymous: false,
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
        category: 'resources',
        likes: 18,
        replies: 6,
        isLiked: false,
        tags: ['padres', 'recursos', 'ayuda familiar']
      },
      {
        id: '4',
        title: 'Denuncia anónima - Situación en redes sociales',
        content: 'Quiero reportar una situación que está ocurriendo en mi comunidad. Hay un grupo que está acosando sistemáticamente a varios estudiantes a través de redes sociales. No sé si debo involucrarme directamente, pero siento que debo hacer algo.',
        author: 'Usuario Anónimo',
        isAnonymous: true,
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
        category: 'report',
        likes: 8,
        replies: 12,
        isLiked: false,
        tags: ['denuncia', 'redes sociales', 'acoso grupal']
      }
    ];

    const mockReplies: Reply[] = [
      {
        id: '1',
        postId: '1',
        content: 'Hola, siento mucho lo que estás pasando. Yo viví algo similar y lo que más me ayudó fue hablar con un adulto de confianza. ¿Has considerado hablar con tus padres o un consejero escolar?',
        author: 'Ana M.',
        isAnonymous: false,
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        likes: 5,
        isLiked: false
      },
      {
        id: '2',
        postId: '1',
        content: 'No estás solo en esto. Es importante que documentes todo lo que está pasando. Toma capturas de pantalla si es por redes sociales, y anota fechas y lugares si es presencial. Esta información será útil cuando busques ayuda.',
        author: 'Usuario Anónimo',
        isAnonymous: true,
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        likes: 8,
        isLiked: true
      }
    ];

    setPosts(mockPosts);
    setReplies(mockReplies);
  }, []);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    
    const post: Post = {
      id: Date.now().toString(),
      title: newPost.title,
      content: newPost.content,
      author: newPost.isAnonymous ? 'Usuario Anónimo' : (currentUser?.displayName || 'Usuario'),
      isAnonymous: newPost.isAnonymous,
      timestamp: new Date(),
      category: newPost.category,
      likes: 0,
      replies: 0,
      isLiked: false,
      tags: newPost.tags,
      isResolved: false
    };

    setPosts([post, ...posts]);
    setNewPost({
      title: '',
      content: '',
      category: 'support',
      isAnonymous: false,
      tags: []
    });
    setShowNewPost(false);
  };

  const handleCreateReply = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPost) return;

    const reply: Reply = {
      id: Date.now().toString(),
      postId: selectedPost.id,
      content: newReply.content,
      author: newReply.isAnonymous ? 'Usuario Anónimo' : (currentUser?.displayName || 'Usuario'),
      isAnonymous: newReply.isAnonymous,
      timestamp: new Date(),
      likes: 0,
      isLiked: false
    };

    setReplies([...replies, reply]);
    
    // Update post reply count
    setPosts(posts.map(post => 
      post.id === selectedPost.id 
        ? { ...post, replies: post.replies + 1 }
        : post
    ));

    setNewReply({
      content: '',
      isAnonymous: false
    });
  };

  const handleLikePost = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked 
          }
        : post
    ));
  };

  const handleLikeReply = (replyId: string) => {
    setReplies(replies.map(reply => 
      reply.id === replyId 
        ? { 
            ...reply, 
            likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
            isLiked: !reply.isLiked 
          }
        : reply
    ));
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.likes - a.likes;
      case 'trending':
        return (b.likes + b.replies) - (a.likes + a.replies);
      case 'recent':
      default:
        return b.timestamp.getTime() - a.timestamp.getTime();
    }
  });

  const getPostReplies = (postId: string) => {
    return replies.filter(reply => reply.postId === postId);
  };

  if (selectedPost) {
    const postReplies = getPostReplies(selectedPost.id);
    
    return (
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <button
            onClick={() => setSelectedPost(null)}
            className="flex items-center space-x-2 text-teal-600 hover:text-teal-700 mb-8 transition-colors duration-200"
          >
            <MessageSquare className="h-5 w-5" />
            <span>Volver al foro</span>
          </button>

          {/* Post Detail */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 mb-8 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedPost.category === 'support' ? 'bg-pink-100 text-pink-700' :
                  selectedPost.category === 'report' ? 'bg-red-100 text-red-700' :
                  selectedPost.category === 'advice' ? 'bg-blue-100 text-blue-700' :
                  selectedPost.category === 'experience' ? 'bg-green-100 text-green-700' :
                  'bg-purple-100 text-purple-700'
                }`}>
                  {categories[selectedPost.category].name}
                </span>
                
                {selectedPost.isResolved && (
                  <span className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    <CheckCircle className="h-4 w-4" />
                    <span>Resuelto</span>
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-2 text-gray-500 text-sm">
                <Clock className="h-4 w-4" />
                <span>{selectedPost.timestamp.toLocaleString('es-ES')}</span>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {selectedPost.title}
            </h1>

            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center space-x-2">
                {selectedPost.isAnonymous ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
                <span className="text-gray-600 font-medium">{selectedPost.author}</span>
              </div>
            </div>

            <div className="prose max-w-none mb-6">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {selectedPost.content}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {selectedPost.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => handleLikePost(selectedPost.id)}
                  className={`flex items-center space-x-2 transition-colors duration-200 ${
                    selectedPost.isLiked ? 'text-pink-600' : 'text-gray-600 hover:text-pink-600'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${selectedPost.isLiked ? 'fill-current' : ''}`} />
                  <span>{selectedPost.likes}</span>
                </button>
                
                <div className="flex items-center space-x-2 text-gray-600">
                  <MessageCircle className="h-5 w-5" />
                  <span>{selectedPost.replies} respuestas</span>
                </div>
              </div>

              <button className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors duration-200">
                <Flag className="h-5 w-5" />
                <span>Reportar</span>
              </button>
            </div>
          </div>

          {/* Reply Form */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 mb-8 border border-white/20">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Responder</h3>
            
            <form onSubmit={handleCreateReply} className="space-y-4">
              <div>
                <textarea
                  value={newReply.content}
                  onChange={(e) => setNewReply({ ...newReply, content: e.target.value })}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 resize-none"
                  rows={4}
                  placeholder="Escribe tu respuesta aquí..."
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={newReply.isAnonymous}
                    onChange={(e) => setNewReply({ ...newReply, isAnonymous: e.target.checked })}
                    className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  />
                  <span className="text-gray-700">Responder de forma anónima</span>
                </label>

                <button
                  type="submit"
                  className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:from-teal-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2"
                >
                  <Send className="h-4 w-4" />
                  <span>Enviar Respuesta</span>
                </button>
              </div>
            </form>
          </div>

          {/* Replies */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800">
              Respuestas ({postReplies.length})
            </h3>
            
            {postReplies.map((reply) => (
              <div key={reply.id} className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/20">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {reply.isAnonymous ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                    <span className="font-medium text-gray-800">{reply.author}</span>
                  </div>
                  
                  <span className="text-sm text-gray-500">
                    {reply.timestamp.toLocaleString('es-ES')}
                  </span>
                </div>

                <p className="text-gray-700 mb-4 leading-relaxed whitespace-pre-wrap">
                  {reply.content}
                </p>

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleLikeReply(reply.id)}
                    className={`flex items-center space-x-2 transition-colors duration-200 ${
                      reply.isLiked ? 'text-pink-600' : 'text-gray-600 hover:text-pink-600'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${reply.isLiked ? 'fill-current' : ''}`} />
                    <span>{reply.likes}</span>
                  </button>

                  <button className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors duration-200">
                    <Flag className="h-4 w-4" />
                    <span>Reportar</span>
                  </button>
                </div>
              </div>
            ))}

            {postReplies.length === 0 && (
              <div className="text-center py-8">
                <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  Sé el primero en responder a esta publicación
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Foro Comunitario
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Un espacio seguro para compartir experiencias, buscar apoyo y ayudar a otros
          </p>
        </div>

        {/* Safety Notice */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg p-6 mb-8 text-white">
          <div className="flex items-center space-x-4">
            <Shield className="h-8 w-8 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold mb-2">Espacio Seguro y Moderado</h3>
              <p className="opacity-90">
                Este foro es monitoreado por profesionales. Puedes compartir de forma anónima y 
                siempre con respeto. Si necesitas ayuda inmediata, contacta nuestras líneas de emergencia.
              </p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 mb-8 border border-white/20">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar publicaciones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
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

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
              >
                <option value="recent">Más recientes</option>
                <option value="popular">Más populares</option>
                <option value="trending">Tendencia</option>
              </select>
            </div>

            <button
              onClick={() => setShowNewPost(true)}
              className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-teal-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Nueva Publicación</span>
            </button>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {Object.entries(categories).map(([key, category]) => {
              const Icon = category.icon;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === key
                      ? 'bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:text-teal-600 hover:bg-teal-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* New Post Modal */}
        {showNewPost && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">Nueva Publicación</h2>
                  <button
                    onClick={() => setShowNewPost(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <Plus className="h-6 w-6 rotate-45" />
                  </button>
                </div>
              </div>

              <form onSubmit={handleCreatePost} className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoría
                  </label>
                  <select
                    value={newPost.category}
                    onChange={(e) => setNewPost({ ...newPost, category: e.target.value as any })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                  >
                    {Object.entries(categories).filter(([key]) => key !== 'all').map(([key, category]) => (
                      <option key={key} value={key}>
                        {category.name} - {category.description}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título
                  </label>
                  <input
                    type="text"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                    placeholder="Describe brevemente tu situación o pregunta"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contenido
                  </label>
                  <textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 resize-none"
                    rows={6}
                    placeholder="Comparte tu experiencia, pregunta o situación. Recuerda ser respetuoso y no incluir información personal identificable."
                    required
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={newPost.isAnonymous}
                      onChange={(e) => setNewPost({ ...newPost, isAnonymous: e.target.checked })}
                      className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                    />
                    <span className="text-gray-700">Publicar de forma anónima</span>
                  </label>

                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setShowNewPost(false)}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-teal-600 hover:to-blue-700 transition-all duration-200"
                    >
                      Publicar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Posts List */}
        <div className="space-y-6">
          {sortedPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/20 cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    post.category === 'support' ? 'bg-pink-100 text-pink-700' :
                    post.category === 'report' ? 'bg-red-100 text-red-700' :
                    post.category === 'advice' ? 'bg-blue-100 text-blue-700' :
                    post.category === 'experience' ? 'bg-green-100 text-green-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {categories[post.category].name}
                  </span>
                  
                  {post.isResolved && (
                    <span className="flex items-center space-x-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      <CheckCircle className="h-3 w-3" />
                      <span>Resuelto</span>
                    </span>
                  )}
                </div>
                
                <div className="flex items-center space-x-2 text-gray-500 text-sm">
                  <Clock className="h-4 w-4" />
                  <span>{post.timestamp.toLocaleString('es-ES')}</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                {post.title}
              </h3>

              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.content}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {post.isAnonymous ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                  <span className="text-gray-600 text-sm font-medium">{post.author}</span>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-current text-pink-600' : ''}`} />
                    <span className="text-sm">{post.likes}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-sm">{post.replies}</span>
                  </div>
                </div>
              </div>

              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-4">
                  {post.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}

          {sortedPosts.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No se encontraron publicaciones
              </h3>
              <p className="text-gray-600 mb-6">
                Intenta con otros términos de búsqueda o selecciona una categoría diferente
              </p>
              <button
                onClick={() => setShowNewPost(true)}
                className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-teal-600 hover:to-blue-700 transition-all duration-200"
              >
                Crear primera publicación
              </button>
            </div>
          )}
        </div>

        {/* Emergency Notice */}
        <div className="mt-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl shadow-xl p-8 text-white text-center">
          <AlertTriangle className="h-12 w-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">¿Situación de Emergencia?</h2>
          <p className="text-lg mb-6 opacity-90">
            Si estás en peligro inmediato o tienes pensamientos de autolesión, 
            no esperes. Contacta inmediatamente:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-white/20 backdrop-blur-md rounded-lg p-4">
              <p className="font-bold">Línea Nacional: 988</p>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-lg p-4">
              <p className="font-bold">Emergencias: 911</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forum;