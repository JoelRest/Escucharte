import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Check, 
  X, 
  Bell, 
  Clock,
  Target,
  Heart,
  Smile,
  Meh,
  Frown,
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash2
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  isCompleted: boolean;
  priority: 'low' | 'medium' | 'high';
  category: 'selfcare' | 'therapy' | 'exercise' | 'social' | 'other';
}

interface MoodEntry {
  id: string;
  date: Date;
  mood: 'great' | 'good' | 'okay' | 'bad' | 'terrible';
  notes: string;
}

interface Alarm {
  id: string;
  title: string;
  time: string;
  date: Date;
  isActive: boolean;
  type: 'reminder' | 'medication' | 'therapy' | 'selfcare';
}

const EmotionalAgenda: React.FC = () => {
  const { currentUser } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState<'calendar' | 'tasks' | 'mood' | 'alarms'>('calendar');
  
  const [tasks, setTasks] = useState<Task[]>([]);
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  
  const [showNewTask, setShowNewTask] = useState(false);
  const [showNewAlarm, setShowNewAlarm] = useState(false);
  const [showMoodEntry, setShowMoodEntry] = useState(false);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: new Date(),
    priority: 'medium' as const,
    category: 'selfcare' as const
  });

  const [newAlarm, setNewAlarm] = useState({
    title: '',
    time: '',
    date: new Date(),
    type: 'reminder' as const
  });

  const [newMoodEntry, setNewMoodEntry] = useState({
    mood: 'okay' as const,
    notes: ''
  });

  const moodIcons = {
    great: { icon: Smile, color: 'text-green-500', label: 'Excelente' },
    good: { icon: Smile, color: 'text-blue-500', label: 'Bueno' },
    okay: { icon: Meh, color: 'text-yellow-500', label: 'Regular' },
    bad: { icon: Frown, color: 'text-orange-500', label: 'Malo' },
    terrible: { icon: Frown, color: 'text-red-500', label: 'Terrible' }
  };

  const taskCategories = {
    selfcare: { name: 'Autocuidado', color: 'bg-purple-100 text-purple-700' },
    therapy: { name: 'Terapia', color: 'bg-blue-100 text-blue-700' },
    exercise: { name: 'Ejercicio', color: 'bg-green-100 text-green-700' },
    social: { name: 'Social', color: 'bg-pink-100 text-pink-700' },
    other: { name: 'Otro', color: 'bg-gray-100 text-gray-700' }
  };

  const alarmTypes = {
    reminder: { name: 'Recordatorio', color: 'bg-blue-100 text-blue-700' },
    medication: { name: 'Medicación', color: 'bg-red-100 text-red-700' },
    therapy: { name: 'Terapia', color: 'bg-purple-100 text-purple-700' },
    selfcare: { name: 'Autocuidado', color: 'bg-green-100 text-green-700' }
  };

  // Mock data initialization
  useEffect(() => {
    const mockTasks: Task[] = [
      {
        id: '1',
        title: 'Sesión de meditación matutina',
        description: '10 minutos de meditación mindfulness',
        dueDate: new Date(),
        isCompleted: false,
        priority: 'high',
        category: 'selfcare'
      },
      {
        id: '2',
        title: 'Llamar a un amigo',
        description: 'Conectar con alguien cercano',
        dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
        isCompleted: false,
        priority: 'medium',
        category: 'social'
      }
    ];

    const mockMoodEntries: MoodEntry[] = [
      {
        id: '1',
        date: new Date(Date.now() - 24 * 60 * 60 * 1000),
        mood: 'good',
        notes: 'Día productivo, me sentí bien después del ejercicio'
      },
      {
        id: '2',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        mood: 'okay',
        notes: 'Un poco estresado por los estudios'
      }
    ];

    const mockAlarms: Alarm[] = [
      {
        id: '1',
        title: 'Tomar medicación',
        time: '08:00',
        date: new Date(),
        isActive: true,
        type: 'medication'
      },
      {
        id: '2',
        title: 'Tiempo de relajación',
        time: '20:00',
        date: new Date(),
        isActive: true,
        type: 'selfcare'
      }
    ];

    setTasks(mockTasks);
    setMoodEntries(mockMoodEntries);
    setAlarms(mockAlarms);
  }, []);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    
    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      dueDate: newTask.dueDate,
      isCompleted: false,
      priority: newTask.priority,
      category: newTask.category
    };

    setTasks([...tasks, task]);
    setNewTask({
      title: '',
      description: '',
      dueDate: new Date(),
      priority: 'medium',
      category: 'selfcare'
    });
    setShowNewTask(false);
  };

  const handleAddAlarm = (e: React.FormEvent) => {
    e.preventDefault();
    
    const alarm: Alarm = {
      id: Date.now().toString(),
      title: newAlarm.title,
      time: newAlarm.time,
      date: newAlarm.date,
      isActive: true,
      type: newAlarm.type
    };

    setAlarms([...alarms, alarm]);
    setNewAlarm({
      title: '',
      time: '',
      date: new Date(),
      type: 'reminder'
    });
    setShowNewAlarm(false);
  };

  const handleAddMoodEntry = (e: React.FormEvent) => {
    e.preventDefault();
    
    const moodEntry: MoodEntry = {
      id: Date.now().toString(),
      date: selectedDate,
      mood: newMoodEntry.mood,
      notes: newMoodEntry.notes
    };

    setMoodEntries([...moodEntries, moodEntry]);
    setNewMoodEntry({ mood: 'okay', notes: '' });
    setShowMoodEntry(false);
  };

  const toggleTaskComplete = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
    ));
  };

  const toggleAlarm = (alarmId: string) => {
    setAlarms(alarms.map(alarm => 
      alarm.id === alarmId ? { ...alarm, isActive: !alarm.isActive } : alarm
    ));
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDate = firstDay.getDay();

    const days = [];
    
    // Previous month days
    for (let i = startDate - 1; i >= 0; i--) {
      const day = new Date(year, month, -i);
      days.push({ date: day, isCurrentMonth: false });
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const dayDate = new Date(year, month, day);
      days.push({ date: dayDate, isCurrentMonth: true });
    }
    
    // Next month days
    const totalCells = Math.ceil(days.length / 7) * 7;
    for (let day = 1; days.length < totalCells; day++) {
      const dayDate = new Date(year, month + 1, day);
      days.push({ date: dayDate, isCurrentMonth: false });
    }
    
    return days;
  };

  const getTasksForDate = (date: Date) => {
    return tasks.filter(task => 
      task.dueDate.toDateString() === date.toDateString()
    );
  };

  const getMoodForDate = (date: Date) => {
    return moodEntries.find(entry => 
      entry.date.toDateString() === date.toDateString()
    );
  };

  const tabs = [
    { id: 'calendar', name: 'Calendario', icon: CalendarIcon },
    { id: 'tasks', name: 'Tareas', icon: Target },
    { id: 'mood', name: 'Estado de Ánimo', icon: Heart },
    { id: 'alarms', name: 'Alarmas', icon: Bell }
  ];

  const days = getDaysInMonth(currentDate);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Mi Agenda Emocional
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Gestiona tu bienestar con herramientas para el seguimiento diario
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-2 mb-8 border border-white/20">
          <div className="flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-teal-600 hover:bg-teal-50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="hidden sm:block">{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Calendar Tab */}
        {activeTab === 'calendar' && (
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-white/20">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
              </h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                  className="p-2 rounded-lg text-gray-600 hover:text-teal-600 hover:bg-teal-50 transition-colors duration-200"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setCurrentDate(new Date())}
                  className="px-4 py-2 text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors duration-200"
                >
                  Hoy
                </button>
                <button
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                  className="p-2 rounded-lg text-gray-600 hover:text-teal-600 hover:bg-teal-50 transition-colors duration-200"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
                <div key={day} className="p-3 text-center text-sm font-medium text-gray-600">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {days.map((day, index) => {
                const dayTasks = getTasksForDate(day.date);
                const dayMood = getMoodForDate(day.date);
                const isToday = day.date.toDateString() === new Date().toDateString();
                const isSelected = day.date.toDateString() === selectedDate.toDateString();

                return (
                  <button
                    key={index}
                    onClick={() => setSelectedDate(day.date)}
                    className={`relative p-2 h-20 rounded-lg border transition-all duration-200 ${
                      isSelected
                        ? 'bg-teal-100 border-teal-300'
                        : isToday
                        ? 'bg-blue-50 border-blue-200'
                        : day.isCurrentMonth
                        ? 'bg-white border-gray-200 hover:bg-gray-50'
                        : 'bg-gray-50 border-gray-100 text-gray-400'
                    }`}
                  >
                    <div className="text-sm font-medium">
                      {day.date.getDate()}
                    </div>
                    
                    {/* Task indicators */}
                    {dayTasks.length > 0 && (
                      <div className="absolute top-1 right-1 w-2 h-2 bg-teal-500 rounded-full"></div>
                    )}
                    
                    {/* Mood indicator */}
                    {dayMood && (
                      <div className="absolute bottom-1 left-1">
                        {React.createElement(moodIcons[dayMood.mood].icon, {
                          className: `h-3 w-3 ${moodIcons[dayMood.mood].color}`
                        })}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Selected Date Info */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">
                {selectedDate.toLocaleDateString('es-ES', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h3>
              
              <div className="space-y-2">
                {getTasksForDate(selectedDate).map((task) => (
                  <div key={task.id} className="flex items-center space-x-2 text-sm">
                    <div className={`w-3 h-3 rounded-full ${
                      task.priority === 'high' ? 'bg-red-400' :
                      task.priority === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                    }`}></div>
                    <span className={task.isCompleted ? 'line-through text-gray-500' : 'text-gray-700'}>
                      {task.title}
                    </span>
                  </div>
                ))}
                
                {getMoodForDate(selectedDate) && (
                  <div className="flex items-center space-x-2 text-sm">
                    {React.createElement(moodIcons[getMoodForDate(selectedDate)!.mood].icon, {
                      className: `h-4 w-4 ${moodIcons[getMoodForDate(selectedDate)!.mood].color}`
                    })}
                    <span className="text-gray-700">
                      Estado: {moodIcons[getMoodForDate(selectedDate)!.mood].label}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tasks Tab */}
        {activeTab === 'tasks' && (
          <div className="space-y-6">
            {/* Add Task Button */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Mis Tareas</h2>
                  <p className="text-gray-600">Organiza tus actividades de bienestar</p>
                </div>
                <button
                  onClick={() => setShowNewTask(true)}
                  className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-teal-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2"
                >
                  <Plus className="h-5 w-5" />
                  <span>Nueva Tarea</span>
                </button>
              </div>
            </div>

            {/* New Task Form */}
            {showNewTask && (
              <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-white/20">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Nueva Tarea</h3>
                  <button
                    onClick={() => setShowNewTask(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleAddTask} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Título
                    </label>
                    <input
                      type="text"
                      value={newTask.title}
                      onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                      placeholder="Nombre de la tarea"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descripción
                    </label>
                    <textarea
                      value={newTask.description}
                      onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                      rows={3}
                      placeholder="Detalles de la tarea"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fecha límite
                      </label>
                      <input
                        type="date"
                        value={newTask.dueDate.toISOString().split('T')[0]}
                        onChange={(e) => setNewTask({ ...newTask, dueDate: new Date(e.target.value)  })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prioridad
                      </label>
                      <select
                        value={newTask.priority}
                        onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="low">Baja</option>
                        <option value="medium">Media</option>
                        <option value="high">Alta</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Categoría
                      </label>
                      <select
                        value={newTask.category}
                        onChange={(e) => setNewTask({ ...newTask, category: e.target.value as any })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                      >
                        {Object.entries(taskCategories).map(([key, category]) => (
                          <option key={key} value={key}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowNewTask(false)}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-teal-600 hover:to-blue-700 transition-all duration-200"
                    >
                      Crear Tarea
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Tasks List */}
            <div className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/20 ${
                    task.isCompleted ? 'opacity-75' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <button
                        onClick={() => toggleTaskComplete(task.id)}
                        className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                          task.isCompleted
                            ? 'bg-green-500 border-green-500 text-white'
                            : 'border-gray-300 hover:border-green-400'
                        }`}
                      >
                        {task.isCompleted && <Check className="h-4 w-4" />}
                      </button>

                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className={`font-semibold text-gray-800 ${
                            task.isCompleted ? 'line-through' : ''
                          }`}>
                            {task.title}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            taskCategories[task.category].color
                          }`}>
                            {taskCategories[task.category].name}
                          </span>
                          <div className={`w-3 h-3 rounded-full ${
                            task.priority === 'high' ? 'bg-red-400' :
                            task.priority === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                          }`}></div>
                        </div>
                        
                        {task.description && (
                          <p className={`text-gray-600 mb-2 ${
                            task.isCompleted ? 'line-through' : ''
                          }`}>
                            {task.description}
                          </p>
                        )}
                        
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>
                            Vence: {task.dueDate.toLocaleDateString('es-ES')}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {tasks.length === 0 && (
                <div className="text-center py-12">
                  <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    No tienes tareas pendientes
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Crea tu primera tarea para comenzar a organizar tu bienestar
                  </p>
                  <button
                    onClick={() => setShowNewTask(true)}
                    className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-teal-600 hover:to-blue-700 transition-all duration-200"
                  >
                    Crear primera tarea
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mood Tab */}
        {activeTab === 'mood' && (
          <div className="space-y-6">
            {/* Mood Header */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Estado de Ánimo</h2>
                  <p className="text-gray-600">Registra y sigue tu bienestar emocional</p>
                </div>
                <button
                  onClick={() => setShowMoodEntry(true)}
                  className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-teal-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2"
                >
                  <Plus className="h-5 w-5" />
                  <span>Registrar Estado</span>
                </button>
              </div>
            </div>

            {/* New Mood Entry Form */}
            {showMoodEntry && (
              <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-white/20">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Registrar Estado de Ánimo</h3>
                  <button
                    onClick={() => setShowMoodEntry(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleAddMoodEntry} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      ¿Cómo te sientes hoy?
                    </label>
                    <div className="grid grid-cols-5 gap-4">
                      {Object.entries(moodIcons).map(([key, mood]) => {
                        const Icon = mood.icon;
                        return (
                          <button
                            key={key}
                            type="button"
                            onClick={() => setNewMoodEntry({ ...newMoodEntry, mood: key as any })}
                            className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                              newMoodEntry.mood === key
                                ? 'border-teal-500 bg-teal-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <Icon className={`h-8 w-8 mx-auto mb-2 ${mood.color}`} />
                            <p className="text-sm font-medium text-gray-700">{mood.label}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notas (opcional)
                    </label>
                    <textarea
                      value={newMoodEntry.notes}
                      onChange={(e) => setNewMoodEntry({ ...newMoodEntry, notes: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                      rows={4}
                      placeholder="¿Qué influyó en tu estado de ánimo hoy? ¿Qué actividades te ayudaron?"
                    />
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setShowMoodEntry(false)}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-teal-600 hover:to-blue-700 transition-all duration-200"
                    >
                      Guardar Estado
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Mood History */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-white/20">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Historial de Estados</h3>
              
              <div className="space-y-4">
                {moodEntries
                  .sort((a, b) => b.date.getTime() - a.date.getTime())
                  .map((entry) => {
                    const moodData = moodIcons[entry.mood];
                    const Icon = moodData.icon;
                    
                    return (
                      <div key={entry.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0">
                          <Icon className={`h-6 w-6 ${moodData.color}`} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-1">
                            <span className="font-medium text-gray-800">{moodData.label}</span>
                            <span className="text-sm text-gray-500">
                              {entry.date.toLocaleDateString('es-ES')}
                            </span>
                          </div>
                          
                          {entry.notes && (
                            <p className="text-gray-600 text-sm">{entry.notes}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                
                {moodEntries.length === 0 && (
                  <div className="text-center py-8">
                    <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">
                      Aún no has registrado ningún estado de ánimo. ¡Comienza hoy!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Alarms Tab */}
        {activeTab === 'alarms' && (
          <div className="space-y-6">
            {/* Alarms Header */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Alarmas y Recordatorios</h2>
                  <p className="text-gray-600">Programa recordatorios para tu bienestar</p>
                </div>
                <button
                  onClick={() => setShowNewAlarm(true)}
                  className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-teal-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2"
                >
                  <Plus className="h-5 w-5" />
                  <span>Nueva Alarma</span>
                </button>
              </div>
            </div>

            {/* New Alarm Form */}
            {showNewAlarm && (
              <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-white/20">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Nueva Alarma</h3>
                  <button
                    onClick={() => setShowNewAlarm(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleAddAlarm} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Título
                    </label>
                    <input
                      type="text"
                      value={newAlarm.title}
                      onChange={(e) => setNewAlarm({ ...newAlarm, title: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                      placeholder="Nombre del recordatorio"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hora
                      </label>
                      <input
                        type="time"
                        value={newAlarm.time}
                        onChange={(e) => setNewAlarm({ ...newAlarm, time: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fecha
                      </label>
                      <input
                        type="date"
                        value={newAlarm.date.toISOString().split('T')[0]}
                        onChange={(e) => setNewAlarm({ ...newAlarm, date: new Date(e.target.value) })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo
                      </label>
                      <select
                        value={newAlarm.type}
                        onChange={(e) => setNewAlarm({ ...newAlarm, type: e.target.value as any })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                      >
                        {Object.entries(alarmTypes).map(([key, type]) => (
                          <option key={key} value={key}>
                            {type.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowNewAlarm(false)}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-teal-600 hover:to-blue-700 transition-all duration-200"
                    >
                      Crear Alarma
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Alarms List */}
            <div className="space-y-4">
              {alarms.map((alarm) => (
                <div
                  key={alarm.id}
                  className={`bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/20 ${
                    !alarm.isActive ? 'opacity-75' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => toggleAlarm(alarm.id)}
                        className={`w-12 h-6 rounded-full transition-all duration-200 ${
                          alarm.isActive ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                          alarm.isActive ? 'translate-x-6' : 'translate-x-0.5'
                        }`}></div>
                      </button>

                      <div>
                        <div className="flex items-center space-x-3 mb-1">
                          <h3 className="font-semibold text-gray-800">{alarm.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            alarmTypes[alarm.type].color
                          }`}>
                            {alarmTypes[alarm.type].name}
                          </span>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>
                            {alarm.time} - {alarm.date.toLocaleDateString('es-ES')}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {alarms.length === 0 && (
                <div className="text-center py-12">
                  <Bell className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    No tienes alarmas configuradas
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Crea recordatorios para mantener tus rutinas de bienestar
                  </p>
                  <button
                    onClick={() => setShowNewAlarm(true)}
                    className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-teal-600 hover:to-blue-700 transition-all duration-200"
                  >
                    Crear primera alarma
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmotionalAgenda;